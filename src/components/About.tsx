"use client";

import { motion, Variants } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { GraduationCap, Briefcase, Award, ChevronDown } from "lucide-react";

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-100px" });

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
    },
  };

  return (
    <section id="about" className="py-20 lg:py-32 relative">
      {/* Background accent */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-0 w-72 h-72 bg-primary/5 rounded-full blur-[100px]" />
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
              About Me
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
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* About Text */}
            <motion.div variants={itemVariants} className="space-y-6">
              <p className="text-muted-foreground leading-relaxed text-lg">
                Hi, I&apos;m{" "}
                <span className="text-primary font-semibold">Mufida</span> — I
                build things for the web and make sure everyone can use them.
              </p>

              <p className="text-muted-foreground leading-relaxed">
                Right now I&apos;m an{" "}
                <span className="text-foreground font-medium">
                  Accessibility Tester at NEOGOV
                </span>
                , auditing for WCAG and Section 508 compliance. But I code
                whenever I have time because that&apos;s what I actually love
                doing — solving problems and shipping features that work for
                real people.
              </p>

              <p className="text-muted-foreground leading-relaxed">
                I graduated with{" "}
                <span className="text-foreground font-medium">
                  Dean&apos;s Honour
                </span>{" "}
                from Lambton College (Toronto) with hands-on experience in the
                MERN stack. Since then I&apos;ve been teaching myself{" "}
                <span className="text-primary">Next.js</span>,{" "}
                <span className="text-primary">PostgreSQL</span>, and{" "}
                <span className="text-primary">Prisma</span> — building stuff
                like an AI chatbot (you can try it!), an expense tracker with
                Gemini AI, and a Spring Boot financial dashboard.
              </p>

              <p className="text-foreground font-medium italic border-l-4 border-primary pl-4 mt-8">
                ✨ I don&apos;t just want to write code that works — I want to
                build things people actually enjoy using.
              </p>
            </motion.div>

            {/* Experience Cards */}
            <motion.div variants={itemVariants} className="space-y-6">
              {/* Education Card 1 */}
              <motion.div
                whileHover={{ scale: 1.02, x: 5 }}
                className="p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-primary/10 text-primary">
                    <GraduationCap className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-mono font-semibold text-lg">
                      Post-Graduate Diploma
                    </h3>
                    <p className="text-primary text-sm mb-1">
                      Full Stack Software Development
                    </p>
                    <p className="text-muted-foreground text-sm">
                      Lambton College, Toronto, Canada
                    </p>
                    <p className="text-muted-foreground text-xs mt-1">
                      Dean&apos;s Honour List
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Education Card 2 */}
              <motion.div
                whileHover={{ scale: 1.02, x: 5 }}
                className="p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-primary/10 text-primary">
                    <Award className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-mono font-semibold text-lg">
                      Bachelor&apos;s Degree
                    </h3>
                    <p className="text-primary text-sm mb-1">
                      Computer Engineering
                    </p>
                    <p className="text-muted-foreground text-sm">Philippines</p>
                  </div>
                </div>
              </motion.div>

              {/* Experience Card */}
              <motion.div
                whileHover={{ scale: 1.02, x: 5 }}
                className="p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-primary/10 text-primary">
                    <Briefcase className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">
                      Accessibility QA Tester
                    </h3>
                    <p className="text-primary text-sm mb-1">NEOGOV</p>
                    <p className="text-muted-foreground text-sm">
                      ~3 years experience
                    </p>
                    <p className="text-muted-foreground text-xs mt-1">
                      Section 508 & WCAG Compliance Audits
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Dev Experience Card */}
              <motion.div
                whileHover={{ scale: 1.02, x: 5 }}
                className="p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-primary/10 text-primary">
                    <Briefcase className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">
                      Software Developer
                    </h3>
                    <p className="text-primary text-sm mb-1">
                      Previous Experience
                    </p>
                    <p className="text-muted-foreground text-sm">
                      2+ years experience
                    </p>
                    <p className="text-muted-foreground text-xs mt-1">
                      Full Stack Development
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Clickable Bottom Area for Next Section */}
      <div
        onClick={() =>
          document
            .getElementById("skills")
            ?.scrollIntoView({ behavior: "smooth" })
        }
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            document
              .getElementById("skills")
              ?.scrollIntoView({ behavior: "smooth" });
          }
        }}
        tabIndex={0}
        className="absolute bottom-0 left-0 w-full h-32 flex items-end justify-center pb-8 cursor-pointer hover:bg-gradient-to-t hover:from-primary/5 to-transparent transition-all duration-700 group z-20 focus:outline-none focus:ring-2 focus:ring-primary/50"
        role="button"
        aria-label="Scroll to Skills section"
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
