import { FaGithub, FaLinkedinIn } from "react-icons/fa6";
import { FiArrowUpRight, FiMail } from "react-icons/fi";
import { Container } from "@/components/ui/Container";
import { site } from "@/data/site";

export function Contact() {
  return (
    <section className="pb-16 pt-1">
      <Container>
        <div className="contact-panel relative overflow-hidden rounded-[2rem] border border-[var(--border)] bg-[var(--surface)] p-8 sm:p-11">
          <div className="absolute inset-0 technical-grid opacity-25" />
          <div className="relative max-w-3xl">
            <p className="font-mono text-base font-semibold uppercase tracking-[0.18em] text-[var(--accent-strong)] sm:text-lg">
              Contact
            </p>
            <h2 className="mt-3 text-4xl font-semibold tracking-[-0.035em] text-[var(--text)] sm:text-5xl">
              Let&apos;s connect.
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-[var(--muted)]">
              For engineering opportunities, research collaborations or technical conversations,
              reach me by email or through LinkedIn.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a className="primary-button" href={`mailto:${site.email}`}>
                <FiMail className="h-4 w-4" /> Email
              </a>
              <a className="secondary-button" href={site.linkedin} target="_blank" rel="noreferrer">
                <FaLinkedinIn className="h-4 w-4" /> LinkedIn
              </a>
              <a className="secondary-button" href={site.github} target="_blank" rel="noreferrer">
                <FaGithub className="h-4 w-4" /> GitHub
              </a>
              <a className="secondary-button" href={site.cv} target="_blank" rel="noreferrer">
                CV <FiArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
