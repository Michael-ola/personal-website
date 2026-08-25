import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { experience } from "@/data/experience";

export function Experience() {
  return (
    <section id="experience" className="section scroll-mt-20">
      <Container>
        <SectionHeading
          eyebrow="Experience"
          title="Professional Experience"
          description="Roles across applied AI, embedded systems, robotics and technical education."
        />

        <div className="divide-y divide-[var(--border)] border-y border-[var(--border)]">
          {experience.map((item) => (
            <article
              key={`${item.organization}-${item.period}`}
              className="grid gap-4 py-6 md:grid-cols-[1fr_190px]"
            >
              <div>
                <p className="text-xl font-semibold text-[var(--text)]">{item.role}</p>
                <p className="mt-1 text-sm font-medium text-[var(--accent-strong)]">{item.organization}</p>
                <p className="mt-1 text-xs text-[var(--subtle)]">
                  {item.location} · {item.employment}
                </p>
                <p className="mt-3 max-w-4xl text-sm leading-6 text-[var(--muted)]">{item.summary}</p>
              </div>
              <p className="font-mono text-xs text-[var(--subtle)] md:text-right">{item.period}</p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
