"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowDown, Github, Linkedin, Mail, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";

const titles = ["a full stack developer", "an accessibility QA"];

const TypewriterEffect = ({ text }: { text: string }) => {
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    let i = 0;
    setDisplayText("");
    const intervalId = setInterval(() => {
      setDisplayText(text.slice(0, i + 1));
      i++;
      if (i > text.length) clearInterval(intervalId);
    }, 100); // Typing speed

    return () => clearInterval(intervalId);
  }, [text]);

  return <span>{displayText}</span>;
};

export default function Hero() {
  const [titleIndex, setTitleIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTitleIndex((prevIndex) => (prevIndex + 1) % titles.length);
    }, 4000); // Switch title every 4 seconds

    return () => clearInterval(intervalId);
  }, []);

  const handleScrollToProjects = () => {
    const element = document.querySelector("#projects");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleScrollToNext = () => {
    const element = document.querySelector("#about");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleScrollToContact = () => {
    const element = document.querySelector("#contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10 relative">
        {/* Greeting */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-foreground text-sm sm:text-base mb-4 tracking-wide"
        >
          bonjour, hi there! 👋
        </motion.p>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl sm:text-6xl lg:text-7xl font-bold mb-4"
        >
          <span className="bg-gradient-to-r from-primary via-purple-500 to-violet-500 bg-clip-text text-transparent">
            i&apos;m mufida :)
          </span>
        </motion.h1>

        {/* Title with Typing Effect */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0 }}
          className="text-2xl sm:text-3xl lg:text-4xl text-muted-foreground mb-6 min-h-[40px] font-medium"
        >
          <TypewriterEffect key={titleIndex} text={titles[titleIndex]} />
          <span className="animate-pulse">|</span>
        </motion.h2>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto mb-8 leading-relaxed"
        >
          I thrive when I’m solving problems, writing clean code, and turning
          ideas into something people can actually use. Even in accessibility
          testing today, I still think like a builder.
        </motion.p>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex justify-center space-x-4 mb-8"
        >
          <Button
            variant="outline"
            size="icon"
            className="rounded-full hover:bg-primary hover:text-primary-foreground hover:border-primary hover:scale-110 hover:ring-2 hover:ring-accent hover:ring-offset-2 hover:ring-offset-background transition-all duration-300 bg-background/50 backdrop-blur-sm"
            asChild
          >
            <a
              href="https://github.com/mufidaandi"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit Mufida's GitHub profile"
            >
              <Github className="h-5 w-5" />
            </a>
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="rounded-full hover:bg-primary hover:text-primary-foreground hover:border-primary hover:scale-110 hover:ring-2 hover:ring-accent hover:ring-offset-2 hover:ring-offset-background transition-all duration-300 bg-background/50 backdrop-blur-sm"
            asChild
          >
            <a
              href="https://linkedin.com/in/mufidaandi"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Connect with Mufida on LinkedIn"
            >
              <Linkedin className="h-5 w-5" />
            </a>
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="rounded-full hover:bg-primary hover:text-primary-foreground hover:border-primary hover:scale-110 hover:ring-2 hover:ring-accent hover:ring-offset-2 hover:ring-offset-background transition-all duration-300 bg-background/50 backdrop-blur-sm"
            asChild
          >
            <a
              href="mailto:mufidaandi@gmail.com"
              aria-label="Email Mufida at mufidaandi@gmail.com"
            >
              <Mail className="h-5 w-5" />
            </a>
          </Button>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex flex-col sm:flex-row justify-center gap-4"
        >
          <Button
            size="lg"
            className="group relative cursor-pointer overflow-hidden bg-gradient-to-r from-primary via-purple-500 to-violet-500 text-white hover:scale-105 hover:ring-2 hover:ring-accent hover:ring-offset-2 hover:ring-offset-background transition-all duration-300 border-0"
            onClick={handleScrollToProjects}
          >
            View My Work
            <ArrowDown className="ml-2 h-4 w-4 group-hover:translate-y-1 transition-transform" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="hover:bg-primary/20 cursor-pointer hover:border-primary hover:scale-105 hover:ring-2 hover:ring-accent hover:ring-offset-2 hover:ring-offset-background transition-all duration-300 bg-background/50 backdrop-blur-sm"
            onClick={handleScrollToContact}
          >
            Get In Touch
          </Button>
        </motion.div>
      </div>

      {/* Clickable Bottom Area for Next Section */}
      <div
        onClick={handleScrollToNext}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleScrollToNext();
          }
        }}
        tabIndex={0}
        className="absolute bottom-0 left-0 w-full h-32 flex items-end justify-center pb-8 cursor-pointer hover:bg-gradient-to-t hover:from-primary/5 to-transparent transition-all duration-700 group z-20 focus:outline-none focus:ring-2 focus:ring-primary/50"
        role="button"
        aria-label="Scroll to About section"
      >
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="text-muted-foreground/30 group-hover:text-primary/60 transition-colors duration-500"
        >
          <ChevronDown className="w-10 h-10" strokeWidth={1} />
        </motion.div>
      </div>
    </section>
  );
}
