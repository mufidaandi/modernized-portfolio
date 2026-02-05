"use client";

import { motion, Variants } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Badge } from "@/components/ui/badge";
import { ChevronDown } from "lucide-react";

const skillCategories = [
  {
    title: "Frontend",
    skills: [
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "HTML5",
      "CSS3",
      "Tailwind CSS",
      "jQuery",
    ],
  },
  {
    title: "Backend",
    skills: ["Node.js", "Express.js", "Spring Boot", "REST APIs"],
  },
  {
    title: "Database",
    skills: ["MongoDB", "PostgreSQL", "Prisma"],
  },
  {
    title: "Tools & Platforms",
    skills: ["Git", "GitHub", "Vercel", "VS Code"],
  },
  {
    title: "Accessibility & QA",
    skills: [
      "WCAG 2.1/2.2",
      "Section 508",
      "Accessibility Testing",
      "Screen Readers",
      "Responsive Design",
    ],
  },
];

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-100px" });

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
    },
  };

  const skillVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.3 },
    },
  };

  return (
    <section id="skills" className="py-20 lg:py-32 relative">
      {/* Background accent */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/3 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/3 left-0 w-72 h-72 bg-primary/5 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              Skills & Technologies
            </h2>
            <motion.div
              className="w-24 h-1 bg-gradient-to-r from-primary to-purple-500 mx-auto rounded-full"
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{
                duration: 0.8,
                delay: isInView ? 0.3 : 0,
                ease: "easeInOut",
              }}
            />
            <p className="text-muted-foreground mt-6 max-w-2xl mx-auto">
              A comprehensive toolkit for building modern, accessible, and
              scalable web applications.
            </p>
          </motion.div>

          {/* Skills Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skillCategories.map((category, categoryIndex) => (
              <motion.div
                key={category.title}
                variants={itemVariants}
                whileHover={{ scale: 1.03, y: -8 }}
                className={`p-6 rounded-xl bg-card border border-border hover:border-primary hover:ring-2 hover:ring-accent hover:ring-offset-2 hover:ring-offset-background transition-all duration-300 ${
                  categoryIndex === skillCategories.length - 1 &&
                  skillCategories.length % 3 !== 0
                    ? "lg:col-span-1 md:col-span-2 lg:col-start-2"
                    : ""
                }`}
              >
                <h3 className="font-mono font-semibold text-lg mb-4 text-primary">
                  {`{ ${category.title} }`}
                </h3>
                <motion.div
                  variants={containerVariants}
                  className="flex flex-wrap gap-2"
                >
                  {category.skills.map((skill) => (
                    <motion.div
                      key={skill}
                      variants={skillVariants}
                      whileHover={{ scale: 1.1, y: -2 }}
                    >
                      <Badge
                        variant="secondary"
                        className="font-mono text-sm hover:bg-primary hover:text-primary-foreground hover:ring-2 hover:ring-accent hover:ring-offset-2 hover:ring-offset-card transition-all duration-300 cursor-default"
                      >
                        {skill}
                      </Badge>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Currently Learning */}
          <motion.div variants={itemVariants} className="mt-12 text-center">
            <p className="text-muted-foreground font-mono text-sm mb-4">
              {"// Currently leveling up in"}
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {["Next.js 15", "PostgreSQL", "Prisma ORM", "TypeScript"].map(
                (tech) => (
                  <motion.div
                    key={tech}
                    whileHover={{ scale: 1.15, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Badge className="font-mono text-sm bg-gradient-to-r from-primary to-purple-500 hover:from-primary/90 hover:to-purple-500/90 hover:ring-2 hover:ring-accent hover:ring-offset-2 hover:ring-offset-background transition-all duration-300 cursor-default">
                      {tech}
                    </Badge>
                  </motion.div>
                ),
              )}
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Clickable Bottom Area for Next Section */}
      <div
        onClick={() =>
          document
            .getElementById("projects")
            ?.scrollIntoView({ behavior: "smooth" })
        }
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            document
              .getElementById("projects")
              ?.scrollIntoView({ behavior: "smooth" });
          }
        }}
        tabIndex={0}
        className="absolute bottom-0 left-0 w-full h-32 flex items-end justify-center pb-8 cursor-pointer hover:bg-gradient-to-t hover:from-primary/5 to-transparent transition-all duration-700 group z-20 focus:outline-none focus:ring-2 focus:ring-primary/50"
        role="button"
        aria-label="Scroll to Projects section"
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
