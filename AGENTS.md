# Vortex UI

Simple Vite + React SPA with no monorepo, no TypeScript, no test framework.

## Commands

- `npm run dev` - Start dev server (port 3000, auto-opens browser)
- `npm run build` - Build to `dist/`
- `npm run preview` - Preview production build

## Architecture

```
src/
├── main.jsx          # Entry point
├── App.jsx           # Main component, fetches from external API
├── App.css
├── components/       # MenuBar, Footer, RegisterForm
└── context/         # AuthContext (authentication state)
```

## Theme

Dark tech / cyberpunk hacker aesthetic. Keep this in mind when modifying CSS/colors.

## Notes

- External API: `https://vortex-engine.onrender.com/main` (may be unavailable)
- No lint/typecheck/test scripts configured
- Build output in `dist/`