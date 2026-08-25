import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TechBadge } from "@/components/ui/TechBadge";
import { ProjectVisual } from "@/components/ui/ProjectVisual";
import { featuredProjects, projects } from "@/data/projects";

export function FeaturedProjects() {
  return (
    <section id="projects" className="section scroll-mt-20">
      <Container>
        <SectionHeading
          eyebrow="Selected Work"
          title="Selected Engineering Projects"
          description="Control, embedded, IoT and applied-AI systems spanning electric drives, battery diagnostics, autonomous perception, industrial sensing and connected hardware."
        />

        <div className="grid gap-5 lg:grid-cols-2">
          {featuredProjects.map((project) => (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              className="group project-card"
            >
              <ProjectVisual
                src={project.heroImage}
                alt={project.title}
                fit={project.heroFit}
                variant={project.heroVisual}
              />
              <div className="p-6">
                <div className="mb-3 flex items-center justify-between gap-4">
                  <p className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">
                    {project.kicker}
                  </p>
                  <FiArrowUpRight className="h-5 w-5 text-[var(--subtle)] transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[var(--text)]" />
                </div>
                <h3 className="text-2xl font-semibold tracking-tight text-[var(--text)]">
                  {project.title}
                </h3>
                <p className="mt-3 leading-7 text-[var(--muted)]">{project.summary}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {project.tags.slice(0, 5).map((tag) => (
                    <TechBadge key={tag}>{tag}</TechBadge>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {projects
            .filter((project) => !project.featured)
            .map((project) => (
              <Link
                key={project.slug}
                href={`/projects/${project.slug}`}
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
        </div>
      </Container>
    </section>
  );
}
