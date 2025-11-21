# OtherDev Svelte

This is the SvelteKit version of the OtherDev website, providing the same functionality as the original Next.js application but using SvelteKit.

## Features

- SvelteKit 2.x application using the App Router pattern
- Tailwind CSS for styling with OKLCH color space
- tRPC for end-to-end type safety
- Geist font for typography
- Multi-tenant architecture support
- Responsive design with dark mode support

## Prerequisites

- [Bun](https://bun.sh/) (v1.3.2 or higher)

## Getting Started

1. Install dependencies:

```bash
bun install
```

2. Start the development server:

```bash
bun run dev
```

3. Open [http://localhost:5173](http://localhost:5173) in your browser to see the result.

## Commands

- `bun run dev` - Start development server
- `bun run build` - Build for production
- `bun run preview` - Preview production build locally
- `bun run check` - Run type checking
- `bun run lint` - Run Biome linter
- `bun run format` - Format code with Biome

## Environment Variables

Create a `.env` file in the root of this project with the following variables:

```env
# Canvas CMS Integration (required for blog functionality)
PAYLOAD_API_URL=https://canvas.otherdev.com

# Contact Form - Google Sheets Integration
GOOGLE_CLIENT_EMAIL=your-service-account@project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
GOOGLE_SHEET_ID=your-google-sheet-id

# Contact Form - Gmail Integration
GMAIL_USER=your-email@gmail.com
GMAIL_APP_PASSWORD=your-app-password
GMAIL_RECIPIENTS=recipient1@example.com,recipient2@example.com
```

## Project Structure

- `src/app/` - SvelteKit pages and layouts (equivalent to Next.js app directory)
- `src/components/` - Reusable Svelte components
- `src/hooks/` - Custom Svelte hooks
- `src/lib/` - Shared utilities and functions
- `src/server/` - Server-side logic and tRPC setup
- `static/` - Static assets