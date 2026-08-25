#!/usr/bin/env bash
set -euo pipefail

# Patch only the Battery Digital Twin GitHub link.
#
# Run from the root of michael-portfolio-v3:
#   bash ./patch-battery-github-link.sh

if [ ! -f "package.json" ] || [ ! -f "src/data/projects.ts" ]; then
  echo "Error: run this script from the root of michael-portfolio-v3."
  exit 1
fi

node <<'NODE'
const fs = require("fs");

const path = "src/data/projects.ts";
let src = fs.readFileSync(path, "utf8");

const repo =
  'https://github.com/Michael-ola/battery-digital-twin-soc-fault-diagnosis';

if (src.includes(repo)) {
  console.log("Battery GitHub link is already present.");
  process.exit(0);
}

const anchor = `    heroImage: "/images/battery/system-architecture.png",
    heroFit: "contain",
    featured: true,`;

if (!src.includes(anchor)) {
  console.error("Error: could not locate the Battery Digital Twin project block.");
  process.exit(1);
}

src = src.replace(
  anchor,
`    heroImage: "/images/battery/system-architecture.png",
    heroFit: "contain",
    github: "${repo}",
    featured: true,`
);

fs.writeFileSync(path, src);
console.log("Battery Digital Twin GitHub link added.");
NODE

echo
echo "Running lint..."
npm run lint

echo
echo "Patch complete."
