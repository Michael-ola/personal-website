#!/usr/bin/env bash
set -euo pipefail

# ------------------------------------------------------------
# Patch: refine Education layout only.
#
# Changes:
# - Erasmus Mundus partner universities are listed vertically.
# - The degree/title associated with each university is shown.
# - B.Eng. entry remains intact.
#
# Run from the root of michael-portfolio-v3:
#   bash ./patch-education-universities.sh
# ------------------------------------------------------------

if [ ! -f "package.json" ] || [ ! -f "src/data/education.ts" ] || [ ! -f "src/components/sections/Education.tsx" ]; then
  echo "Error: run this script from the root of michael-portfolio-v3."
  exit 1
fi

cat > src/data/education.ts <<'EOF'
export type EducationItem = {
  degree: string;
  institution?: string;
  institutions?: {
    name: string;
    degreeTitle: string;
    location: string;
  }[];
  location?: string;
  period: string;
  status: string;
  focus: string;
};

export const education: EducationItem[] = [
  {
    degree: "Erasmus Mundus Joint Master's in Electric Vehicle Propulsion and Control (E-PiCo+)",
    period: "2025 — 2027 (expected)",
    status: "Current",
    institutions: [
      {
        name: "École Centrale de Nantes",
        degreeTitle: "MSc Automatic, Control & Robotics — Electric Vehicle Propulsion and Control",
        location: "Nantes, France",
      },
      {
        name: "University POLITEHNICA of Bucharest",
        degreeTitle: "Master's in Electric Vehicle Propulsion and Control Systems",
        location: "Bucharest, Romania",
      },
      {
        name: "University of L'Aquila",
        degreeTitle: "Master's in Control Systems & Automation Engineering",
        location: "L'Aquila, Italy",
      },
    ],
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

              {item.institutions ? (
                <div className="mt-5 space-y-4">
                  {item.institutions.map((institution) => (
                    <div
                      key={institution.name}
                      className="border-l-2 border-[var(--accent-border)] pl-4"
                    >
                      <p className="text-sm font-semibold leading-6 text-[var(--accent-strong)]">
                        {institution.name}
                      </p>
                      <p className="mt-1 text-sm leading-6 text-[var(--muted-strong)]">
                        {institution.degreeTitle}
                      </p>
                      <p className="mt-1 text-xs text-[var(--subtle)]">
                        {institution.location}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <>
                  <p className="mt-3 text-sm font-medium leading-6 text-[var(--accent-strong)]">
                    {item.institution}
                  </p>

                  <p className="mt-1 text-xs text-[var(--subtle)]">
                    {item.location}
                  </p>
                </>
              )}

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

echo
echo "Running lint..."
npm run lint

echo
echo "Patch complete."
