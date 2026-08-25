"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FiFileText } from "react-icons/fi";
import { site } from "@/data/site";
import { Container } from "@/components/ui/Container";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

const nav = [
  ["Projects", "/#projects"],
  ["Experience", "/#experience"],
  ["Education", "/#education"],
  ["Publications", "/#publications"],
  ["About", "/#about"],
];

export function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-[var(--border)] bg-[var(--nav-bg)] backdrop-blur-xl">
      <Container className="flex h-16 items-center justify-between">
        <Link href="/" className="font-semibold tracking-tight text-[var(--text)]">
          MI<span className="text-[var(--accent)]">.</span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {nav.map(([label, href]) => (
            <Link
              key={href}
              href={href}
              className="text-sm text-[var(--muted)] transition hover:text-[var(--text)]"
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <motion.a
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.98 }}
            href={site.cv}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-10 items-center gap-2 rounded-full border border-[var(--accent-border)] bg-[var(--accent-soft)] px-4 text-sm font-medium text-[var(--accent-strong)] transition hover:brightness-95 dark:hover:brightness-110"
          >
            <FiFileText className="h-4 w-4" />
            CV
          </motion.a>
        </div>
      </Container>
    </header>
  );
}
