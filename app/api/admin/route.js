import { z } from "zod";
import {
  database,
  ownerFromRequest,
  sameOrigin,
  json,
  readBody,
  getContent,
} from "../../../lib/store";


const text = (max) => z.string().max(max);
const project = z.object({
  slug: z
    .string()
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
    .max(80),
  art: z.enum(["city", "lectra", "recruiter", "promptography", "generic"]),
  title: text(120).min(2),
  summary: text(240),
  category: z.enum(["web", "ai", "digital"]),
  status: text(60),
  published: z.boolean(),
  color: z.enum(["green", "purple", "peach", "yellow"]),
  headline: text(200),
  role: text(150),
  stack: z.array(text(80)).max(15),
  overview: text(3000),
  challenge: text(3000),
  approach: z.array(text(500)).max(12),
  delivered: z.array(text(500)).max(15),
  roadmap: z.array(text(500)).max(15),
  takeaway: text(1500),
  link: z.union([
    z.literal(""),
    z
      .string()
      .url()
      .max(1000)
      .refine((v) => v.startsWith("https://"), "Use an HTTPS URL"),
  ]),
  linkLabel: text(80),
});


const note = z.object({
  slug: z
    .string()
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
    .max(80),
  title: text(150).min(2),
  summary: text(300),
  tag: text(60),
  published: z.boolean(),
  body: text(20000).min(20),
});


const settings = z.object({
  name: text(100).min(2),
  shortName: text(50).min(1),
  email: z.string().email().max(200),
  intro: text(500),
  availability: text(100),
  location: text(100),
  about: text(3000),
});


const service = z.object({
  slug: z.enum(["websites", "full-stack", "mobile-apps"]),
  number: text(5),
  title: text(120).min(2),
  short: text(200),
  summary: text(500),
  description: text(2000),
  icon: text(10),
  color: z.enum(["green", "purple", "peach", "yellow"]),
  deliverables: z.array(text(500)).max(20),
  fits: z.array(text(500)).max(20),
  scope: z.array(text(150)).max(20),
  stack: z.array(text(100)).max(20),
  faq: z.array(z.tuple([text(200), text(2000)])).max(15),
});


export async function GET(request) {
  if (!(await ownerFromRequest(request)))
    return json({ error: "Owner access required." }, 403);
  try {
    const content = await getContent(true);
    const leads = (
      await database()
        .prepare("SELECT * FROM enquiries ORDER BY created_at DESC LIMIT 500")
        .all()
    ).results;
    return json({ ...content, enquiries: leads });
  } catch {
    return json(
      { error: "The dashboard could not load. Please try again." },
      503
    );
  }
}


export async function PUT(request) {
  const owner = await ownerFromRequest(request);
  if (!owner) return json({ error: "Owner access required." }, 403);
  if (!sameOrigin(request))
    return json({ error: "Invalid request origin." }, 403);
  try {
    const body = await readBody(request, 250000);
    if (body.type === "enquiry") {
      const parsed = z
        .object({
          id: z.string().uuid(),
          status: z.enum(["new", "read", "replied", "archived"]),
        })
        .parse(body.data);
      await database()
        .prepare("UPDATE enquiries SET status=? WHERE id=?")
        .bind(parsed.status, parsed.id)
        .run();
    } else {
      let parsed;
      if (body.type === "settings") parsed = settings.parse(body.data);
      else if (body.type === "projects")
        parsed = z.array(project).max(40).parse(body.data);
      else if (body.type === "notes")
        parsed = z.array(note).max(60).parse(body.data);
      else if (body.type === "services")
        parsed = z.array(service).length(3).parse(body.data);
      else return json({ error: "Unknown update type." }, 400);
      if (
        Array.isArray(parsed) &&
        new Set(parsed.map((p) => p.slug)).size !== parsed.length
      )
        return json({ error: "Each page must have a unique URL slug." }, 400);
      await database()
        .prepare(
          "INSERT INTO content (key,value,updated_at,updated_by) VALUES (?,?,?,?) ON CONFLICT(key) DO UPDATE SET value=excluded.value,updated_at=excluded.updated_at,updated_by=excluded.updated_by"
        )
        .bind(body.type, JSON.stringify(parsed), Date.now(), owner.id)
        .run();
    }
    return json({ ok: true });
  } catch (error) {
    return json(
      {
        error:
          error instanceof z.ZodError
            ? error.issues
                .map((i) => `${i.path.join(".")}: ${i.message}`)
                .slice(0, 3)
                .join("; ")
            : "Changes could not be saved. Try again.",
      },
      error instanceof z.ZodError ? 400 : 503
    );
  }
}
