# Obayed Builds

A dynamic portfolio built with JavaScript/JSX, React, Vinext, Tailwind CSS, and Cloudflare D1.

## Pages

Home, work collection, project case studies, About, Services and three service landing pages, build notes, individual notes, contact wizard, and an owner dashboard at `/admin`.

## Content and enquiries

Public content uses `lib/content.js` as its initial collection. The owner dashboard saves editable project records, notes, and site settings to D1. Drafts are excluded from public pages. Visitors can submit a project brief to the private enquiry inbox. The form does not send email or subscribe anyone to a mailing list. Email replies are started manually by the owner.

`OWNER_EMAIL` is configured as a Sites runtime secret. The dashboard requires dispatch-provided ChatGPT identity for that account and authorizes each API operation on the server. The public contact email is independently editable.

## Local workflow

Run `npm run install:ci` for locked installation. Generate schema changes with `npm run db:generate`; apply each pending migration locally using the starter's Wrangler command and `dist/server/wrangler.json`. Use the Sites build helper for production packaging. `node scripts/test-portfolio.mjs` runs isolated Worker/D1 integration checks for authorization, updates, draft visibility, enquiries, and rate limiting.

Public images are under `public/`. Generated build output and local databases, environment files, and tool state are ignored. Keep the existing Site identity and audience when publishing.
# obayedullah-builds
