import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import TestingApproach from "@/components/TestingApproach";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-background">
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <TestingApproach />
      <Projects />
      <Contact />
      <Footer />
    </main>
  );
}
