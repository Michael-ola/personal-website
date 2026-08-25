import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { skillGroups } from "@/data/skills";

export function Skills() {
  return (
    <section className="section section-alt">
      <Container>
        <SectionHeading
          eyebrow="Technical Skills"
          title="Engineering Skills & Tools"
          description="Control and estimation, embedded computing, IoT, machine learning, software engineering, simulation and hardware prototyping."
        />

        <div className="grid gap-px overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--border)] lg:grid-cols-5">
          {skillGroups.map((group) => (
            <div key={group.title} className="bg-[var(--surface)] p-5">
              <h3 className="text-base font-semibold leading-6 text-[var(--text)]">{group.title}</h3>
              <div className="mt-4 flex flex-wrap gap-x-2 gap-y-1">
                {group.items.map((item, index) => (
                  <span key={item} className="text-xs leading-5 text-[var(--muted)]">
                    {item}{index < group.items.length - 1 ? " ·" : ""}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
