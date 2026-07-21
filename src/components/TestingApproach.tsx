"use client";

import { motion, Variants } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { TestTube2, ShieldCheck, Mail, ChevronDown } from "lucide-react";

const suites = [
  {
    icon: TestTube2,
    title: "Expensure — Full Suite",
    description:
      "28 tests covering auth, dashboard, and transaction flows. Runs in CI on every push and pull request against an ephemeral MongoDB instance. Built with fixtures over Page Object Model, a hybrid API+UI pattern for fast setup, collision-safe test data per run, and rate-limit-budget-aware negative tests.",
  },
  {
    icon: ShieldCheck,
    title: "Expensure — Production Smoke Suite",
    description:
      "6 read-only checks against the live deployment. Deliberately kept separate from the main suite — single worker, no parallelism, run manually post-deploy so it can never touch production data by accident.",
  },
  {
    icon: Mail,
    title: "Email API Service",
    description:
      "12 API-only tests via Playwright's request fixture — no browser involved. Covers validation, rate limiting, and error handling. Runs weekly via GitHub Actions plus on-demand — a regression/health-check suite, not a per-PR gate.",
  },
];

export default function TestingApproach() {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-100px" });

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
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
    <section id="testing-approach" className="py-20 lg:py-32 relative">
      {/* Background accent */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 left-1/4 w-72 h-72 bg-purple-500/5 rounded-full blur-[100px]" />
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
              How I Think About Testing
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
              Two personal projects, two different Playwright suites —
              because not everything should be tested the same way.
            </p>
          </motion.div>

          {/* Suite Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {suites.map((suite) => (
              <motion.div
                key={suite.title}
                variants={itemVariants}
                whileHover={{ scale: 1.03, y: -8 }}
                className="p-6 rounded-xl bg-card border border-border hover:border-primary hover:ring-2 hover:ring-accent hover:ring-offset-2 hover:ring-offset-background transition-all duration-300"
              >
                <div className="p-3 rounded-lg bg-primary/10 text-primary w-fit mb-4">
                  <suite.icon className="h-6 w-6" />
                </div>
                <h3 className="font-mono font-semibold text-lg mb-2">
                  {suite.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {suite.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Pull Quote */}
          <motion.div variants={itemVariants} className="max-w-3xl mx-auto">
            <p className="text-foreground font-medium italic border-l-4 border-primary pl-4">
              &ldquo;This project uses two separate Playwright suites, run
              differently and for different reasons. The split matters more
              than the test count: it&apos;s the difference between
              &lsquo;wrote some tests&rsquo; and thinking about blast radius,
              environments, and what&apos;s safe to automate where.&rdquo;
            </p>
            <p className="text-muted-foreground text-sm mt-2 pl-4">
              — from Expensure&apos;s{" "}
              <span className="font-mono">TESTING_STRATEGY.md</span>
            </p>
          </motion.div>

          {/* Honest closer */}
          <motion.div
            variants={itemVariants}
            className="text-center mt-10 space-y-1"
          >
            <p className="text-muted-foreground text-sm">
              No axe-core accessibility checks or visual regression yet in
              either suite — that&apos;s next on the list.
            </p>
            <p className="text-muted-foreground/60 text-xs">
              (Plus ongoing Playwright practice through codegen katas outside
              these two repos.)
            </p>
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
