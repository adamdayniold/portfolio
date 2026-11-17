# Adam Dayniold | Portfolio

An interactive developer portfolio styled as a VS Code-like IDE. Browse my about, experience, skills and projects as files, open them in tabs, jump around with a command palette, or type commands in the built-in terminal.

**Live site:** https://adamdayniold.github.io/portfolio

## Features

- File explorer, editor tabs and a read-only Monaco editor with a Monokai theme
- Command palette (`Ctrl/Cmd + P`) with instant filtering
- Terminal with `help`, `about`, `skills`, `experience`, `projects`, `contact` and `clear`
- Fully keyboard-operable tabs, sidebar and palette
- All content is plain files in `content/`, so updating the site means editing text, not code

## Tech stack

Next.js 16 (static export), React 19, TypeScript, Tailwind CSS 4, Monaco Editor, Lucide icons.

## Project structure

```
app/                 Pages and components (Sidebar, Terminal, CommandPalette, CodeBlock)
content/Portfolio/   The portfolio content shown as files
lib/                 File loading, language helpers, editor theme
.github/workflows/   GitHub Pages deployment
```

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static export to out/
npm run lint
```

## Editing the content

Everything shown in the explorer lives in `content/Portfolio/`. Add, rename or edit a file there and it appears in the sidebar and command palette on the next build. The terminal reads `about_me.md`, `skills.json`, `experience.json`, `projects.json` and `contact.md`.

## Deployment

Pushing to `main` runs `.github/workflows/deploy-pages.yml`, which builds the site with `NEXT_PUBLIC_BASE_PATH=/portfolio` and publishes `out/` to GitHub Pages.
