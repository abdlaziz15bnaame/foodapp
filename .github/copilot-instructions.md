# Copilot Instructions for foodapp (Next.js Delivery App)

## Project Overview
- This is a Next.js app (see `README.md`) for a food delivery platform.
- Uses the Next.js App Router (see `app/`), with both JavaScript and TypeScript files.
- UI components are in `components/` and `app/_components/`.
- Utility and API logic is in `app/_utils/`.
- Auth flows are in `app/(auth)/` with separate layouts and pages for sign-in and sign-up.

## Key Architectural Patterns
- **App Router**: Pages and layouts are organized under `app/`, using Next.js conventions.
- **Component Structure**: Shared UI in `components/ui/`, app-specific components in `app/_components/`.
- **API Utilities**: Centralized in `app/_utils/GlobalApi.js` for backend/data fetching logic.
- **Auth**: Custom auth pages under `app/(auth)/sign-in/[[...sign-in]]/` and `app/(auth)/sign-up/[[...sign-up]]/`.
- **Styling**: Global styles in `app/globals.css`, component-level styles may be colocated.
- **Assets**: Static files in `public/`.

## Developer Workflows
- **Start Dev Server**: `npm run dev` (see `README.md`).
- **Build**: `npm run build`.
- **Lint**: If configured, use `npm run lint`.
- **No explicit test setup**: No test scripts or test folders found.
- **Debugging**: Use Next.js error overlays and browser devtools.

## Project-Specific Conventions
- **Component Naming**: PascalCase for React components (e.g., `CategoryList.jsx`).
- **File Placement**: Place new shared UI in `components/ui/`, app-specific in `app/_components/`.
- **API Calls**: Use or extend `app/_utils/GlobalApi.js` for all backend/data fetching.
- **Auth Pages**: Follow the nested folder structure in `app/(auth)/` for new auth-related pages.
- **TypeScript**: Use `.ts`/`.tsx` for new files unless working in a JS-only area.

## Integration Points
- **External APIs**: All API integrations should be routed through `GlobalApi.js`.
- **Fonts**: Uses `next/font` for font optimization (see `README.md`).
- **Deployment**: Designed for Vercel, but can run locally with `npm run dev`.

## Examples
- To add a new category list UI: edit `app/_components/CategoryList.jsx`.
- To add a new API call: extend `app/_utils/GlobalApi.js`.
- To add a new auth page: follow the structure in `app/(auth)/`.

---

For more details, see `README.md` and the `app/` directory structure.
