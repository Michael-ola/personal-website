#!/usr/bin/env bash
set -euo pipefail

# ------------------------------------------------------------
# Patch: add Education section only.
#
# Adds:
# - Education data
# - Education section between Experience and Publications
# - Education navbar link using /#education so it works everywhere
#
# Nothing else is changed.
#
# Run from the root of michael-portfolio-v3:
#   bash ./add-education-section.sh
# ------------------------------------------------------------

if [ ! -f "package.json" ] || [ ! -f "src/app/page.tsx" ]; then
  echo "Error: run this script from the root of michael-portfolio-v3."
  exit 1
fi

mkdir -p src/data src/components/sections

cat > src/data/education.ts <<'EOF'
export const education = [
  {
    degree: "Erasmus Mundus Joint Master's in Electric Vehicle Propulsion and Control (E-PiCo+)",
    institution:
      "École Centrale de Nantes · University POLITEHNICA of Bucharest · University of L'Aquila",
    location: "France · Romania · Italy",
    period: "2025 — 2027 (expected)",
    status: "Current",
    focus:
      "Control systems, electric drives, embedded systems, power electronics, estimation and machine learning for autonomous systems.",
  },
  {
    degree: "B.Eng. Electrical & Electronics Engineering",
    institution: "Federal University of Technology, Minna (FUTMinna)",
    location: "Minna, Nigeria",
    period: "Completed 2023",
    status: "Completed",
    focus:
      "Electrical and electronics engineering with project work spanning embedded systems, IoT, control, software and intelligent systems.",
  },
];
EOF

cat > src/components/sections/Education.tsx <<'EOF'
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { education } from "@/data/education";

export function Education() {
  return (
    <section id="education" className="section section-alt scroll-mt-20">
      <Container>
        <SectionHeading
          eyebrow="Education"
          title="Academic Background"
          description="Engineering education across electrical systems, control, embedded computing and electric-vehicle technologies."
        />

        <div className="grid gap-4 lg:grid-cols-2">
          {education.map((item) => (
            <article
              key={item.degree}
              className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-[0_12px_34px_-30px_var(--shadow)]"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="rounded-full border border-[var(--accent-border)] bg-[var(--accent-soft)] px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--accent-strong)]">
                  {item.status}
                </span>

                <span className="font-mono text-xs text-[var(--subtle)]">
                  {item.period}
                </span>
              </div>

              <h3 className="mt-5 text-xl font-semibold leading-7 text-[var(--text)] sm:text-2xl">
                {item.degree}
              </h3>

              <p className="mt-3 text-sm font-medium leading-6 text-[var(--accent-strong)]">
                {item.institution}
              </p>

              <p className="mt-1 text-xs text-[var(--subtle)]">
                {item.location}
              </p>

              <p className="mt-5 text-sm leading-7 text-[var(--muted)]">
                {item.focus}
              </p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
EOF

node <<'NODE'
const fs = require("fs");

function fail(message) {
  console.error(`Error: ${message}`);
  process.exit(1);
}

/* ----------------------------------------------------------
   Add Education to homepage
   ---------------------------------------------------------- */
const pagePath = "src/app/page.tsx";
let page = fs.readFileSync(pagePath, "utf8");

const educationImport =
  'import { Education } from "@/components/sections/Education";';

if (!page.includes(educationImport)) {
  const experienceImport =
    'import { Experience } from "@/components/sections/Experience";';

  if (!page.includes(experienceImport)) {
    fail("Could not find Experience import in src/app/page.tsx");
  }

  page = page.replace(
    experienceImport,
    `${experienceImport}\n${educationImport}`
  );
}

if (!page.includes("<Education />")) {
  const anchor =
`      <Experience />
      <Publications />`;

  if (!page.includes(anchor)) {
    fail("Could not find Experience/Publications sequence in src/app/page.tsx");
  }

  page = page.replace(
    anchor,
`      <Experience />
      <Education />
      <Publications />`
  );
}

fs.writeFileSync(pagePath, page);


/* ----------------------------------------------------------
   Add Education to navbar.
   Uses /#education, preserving the routing fix from project pages.
   ---------------------------------------------------------- */
const navPath = "src/components/layout/Navbar.tsx";
let nav = fs.readFileSync(navPath, "utf8");

if (!nav.includes('["Education", "/#education"]')) {
  const anchor =
`  ["Experience", "/#experience"],
  ["Publications", "/#publications"],`;

  if (!nav.includes(anchor)) {
    fail("Could not find navbar Experience/Publications entries.");
  }

  nav = nav.replace(
    anchor,
`  ["Experience", "/#experience"],
  ["Education", "/#education"],
  ["Publications", "/#publications"],`
  );
}

fs.writeFileSync(navPath, nav);

console.log("Education section added successfully.");
NODE

echo
echo "Running lint..."
npm run lint

echo
echo "Patch complete."
