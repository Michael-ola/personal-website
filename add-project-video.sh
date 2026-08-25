#!/usr/bin/env bash
set -euo pipefail

# Add optional embedded project-video support without changing anything else.
# Run from the root of michael-portfolio-v3:
#   ./add-project-video.sh

if [ ! -f "package.json" ] || [ ! -f "src/data/projects.ts" ]; then
  echo "Error: run this script from the root of your portfolio project."
  exit 1
fi

node <<'NODE'
const fs = require("fs");

function fail(message) {
  console.error(`Error: ${message}`);
  process.exit(1);
}

const projectsPath = "src/data/projects.ts";
let projects = fs.readFileSync(projectsPath, "utf8");

if (!projects.includes('videoEmbed?: string;')) {
  const typeNeedle = '  demo?: string;\n  publication?: string;';
  if (!projects.includes(typeNeedle)) {
    fail("Could not find the Project type block in src/data/projects.ts");
  }
  projects = projects.replace(
    typeNeedle,
    '  demo?: string;\n  videoEmbed?: string;\n  publication?: string;'
  );
}

const embedLine =
  '    videoEmbed: "https://drive.google.com/file/d/1gHqlFC3wTr7DY9gi6xRDJ5NwYOfqKGZk/preview",';

if (!projects.includes(embedLine)) {
  const avNeedle =
`    demo:
      "https://drive.google.com/file/d/1gHqlFC3wTr7DY9gi6xRDJ5NwYOfqKGZk/view?usp=sharing",
    featured: true,`;

  if (!projects.includes(avNeedle)) {
    fail("Could not locate the AV project demo entry in src/data/projects.ts");
  }

  projects = projects.replace(
    avNeedle,
`    demo:
      "https://drive.google.com/file/d/1gHqlFC3wTr7DY9gi6xRDJ5NwYOfqKGZk/view?usp=sharing",
    videoEmbed: "https://drive.google.com/file/d/1gHqlFC3wTr7DY9gi6xRDJ5NwYOfqKGZk/preview",
    featured: true,`
  );
}

fs.writeFileSync(projectsPath, projects);

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
                title={\`${project.title} video demonstration\`}
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

if (!page.includes(newHero)) {
  if (!page.includes(oldHero)) {
    fail("Could not locate the existing project hero-media block.");
  }
  page = page.replace(oldHero, newHero);
}

fs.writeFileSync(pagePath, page);

console.log("Project video feature added successfully.");
console.log("AV now embeds its Drive video in the large project-media area.");
console.log("Other projects are unchanged.");
console.log("");
console.log("For another project later, add:");
console.log('  videoEmbed: "YOUR_EMBED_URL",');
NODE

echo
echo "Running lint..."
npm run lint

echo
echo "Done."
