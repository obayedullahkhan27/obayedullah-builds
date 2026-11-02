import { database, sameOrigin, json, readBody } from "../../../lib/store";


export async function POST(request) {
  if (!sameOrigin(request))
    return json({ error: "Please submit the form from this website." }, 403);
  try {
    const body = await readBody(request, 12000);
    if (body.website)
      return json({ error: "Unable to accept this enquiry." }, 400);
    const value = {};
    for (const [key, max] of Object.entries({
      name: 100,
      email: 200,
      service: 100,
      scope: 500,
      budget: 100,
      timeline: 100,
      details: 5000,
    })) {
      if (typeof body[key] !== "string" || body[key].length > max)
        return json({ error: "Please check your form entries." }, 400);
      value[key] = body[key].trim();
    }
    if (
      value.name.length < 2 ||
      value.details.length < 20 ||
      !/^\S+@\S+\.\S+$/.test(value.email)
    )
      return json(
        {
          error:
            "Please add your name, a valid email, and at least 20 characters about your project.",
        },
        400
      );
    if (
      ![
        "Website or landing page",
        "Full-stack product or MVP",
        "Mobile app",
        "Let’s explore",
      ].includes(value.service)
    )
      return json({ error: "Choose a project type." }, 400);
    const bucket = Math.floor(Date.now() / 900000);
    const ip = request.headers.get("cf-connecting-ip") || "local";
    const digest = await crypto.subtle.digest(
      "SHA-256",
      new TextEncoder().encode(`${ip}:${bucket}:obayed-builds`)
    );
    const key = Array.from(new Uint8Array(digest), (b) =>
      b.toString(16).padStart(2, "0")
    ).join("");
    const db = database();
    const limit = await db
      .prepare(
        "INSERT INTO rate_limits (key,attempts,reset_at) VALUES (?,1,?) ON CONFLICT(key) DO UPDATE SET attempts=attempts+1 RETURNING attempts"
      )
      .bind(key, Date.now() + 900000)
      .first();
    if (limit.attempts > 5)
      return json(
        {
          error:
            "You’ve sent a few enquiries recently. Please try again in 15 minutes or email me directly.",
        },
        429
      );
    const id = crypto.randomUUID();
    await db.batch([
      db
        .prepare(
          "INSERT INTO enquiries (id,name,email,service,scope,budget,timeline,details,status,created_at) VALUES (?,?,?,?,?,?,?,?,?,?)"
        )
        .bind(
          id,
          value.name,
          value.email,
          value.service,
          value.scope,
          value.budget,
          value.timeline,
          value.details,
          "new",
          Date.now()
        ),
      db.prepare("DELETE FROM rate_limits WHERE reset_at < ?").bind(Date.now()),
    ]);
    return json({ ok: true, reference: id.slice(0, 8) }, 201);
  } catch (error) {
    console.error("Enquiry submission failed:", error.message);
    return json(
      {
        error:
          "Your enquiry could not be saved. Please try again or use the email option below.",
      },
      503
    );
  }
}
