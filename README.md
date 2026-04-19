# Preserve

Preserve is a modern MVP web application for smart household food management. The app is built with Next.js and is ready to be deployed and shared publicly.

## Stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- Recharts
- Lucide React

## Scripts

The project is already configured with the standard Next.js scripts:

```bash
npm run dev
npm run build
npm run start
```

## Run locally in development

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

3. Open:

```text
http://localhost:3000
```

## Deploy on Vercel

This is the easiest way to publish Preserve and send a live link to other people.

1. Push this project to a GitHub, GitLab, or Bitbucket repository.
2. Go to [Vercel](https://vercel.com/).
3. Click `Add New...` > `Project`.
4. Import your repository.
5. Keep the default framework setting detected by Vercel: `Next.js`.
6. Leave the default build settings unless you want to customize them:
   - Install Command: `npm install`
   - Build Command: `npm run build`
   - Output: automatic
7. Click `Deploy`.
8. When deployment finishes, copy the generated Vercel URL and share it.

Every new push to your main branch can automatically trigger a new deployment.

## Alternative: self-hosted production run

If you want to run the app yourself on a server or VPS without Vercel:

1. Install dependencies:

```bash
npm install
```

2. Create the production build:

```bash
npm run build
```

3. Start the production server:

```bash
npm run start
```

4. Open the app on the configured host and port.

By default, Next.js serves the app on port `3000`.

Example with a custom port:

```bash
PORT=3000 npm run start
```

On Windows PowerShell:

```powershell
$env:PORT=3000
npm run start
```

## Production notes

- The app builds successfully for production with `npm run build`.
- All data is mocked and stored locally in frontend state.
- No backend setup is required for demo sharing.
- For public sharing, Vercel is the fastest option.

## Project structure

```text
app/                  App Router pages
components/           Reusable UI and feature components
lib/mock-data.ts      Demo data for inventory, recipes, grocery, and charts
lib/types.ts          Shared TypeScript models
lib/utils.ts          Expiration, matching, and notification helpers
```
