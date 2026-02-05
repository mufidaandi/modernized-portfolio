"use client";

import { motion, Variants, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, ChevronDown, Play, X } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "Expense Tracker with Gemini AI",
    description:
      "A modern expense tracking app that uses Gemini AI to automatically categorize transactions and generate personalized financial insights. Features intelligent spending analysis and budget recommendations.",
    tags: ["React", "Node.js", "MongoDB", "Gemini AI", "Express.js", "Vercel"],
    liveUrl: "https://ai-financial-dashboard.vercel.app/",
    githubUrl: "https://github.com/mufidaandi/ai-financial-dashboard",
    image: "/projects/ExpenSure Screenshot.png", // Add your image to public/projects/
    videoUrl:
      "https://www.loom.com/embed/5c340b24201f46efba86850c25021fa1?sid=2aa885e8-3953-4a90-a96c-3ac7a143a22a", // Add your Loom embed URL here (e.g., "https://www.loom.com/embed/YOUR_VIDEO_ID")
    featured: true,
    gradient: "from-violet-500 to-purple-600",
  },

  {
    id: 2,
    title: "AI Chatbot Assistant",
    description:
      "An intelligent chatbot powered by Google Gemini AI that answers questions about my professional background, skills, and experience. Features standalone demo page and embeddable widget for seamless website integration.",
    tags: [
      "React",
      "Node.js",
      "Express.js",
      "Gemini AI",
      "Tailwind CSS",
      "Vite",
    ],
    liveUrl: "https://chatbot.heymufi.com/",
    githubUrl: "https://github.com/mufidaandi/mufi-chatbot",
    image: "/projects/chatbot.png",
    videoUrl: "", // Can add demo video later
    featured: false,
    gradient: "from-purple-500 to-pink-500",
  },
  {
    id: 3,
    title: "Portfolio Website v1",
    description:
      "My first portfolio website built with vanilla technologies. Demonstrates strong fundamentals in web development without relying on frameworks.",
    tags: ["HTML5", "CSS3", "JavaScript"],
    liveUrl: "https://mufidaandi.github.io/",
    githubUrl: "https://github.com/mufidaandi/mufidaandi.github.io",
    image: "/projects/portfolio-v1.png", // Add your image to public/projects/
    videoUrl: "", // Add your Loom embed URL here
    featured: false,
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    id: 4,
    title: "Email API Service",
    description:
      "A robust backend service for handling contact form submissions with dual email provider support. Features Gmail SMTP integration, rate limiting, input validation, and automated confirmation emails for enhanced user experience.",
    tags: ["Node.js", "Express.js", "Nodemailer", "Gmail SMTP", "Vercel"],
    liveUrl: "#contact", // Links to contact section where it's used
    githubUrl: "https://github.com/mufidaandi/email-api", // Update with actual repo
    image: "/projects/email-api.png", // Add your screenshot
    videoUrl: "",
    featured: false,
    gradient: "from-cyan-500 to-blue-500",
  },
  {
    id: 5,
    title: "Rasvel's Pet Store",
    description:
      "A modern pet store website with dynamic features including product filtering, search functionality, and smooth animations. Built as a collaborative group project.",
    tags: ["HTML5", "CSS3", "JavaScript", "jQuery", "Responsive Design"],
    liveUrl: "https://mufidaandi.github.io/rasvels-pet-store",
    githubUrl: "https://github.com/mufidaandi/rasvels-pet-store",
    image: "/projects/PetStore.jpg", // Add your image to public/projects/
    videoUrl: "", // Add your Loom embed URL here
    featured: false,
    gradient: "from-orange-500 to-red-500",
  },
  {
    id: 6,
    title: "Rasvel's General Store",
    description:
      "An elegant static website for a general merchandise store, showcasing clean design principles and engaging user experience with modern CSS techniques.",
    tags: ["HTML5", "CSS3", "Responsive Design", "CSS Grid", "Flexbox"],
    liveUrl: "https://mufidaandi.github.io/rasvels",
    githubUrl: "https://github.com/mufidaandi/rasvels",
    image: "/projects/rasvels.jpg", // Add your image to public/projects/
    videoUrl: "", // Add your Loom embed URL here
    featured: false,
    gradient: "from-emerald-500 to-teal-500",
  },
];

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-100px" });
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);

  const visibleProjects = showAll ? projects : projects.slice(0, 5);

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
    <section id="projects" className="py-20 lg:py-32 relative">
      {/* Background accent */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-purple-500/5 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              Featured Projects
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
              A selection of projects that showcase my skills in full-stack
              development, UI/UX design, and problem-solving.
            </p>
          </motion.div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {visibleProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={index < 5 ? "hidden" : { opacity: 1, y: 0 }}
                animate="visible"
                variants={index < 5 ? itemVariants : undefined}
                whileHover={{ scale: 1.03, y: -8 }}
                className={`group relative rounded-2xl bg-card border border-border hover:border-primary hover:ring-2 hover:ring-accent hover:ring-offset-2 hover:ring-offset-background overflow-hidden transition-all duration-300 ${
                  project.featured ? "md:col-span-2 lg:col-span-2" : ""
                }`}
              >
                {/* Gradient overlay */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                />

                {/* Project Image */}
                <div
                  className="relative w-full h-48 bg-muted/30 overflow-hidden cursor-pointer group/image"
                  onClick={() => {
                    if (project.videoUrl) {
                      setSelectedVideo(project.videoUrl);
                    } else if (project.image) {
                      setSelectedImage(project.image);
                    }
                  }}
                >
                  {project.image ? (
                    <Image
                      src={project.image}
                      alt={`Screenshot of ${project.title} - ${project.description.substring(0, 80)}...`}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground/50">
                      <span className="font-mono text-sm">Project Image</span>
                    </div>
                  )}
                  {/* Video Play Button Overlay */}
                  {project.videoUrl && (
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/image:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="bg-primary/90 rounded-full p-4 group-hover/image:scale-110 transition-transform duration-300">
                        <Play className="h-8 w-8 text-white fill-white" />
                      </div>
                    </div>
                  )}
                  {/* Image Expand Icon Overlay - only show if no video */}
                  {!project.videoUrl && project.image && (
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/image:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="bg-primary/90 rounded-full p-4 group-hover/image:scale-110 transition-transform duration-300">
                        <svg
                          className="h-8 w-8 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
                          />
                        </svg>
                      </div>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div
                  className={`relative p-6 ${
                    project.featured ? "lg:p-8" : ""
                  } flex flex-col flex-grow`}
                >
                  {/* Project Number */}
                  <span className="font-mono text-primary/50 text-sm mb-2">
                    {`0${index + 1}`}
                  </span>

                  {/* Title */}
                  <h3
                    className={`font-mono font-bold mb-3 ${
                      project.featured ? "text-2xl lg:text-3xl" : "text-xl"
                    }`}
                  >
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p
                    className={`text-muted-foreground mb-4 flex-grow ${
                      project.featured ? "text-base lg:text-lg" : "text-sm"
                    }`}
                  >
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map((tag) => (
                      <motion.div key={tag} whileHover={{ scale: 1.1, y: -2 }}>
                        <Badge
                          variant="secondary"
                          className="font-mono text-xs hover:bg-primary/20 hover:border-primary/50 transition-all duration-300 cursor-default"
                        >
                          {tag}
                        </Badge>
                      </motion.div>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex gap-3 mt-auto flex-wrap">
                    {project.videoUrl && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="font-mono group/btn hover:bg-primary hover:text-primary-foreground hover:border-primary hover:scale-105 hover:ring-2 hover:ring-accent hover:ring-offset-2 hover:ring-offset-card transition-all duration-300"
                        onClick={() => setSelectedVideo(project.videoUrl)}
                        aria-label={`Watch demo video of ${project.title}`}
                      >
                        <Play className="h-4 w-4 mr-2" />
                        Watch Demo
                      </Button>
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      className="font-mono group/btn hover:bg-primary hover:text-primary-foreground hover:border-primary hover:scale-105 hover:ring-2 hover:ring-accent hover:ring-offset-2 hover:ring-offset-card transition-all duration-300"
                      asChild
                    >
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`View source code for ${project.title} on GitHub`}
                      >
                        <Github className="h-4 w-4 mr-2" />
                        Code
                      </a>
                    </Button>
                    <Button
                      size="sm"
                      className="font-mono group/btn hover:scale-105 hover:ring-2 hover:ring-accent hover:ring-offset-2 hover:ring-offset-card transition-all duration-300"
                      asChild={!project.liveUrl.startsWith("#")}
                      onClick={
                        project.liveUrl.startsWith("#")
                          ? () => {
                              const sectionId = project.liveUrl.substring(1);
                              document
                                .getElementById(sectionId)
                                ?.scrollIntoView({ behavior: "smooth" });
                            }
                          : undefined
                      }
                      aria-label={
                        project.liveUrl.startsWith("#")
                          ? `Go to contact section to try ${project.title}`
                          : `Visit live demo of ${project.title}`
                      }
                    >
                      {project.liveUrl.startsWith("#") ? (
                        <>
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Live Demo
                        </>
                      ) : (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Live Demo
                        </a>
                      )}
                    </Button>
                  </div>
                </div>

                {/* Decorative corner accent */}
                <div
                  className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${project.gradient} opacity-10 blur-2xl group-hover:opacity-20 transition-opacity`}
                />
              </motion.div>
            ))}
          </div>

          {/* Show More/Less Button */}
          {projects.length > 5 && (
            <motion.div variants={itemVariants} className="text-center mt-12">
              <Button
                variant="outline"
                size="lg"
                onClick={() => setShowAll(!showAll)}
                className="font-mono group/btn hover:bg-primary hover:text-primary-foreground hover:border-primary hover:scale-105 hover:ring-2 hover:ring-accent hover:ring-offset-2 hover:ring-offset-background transition-all duration-300"
              >
                <ChevronDown
                  className={`h-5 w-5 mr-2 transition-transform duration-300 ${
                    showAll ? "rotate-180" : ""
                  }`}
                />
                {showAll
                  ? "Show Less"
                  : `Show More (${projects.length - 5} more)`}
              </Button>
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setSelectedVideo(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="relative w-full max-w-5xl aspect-video bg-background rounded-2xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedVideo(null)}
                className="absolute top-4 right-4 z-10 p-2 bg-background/80 hover:bg-background rounded-full transition-colors"
                aria-label="Close video"
              >
                <X className="h-6 w-6" />
              </button>

              {/* Loom Video Embed */}
              <iframe
                src={selectedVideo}
                className="w-full h-full"
                allowFullScreen
                title={`Demo video for ${projects.find((p) => p.videoUrl === selectedVideo)?.title || "project"}`}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Image Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="relative max-w-7xl max-h-[90vh] rounded-2xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 z-10 p-2 bg-background/80 hover:bg-background rounded-full transition-colors"
                aria-label="Close image"
              >
                <X className="h-6 w-6" />
              </button>

              {/* Enlarged Image */}
              <Image
                src={selectedImage}
                alt={`Enlarged preview of ${projects.find((p) => p.image === selectedImage)?.title || "project"}`}
                width={1920}
                height={1080}
                className="object-contain max-h-[90vh]"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Clickable Bottom Area for Next Section */}
      <div
        onClick={() =>
          document
            .getElementById("contact")
            ?.scrollIntoView({ behavior: "smooth" })
        }
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            document
              .getElementById("contact")
              ?.scrollIntoView({ behavior: "smooth" });
          }
        }}
        tabIndex={0}
        className="absolute bottom-0 left-0 w-full h-32 flex items-end justify-center pb-8 cursor-pointer hover:bg-gradient-to-t hover:from-primary/5 to-transparent transition-all duration-700 group z-20 focus:outline-none focus:ring-2 focus:ring-primary/50"
        role="button"
        aria-label="Scroll to Contact section"
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
