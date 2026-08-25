import Link from "next/link";
import { FiArrowUpRight, FiFileText } from "react-icons/fi";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { publications } from "@/data/publications";

export function Publications() {
  return (
    <section id="publications" className="section section-alt scroll-mt-20">
      <Container>
        <SectionHeading
          eyebrow="Research"
          title="Research & Publications"
          description="Peer-reviewed work in embedded systems, IoT, sustainable engineering and machine-learning applications."
        />

        <div className="grid gap-4">
          {publications.map((paper, index) => (
            <article
              key={paper.title}
              className="grid gap-5 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 md:grid-cols-[68px_1fr_auto]"
            >
              <div className="font-mono text-sm text-[var(--subtle)]">0{index + 1}</div>
              <div>
                <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.17em] text-[var(--accent)]">
                  {paper.type} · {paper.year}
                </p>
                <h3 className="mt-2 max-w-3xl text-xl font-semibold leading-7 text-[var(--text)]">
                  {paper.title}
                </h3>
                <p className="mt-2 text-sm text-[var(--muted)]">{paper.venue}</p>
              </div>
              <div className="flex items-start gap-2 md:justify-end">
                <a href={paper.doi} target="_blank" rel="noreferrer" className="icon-button" aria-label="Open DOI">
                  <FiArrowUpRight className="h-4 w-4" />
                </a>
                <a href={paper.pdf} target="_blank" rel="noreferrer" className="icon-button" aria-label="Open PDF">
                  <FiFileText className="h-4 w-4" />
                </a>
                {paper.relatedProject && (
                  <Link href={paper.relatedProject} className="secondary-button">
                    Project
                  </Link>
                )}
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
