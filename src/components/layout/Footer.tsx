import { FaGithub, FaLinkedinIn } from "react-icons/fa6";
import { FiMail } from "react-icons/fi";
import { Container } from "@/components/ui/Container";
import { site } from "@/data/site";

export function Footer() {
  return (
    <footer className="border-t border-[var(--border)] py-8">
      <Container className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-medium text-[var(--text)]">{site.fullName}</p>
          <p className="mt-1 text-sm text-[var(--muted)]">{site.domain}</p>
        </div>
        <div className="flex items-center gap-3">
          <a className="icon-button" href={site.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
            <FaLinkedinIn className="h-4 w-4" />
          </a>
          <a className="icon-button" href={site.github} target="_blank" rel="noreferrer" aria-label="GitHub">
            <FaGithub className="h-4 w-4" />
          </a>
          <a className="icon-button" href={`mailto:${site.email}`} aria-label="Email">
            <FiMail className="h-4 w-4" />
          </a>
        </div>
      </Container>
    </footer>
  );
}
