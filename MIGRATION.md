# Independent deployment migration

This branch prepares New England Creatives to run outside ChatGPT Sites while preserving the Cloudflare/D1 architecture.

## Production secrets
Configure these in the hosting environment; never commit their values:
- ADMIN_PASSWORD — owner password for /admin
- ADMIN_SESSION_SECRET — random secret of at least 32 characters

## Database
Create or select the production Cloudflare D1 database, replace REPLACE_WITH_D1_DATABASE_ID in wrangler.jsonc, and apply the SQL migrations in drizzle/.

Before cutover, export the current Sites D1 data and import it into the independent D1 database. Do not point the production domain at the new deployment until row counts and onboarding/client records have been verified.

## Deployment
The application is built with the existing Vinext/Vite/Cloudflare toolchain. Run pnpm install and pnpm build. Validate the generated dist/server/wrangler.json before deployment.

## Cutover checklist
1. Build succeeds.
2. Public pages render.
3. /admin requires the independent owner password.
4. Admin CRUD works against the migrated D1 database.
5. Existing onboarding records are present.
6. A new onboarding link can be created and submitted.
7. Public lead submission works.
8. Domain remains on the old deployment until all checks pass.
9. Switch newenglandcreatives.com only after verification.
10. Keep the old deployment available for rollback until the new deployment is stable.
