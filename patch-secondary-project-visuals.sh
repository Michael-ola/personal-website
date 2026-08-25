#!/usr/bin/env bash
set -euo pipefail

# Patch only the two compact project cards.
# - Solar card: show the real project image already configured in project.heroImage
# - Agricultural card: show the existing architecture visual in project.heroVisual
#
# Run from the root of michael-portfolio-v3:
#   bash ./patch-secondary-project-visuals.sh

if [ ! -f "package.json" ] || [ ! -f "src/components/sections/FeaturedProjects.tsx" ]; then
  echo "Error: run this script from the root of michael-portfolio-v3."
  exit 1
fi

node <<'NODE'
const fs = require("fs");

const path = "src/components/sections/FeaturedProjects.tsx";
let src = fs.readFileSync(path, "utf8");

const oldBlock = `        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {projects
            .filter((project) => !project.featured)
            .map((project) => (
              <Link
                key={project.slug}
                href={\`/projects/\${project.slug}\`}
                className="group rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-[0_12px_34px_-30px_var(--shadow)] transition hover:-translate-y-0.5 hover:border-[var(--accent-border)]"
              >
                <div className="flex items-start justify-between gap-6">
                  <div>
                    <p className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">
                      {project.kicker}
                    </p>
                    <h3 className="mt-3 text-xl font-semibold text-[var(--text)]">{project.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{project.summary}</p>
                  </div>
                  <FiArrowUpRight className="mt-1 h-5 w-5 shrink-0 text-[var(--subtle)] transition group-hover:text-[var(--text)]" />
                </div>
              </Link>
            ))}
        </div>`;

const newBlock = `        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {projects
            .filter((project) => !project.featured)
            .map((project) => (
              <Link
                key={project.slug}
                href={\`/projects/\${project.slug}\`}
                className="group overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-[0_12px_34px_-30px_var(--shadow)] transition hover:-translate-y-0.5 hover:border-[var(--accent-border)]"
              >
                <ProjectVisual
                  src={project.heroImage}
                  alt={project.title}
                  fit={project.heroFit}
                  variant={project.heroVisual}
                />

                <div className="p-6">
                  <div className="flex items-start justify-between gap-6">
                    <div>
                      <p className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">
                        {project.kicker}
                      </p>
                      <h3 className="mt-3 text-xl font-semibold text-[var(--text)]">
                        {project.title}
                      </h3>
                      <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
                        {project.summary}
                      </p>
                    </div>

                    <FiArrowUpRight className="mt-1 h-5 w-5 shrink-0 text-[var(--subtle)] transition group-hover:text-[var(--text)]" />
                  </div>
                </div>
              </Link>
            ))}
        </div>`;

if (src.includes(newBlock)) {
  console.log("Patch already applied.");
  process.exit(0);
}

if (!src.includes(oldBlock)) {
  console.error("Error: could not find the compact secondary-project card block.");
  console.error("FeaturedProjects.tsx may differ from the V3 version.");
  process.exit(1);
}

src = src.replace(oldBlock, newBlock);
fs.writeFileSync(path, src);

console.log("Visuals added to the compact project cards.");
NODE

echo
echo "Running lint..."
npm run lint

echo
echo "Patch complete."
