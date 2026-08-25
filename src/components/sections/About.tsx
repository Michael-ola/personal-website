import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { awards } from "@/data/awards";
import { FiArrowUpRight } from "react-icons/fi";

export function About() {
  return (
    <section id="about" className="section scroll-mt-20">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1fr_0.9fr]">
          <div>
            <SectionHeading
              eyebrow="About"
              title="Control, computation and hardware."
            />
            <div className="space-y-4 text-base leading-8 text-[var(--muted)]">
              <p>
                I am an Electrical and Electronics Engineer and Erasmus Mundus scholar
                working across control systems, embedded computing, IoT and applied
                machine learning.
              </p>
              <p>
                My technical interests include electric drives, state estimation,
                battery diagnostics, autonomous perception, embedded sensing and
                edge-oriented machine learning.
              </p>
              <p>
                I enjoy engineering problems that require software, electronics and
                physical-system understanding to work together as one complete system.
              </p>
            </div>
          </div>

          <div>
            <p className="mb-5 text-xl font-semibold text-[var(--text)]">Recognition</p>
            <div className="divide-y divide-[var(--border)] border-y border-[var(--border)]">
              {awards.map((award) => (
                <a
                  key={award.title}
                  href={award.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-start justify-between gap-5 py-5"
                >
                  <div>
                    <p className="text-sm leading-6 text-[var(--muted-strong)] transition group-hover:text-[var(--text)]">
                      {award.title}
                    </p>
                    <p className="mt-1 font-mono text-xs text-[var(--subtle)]">{award.year}</p>
                  </div>
                  <FiArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-[var(--subtle)] transition group-hover:text-[var(--accent)]" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
