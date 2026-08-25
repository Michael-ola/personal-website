import { Hero } from "@/components/sections/Hero";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { Skills } from "@/components/sections/Skills";
import { Experience } from "@/components/sections/Experience";
import { Education } from "@/components/sections/Education";
import { Publications } from "@/components/sections/Publications";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedProjects />
      <Skills />
      <Experience />
      <Education />
      <Publications />
      <About />
      <Contact />
    </>
  );
}
