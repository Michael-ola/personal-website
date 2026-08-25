# Michael Olaitan Ibitoye — Engineering Portfolio V3

A fresh parallel build using:

- Next.js
- TypeScript
- Tailwind CSS
- Framer Motion
- next-themes
- react-icons

## Theme behavior

- Device set to dark → dark theme
- Device set to light → light theme
- No resolvable preference → dark CSS fallback
- Visitors can override the theme from the navbar

## V3 changes

- Larger "I am Michael Olaitan Ibitoye" introduction.
- Wider hero headline and raised portrait retained.
- More expressive light theme using teal, violet and warm amber accents.
- Dark theme keeps the technical look with restrained cyan, violet and amber gradients.
- Larger section eyebrow labels throughout the site.
- Public-facing copy throughout; no internal portfolio-building commentary.
- Homepage navbar links remain `/#...`, so navigation works from project pages.
- Hero homepage navigation uses Next.js `<Link>`, fixing `no-html-link-for-pages`.
- Theme toggle does not use `useEffect` / synchronous state updates.
- GitHub and LinkedIn brand icons remain in `react-icons/fa6`; generic icons remain in `react-icons/fi`.
- BrightNext Academy remains in Experience and Pendulum remains omitted.
- Solar project uses real project images.
- Agricultural stone-detection project uses the generated architecture visual.
- Project pages retain the sticky case-study contents list.

## Run

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

## Data-driven structure

- `src/data/projects.ts`
- `src/data/publications.ts`
- `src/data/experience.ts`
- `src/data/skills.ts`
- `src/data/awards.ts`
- `src/data/site.ts`

All project pages use:

```text
src/app/projects/[slug]/page.tsx
```

## Assets

Place the original images beside `create-portfolio-v3.sh` before running it.
The asset aliases from V2 are preserved.

## CV

The CV button currently points to the supplied Google Drive CV. Update `src/data/site.ts` later if needed.
