"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedinIn } from "react-icons/fa6";
import { FiArrowDown, FiArrowUpRight } from "react-icons/fi";
import { Container } from "@/components/ui/Container";
import { site } from "@/data/site";

export function Hero() {
  return (
    <section className="hero-shell relative overflow-hidden pb-14 pt-28 sm:pb-16 sm:pt-32">
      <div className="pointer-events-none absolute inset-0 technical-grid opacity-60" />
      <div className="pointer-events-none absolute -left-24 top-8 h-[390px] w-[390px] rounded-full bg-[var(--hero-orb-1)] blur-[110px]" />
      <div className="pointer-events-none absolute right-[8%] top-10 h-[420px] w-[420px] rounded-full bg-[var(--hero-orb-2)] blur-[125px]" />
      <div className="pointer-events-none absolute bottom-[-180px] left-[38%] h-[360px] w-[360px] rounded-full bg-[var(--hero-orb-3)] blur-[120px]" />

      <Container className="relative grid items-start gap-9 lg:grid-cols-[1.34fr_0.66fr] lg:gap-x-10 lg:gap-y-0">
        {/* Top text: first on mobile, left column on desktop */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65 }}
          className="pt-2 lg:col-start-1 lg:row-start-1 lg:pt-4"
        >
          <p className="mb-7 max-w-4xl text-3xl font-medium tracking-[-0.025em] text-[var(--muted-strong)] sm:text-4xl">
            I am <span className="font-semibold text-[var(--text)]">{site.fullName}</span>
          </p>

          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[var(--accent-border)] bg-[var(--accent-soft)] px-4 py-2 font-mono text-xs font-semibold uppercase tracking-[0.16em] text-[var(--accent-strong)] sm:text-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)] shadow-[0_0_12px_var(--accent-glow)]" />
            {site.domain}
          </div>

          <h1 className="max-w-[980px] text-[3.75rem] font-semibold leading-[0.94] tracking-[-0.052em] text-[var(--text)] sm:text-[4.8rem] lg:text-[5.25rem] xl:text-[5.65rem]">
            <span className="block">I build intelligent physical</span>
            <span className="block">systems.</span>
          </h1>
        </motion.div>

        {/* Portrait: second on mobile, fixed right column on desktop */}
        <div className="relative mx-auto w-full max-w-[455px] lg:col-start-2 lg:row-start-1 lg:row-span-2 lg:-mt-7">
          <div className="absolute -inset-8 rounded-[3rem] bg-[var(--portrait-halo)] blur-2xl" />

          <motion.div
            animate={{ y: [0, -12, 0], rotate: [0, 0.22, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="relative overflow-hidden rounded-[2rem] border border-[var(--border)] bg-[var(--surface)] p-2 shadow-2xl shadow-[var(--shadow)]"
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-[1.55rem]">
              <Image
                src="/images/portrait.jpeg"
                alt="Michael Olaitan Ibitoye"
                fill
                priority
                className="object-cover object-[center_30%]"
                sizes="(max-width: 1024px) 92vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
            </div>
          </motion.div>

          <motion.div
            animate={{ y: [0, 7, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="absolute -bottom-5 -left-4 rounded-2xl border border-[var(--border)] bg-[var(--floating-bg)] px-4 py-3 shadow-xl backdrop-blur"
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.17em] text-[var(--subtle)]">
             masters in EPiCo+
            </p>
            <p className="mt-1 text-sm font-medium text-[var(--text)]">
              Electric Vehicle Propulsion & Control
            </p>
          </motion.div>

          <Link
            href="/#projects"
            className="icon-button absolute -right-3 top-8 hidden shadow-xl sm:inline-flex"
            aria-label="Explore projects"
          >
            <FiArrowUpRight className="h-5 w-5" />
          </Link>
        </div>

        {/* Supporting content: third on mobile, continues left column on desktop */}
        <div className="pt-2 lg:col-start-1 lg:row-start-2 lg:pt-6">
          <p className="max-w-3xl text-lg leading-8 text-[var(--muted)] sm:text-xl">
            {site.intro}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/#projects" className="primary-button">
              Explore projects <FiArrowDown className="h-4 w-4" />
            </Link>

            <a href={site.github} target="_blank" rel="noreferrer" className="secondary-button">
              <FaGithub className="h-4 w-4" /> GitHub
            </a>

            <a href={site.linkedin} target="_blank" rel="noreferrer" className="secondary-button">
              <FaLinkedinIn className="h-4 w-4" /> LinkedIn
            </a>
          </div>

          <div className="mt-8 grid max-w-4xl grid-cols-2 gap-x-8 gap-y-3 border-t border-[var(--border)] pt-5 text-sm text-[var(--muted)] sm:grid-cols-4">
            <span>PMSM control & estimation</span>
            <span>Embedded / edge AI</span>
            <span>Autonomous perception</span>
            <span>Connected IoT systems</span>
          </div>
        </div>
      </Container>
    </section>
  );
}
