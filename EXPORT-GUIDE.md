# Obayed Builds — Source Export

This archive contains the source of the deployed portfolio, plus this guide. It does not contain Git history, installed packages, generated output, local databases, enquiries, runtime secrets, or live dashboard content overrides.

## Stack

- React 19 and JavaScript/JSX application code
- Vinext with Next.js App Router conventions and Vite
- Tailwind CSS 4 and custom UI components
- Cloudflare Workers server-side route handlers
- Cloudflare D1 (SQLite), with Drizzle schema and migrations
- Zod request validation
- ChatGPT Sites authentication for the owner dashboard

A few retained platform helpers and configuration files are TypeScript. The application pages and custom components are JSX; the API handlers are JavaScript. Some unused dependencies from the supplied starter remain in package.json; they are not all used by the UI.

## Add to GitHub

1. Extract the ZIP. Open a terminal in the extracted `obayed-builds` folder.
2. Create an empty repository on GitHub, for example `obayed-portfolio`. Do not add a README or other files during creation.
3. Replace YOUR_USERNAME in the remote URL below and run:

```bash
git init
git add .
git commit -m "Initial portfolio source"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/obayed-portfolio.git
git push -u origin main
```

Authenticate to GitHub using your preferred Git client, GitHub CLI, SSH, or the authentication flow your Git setup supports. Do not use your account password as a Git HTTPS password.

Uploading source does not change the existing deployed site and does not create automatic deployment from GitHub.

## Local development

Requires Node.js >=22.13.0, npm, and Git. A clean extraction uses the portable execution profile automatically.

```bash
npm run install:ci
npm run build
```

Apply the initial migration to your local D1 database (one-time setup for a new local database):

```bash
node --import ./scripts/sites-env.mjs ./node_modules/wrangler/bin/wrangler.js d1 execute DB --local --config dist/server/wrangler.json --persist-to .wrangler/state --file drizzle/0000_elite_thanos.sql
npm run dev
```

Open the URL printed by the development server. Local database state is stored in the ignored `.wrangler/` directory. Later schema changes should append migrations rather than edit applied migrations.

To run the isolated API/database checks:

```bash
node scripts/test-portfolio.mjs
```

## Owner sign-in and environment

The production owner dashboard trusts identity headers supplied by ChatGPT Sites. It checks the verified email against the OWNER_EMAIL runtime setting. That hosted secret is intentionally not included.

For portable local development, the supplied Sites plugin simulates ChatGPT sign-in only on loopback requests. Its test identity is `seedy@sites.test`. Create an ignored `.dev.vars` file containing:

```text
OWNER_EMAIL="seedy@sites.test"
```

Restart the development server if you created the file after startup. Visit `/signin-with-chatgpt?return_to=/admin` on the local development server to use the local test identity. This is a local simulation, not the production account.

## Where to edit

- `app/`: pages and API routes
- `components/`: custom JSX UI, enquiry wizard, and dashboard
- `lib/content.js`: default projects, services, notes, and profile details
- `lib/store.js`: database access and owner authorization
- `app/globals.css`: Tailwind styles
- `public/`: public image assets
- `db/schema.js` and `drizzle/`: database schema and migrations
- `worker/`, `vite.config.ts`, and `scripts/`: platform and build integration

Production content edited in the dashboard is stored in the hosted database. Changing default source content does not replace existing database overrides. This source export does not export live database records.

## Hosting outside ChatGPT Sites

Saving the source to GitHub is supported independently of hosting. To deploy it elsewhere, configure a Cloudflare Worker and D1 database, apply migrations, provide environment settings, and replace the Sites-owned authentication boundary. Never trust client-supplied identity headers on an independently hosted public server.

The current implementation uses Cloudflare-specific server bindings and does not run unchanged as a standard Vercel/Node deployment. A conventional Next.js + MongoDB/PostgreSQL version would be a separate migration.

`.openai/hosting.json` records the existing Site identity; its project ID is not a password or API key. Keep it when continuing this same Site. Do not use that identity to register a different Site.
