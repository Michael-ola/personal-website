import Link from "next/link";
import { notFound } from "next/navigation";
import { FaGithub } from "react-icons/fa6";
import { FiArrowLeft, FiArrowUpRight, FiPlayCircle } from "react-icons/fi";
import { Container } from "@/components/ui/Container";
import { TechBadge } from "@/components/ui/TechBadge";
import { ProjectVisual } from "@/components/ui/ProjectVisual";
import { ImageLightboxGallery } from "@/components/ui/ImageLightboxGallery";
import { projects } from "@/data/projects";
import { slugify } from "@/lib/utils";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);

  if (!project) notFound();

  return (
    <main className="pb-20 pt-24 sm:pt-28">
      <Container>
        <Link
          href="/#projects"
          className="mb-7 inline-flex items-center gap-2 text-sm text-[var(--muted)] transition hover:text-[var(--text)]"
        >
          <FiArrowLeft className="h-4 w-4" />
          Back to projects
        </Link>

        <div className="max-w-5xl">
          <p className="font-mono text-sm font-medium uppercase tracking-[0.19em] text-[var(--accent)]">
            {project.kicker}
          </p>
          <h1 className="mt-3 text-4xl font-semibold leading-tight tracking-[-0.04em] text-[var(--text)] sm:text-6xl">
            {project.title}
          </h1>
          <p className="mt-5 max-w-4xl text-lg leading-8 text-[var(--muted)]">{project.summary}</p>

          <div className="mt-6 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <TechBadge key={tag}>{tag}</TechBadge>
            ))}
          </div>

          <div className="mt-7 flex flex-wrap gap-3">
            {project.github && (
              <a href={project.github} target="_blank" rel="noreferrer" className="secondary-button">
                <FaGithub className="h-4 w-4" /> Repository
              </a>
            )}
            {project.demo && (
              <a href={project.demo} target="_blank" rel="noreferrer" className="primary-button">
                <FiPlayCircle className="h-4 w-4" /> Watch demo
              </a>
            )}
            {project.publication && (
              <a href={project.publication} target="_blank" rel="noreferrer" className="secondary-button">
                Publication <FiArrowUpRight className="h-4 w-4" />
              </a>
            )}
          </div>
        </div>

        <div className="group mt-10">
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
        </div>

        {project.metrics && (
          <div className="mt-5 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--border)] lg:grid-cols-4">
            {project.metrics.map((metric) => (
              <div key={metric.label} className="bg-[var(--surface)] p-5">
                <p className="text-2xl font-semibold tracking-tight text-[var(--text)]">{metric.value}</p>
                <p className="mt-1 text-xs leading-5 text-[var(--muted)]">{metric.label}</p>
              </div>
            ))}
          </div>
        )}

        <div className="mt-12 grid gap-10 lg:grid-cols-[240px_1fr] lg:gap-14">
          <aside>
            <div className="sticky top-24">
              <h2 className="text-xl font-semibold text-[var(--text)]">Case study</h2>
              <nav className="mt-5 border-l border-[var(--border)] pl-4">
                <ul className="space-y-3">
                  {project.sections.map((section) => (
                    <li key={section.title}>
                      <a
                        href={`#${slugify(section.title)}`}
                        className="text-sm text-[var(--muted)] transition hover:text-[var(--accent-strong)]"
                      >
                        {section.title}
                      </a>
                    </li>
                  ))}
                  {project.gallery && project.gallery.length > 0 && (
                    <li>
                      <a
                        href="#system-results"
                        className="text-sm text-[var(--muted)] transition hover:text-[var(--accent-strong)]"
                      >
                        System & results
                      </a>
                    </li>
                  )}
                </ul>
              </nav>
            </div>
          </aside>

          <div className="space-y-9">
            {project.sections.map((section) => (
              <section
                id={slugify(section.title)}
                key={section.title}
                className="scroll-mt-28 border-b border-[var(--border)] pb-9 last:border-b-0"
              >
                <h2 className="text-3xl font-semibold tracking-tight text-[var(--text)]">
                  {section.title}
                </h2>
                <p className="mt-4 max-w-4xl text-base leading-8 text-[var(--muted)]">{section.body}</p>
              </section>
            ))}
          </div>
        </div>

        {project.gallery && project.gallery.length > 0 && (
          <section
            id="system-results"
            className="scroll-mt-28 mt-14 border-t border-[var(--border)] pt-10"
          >
            <div className="mb-7">
              <p className="font-mono text-sm font-medium uppercase tracking-[0.19em] text-[var(--accent)]">
                Evidence
              </p>
              <h2 className="mt-2 text-4xl font-semibold tracking-tight text-[var(--text)]">
                System & results
              </h2>
            </div>

            <ImageLightboxGallery images={project.gallery} />
          </section>
        )}
      </Container>
    </main>
  );
}
