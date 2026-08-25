#!/usr/bin/env bash
set -euo pipefail

# ------------------------------------------------------------
# Corrected project-video update.
# Safe to run even if the previous script partially modified
# src/data/projects.ts before failing.
#
# Run from the root of michael-portfolio-v3:
#   bash ./add-project-video-v2.sh
# ------------------------------------------------------------

if [ ! -f "package.json" ] || [ ! -f "src/data/projects.ts" ]; then
  echo "Error: run this from the root of michael-portfolio-v3."
  echo "Expected to find: package.json and src/data/projects.ts"
  exit 1
fi

node <<'NODE'
const fs = require("fs");

function fail(message) {
  console.error(`Error: ${message}`);
  process.exit(1);
}

/* ----------------------------------------------------------
   1. Ensure project data supports optional embedded video
   ---------------------------------------------------------- */
const projectsPath = "src/data/projects.ts";
let projects = fs.readFileSync(projectsPath, "utf8");

if (!projects.includes("videoEmbed?: string;")) {
  const typeNeedle = "  demo?: string;\n  publication?: string;";

  if (!projects.includes(typeNeedle)) {
    fail("Could not find the Project type block.");
  }

  projects = projects.replace(
    typeNeedle,
    "  demo?: string;\n  videoEmbed?: string;\n  publication?: string;"
  );
}

const avEmbed =
  '    videoEmbed: "https://drive.google.com/file/d/1gHqlFC3wTr7DY9gi6xRDJ5NwYOfqKGZk/preview",';

if (!projects.includes(avEmbed)) {
  const avDemo =
`    demo:
      "https://drive.google.com/file/d/1gHqlFC3wTr7DY9gi6xRDJ5NwYOfqKGZk/view?usp=sharing",
    featured: true,`;

  if (!projects.includes(avDemo)) {
    fail("Could not locate the AV demo entry.");
  }

  projects = projects.replace(
    avDemo,
`    demo:
      "https://drive.google.com/file/d/1gHqlFC3wTr7DY9gi6xRDJ5NwYOfqKGZk/view?usp=sharing",
    videoEmbed: "https://drive.google.com/file/d/1gHqlFC3wTr7DY9gi6xRDJ5NwYOfqKGZk/preview",
    featured: true,`
  );
}

fs.writeFileSync(projectsPath, projects);


/* ----------------------------------------------------------
   2. Replace only the large project media area.
      Projects with videoEmbed -> embedded video.
      Everything else -> existing ProjectVisual unchanged.
   ---------------------------------------------------------- */
const pagePath = "src/app/projects/[slug]/page.tsx";
let page = fs.readFileSync(pagePath, "utf8");

const oldHero =
`        <div className="group mt-10">
          <ProjectVisual
            src={project.heroImage}
            alt={project.title}
            priority
            fit={project.heroFit}
            variant={project.heroVisual}
          />
        </div>`;

const newHero =
`        <div className="group mt-10">
          {project.videoEmbed ? (
            <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-[var(--border)] bg-black shadow-[0_18px_45px_-34px_var(--shadow)]">
              <iframe
                src={project.videoEmbed}
                title={project.title + " video demonstration"}
                className="absolute inset-0 h-full w-full"
                allow="autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
              />
            </div>
          ) : (
            <ProjectVisual
              src={project.heroImage}
              alt={project.title}
              priority
              fit={project.heroFit}
              variant={project.heroVisual}
            />
          )}
        </div>`;

if (!page.includes("project.videoEmbed ?")) {
  if (!page.includes(oldHero)) {
    fail("Could not locate the existing project media block.");
  }

  page = page.replace(oldHero, newHero);
  fs.writeFileSync(pagePath, page);
}

console.log("Video support added successfully.");
console.log("CARLA will now embed the Drive video in the large media area.");
console.log("No other project content or styling was changed.");
NODE

echo
echo "Running lint..."
npm run lint

echo
echo "Update complete."
