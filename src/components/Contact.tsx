"use client";

import { motion, Variants } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Mail,
  Github,
  Linkedin,
  Send,
  Download,
  ArrowUp,
  Loader2,
} from "lucide-react";

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

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
      transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
    },
  };

  const contactLinks = [
    {
      name: "Email",
      href: "mailto:contact@heymufi.com",
      icon: Mail,
      label: "contact@heymufi.com",
      color: "hover:text-red-400",
    },
    {
      name: "GitHub",
      href: "https://github.com/mufidaandi",
      icon: Github,
      label: "@mufidaandi",
      color: "hover:text-white",
    },
    {
      name: "LinkedIn",
      href: "https://linkedin.com/in/mufidaandi",
      icon: Linkedin,
      label: "/in/mufidaandi",
      color: "hover:text-blue-400",
    },
  ];

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const apiUrl =
        process.env.NEXT_PUBLIC_EMAIL_API_URL || "http://localhost:3001";
      const response = await fetch(`${apiUrl}/api/send-email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        setStatus("error");
        setErrorMessage(
          data.error || "Failed to send message. Please try again.",
        );
      }
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        "Network error. Please make sure the email API is running.",
      );
      console.error("Error sending email:", error);
    }
  };

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section id="contact" className="py-20 lg:py-32 relative">
      {/* Background accent */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-primary/5 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center"
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              Get In Touch
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

          {/* Message */}
          <motion.div variants={itemVariants} className="mb-12">
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
              I&apos;m currently open to new opportunities and collaborations.
              Whether you have a question, a project idea, or just want to say
              hi — I&apos;d love to hear from you!
            </p>
          </motion.div>

          {/* Contact Form */}
          <motion.form
            variants={itemVariants}
            onSubmit={handleSubmit}
            className="max-w-2xl mx-auto mb-16 space-y-6"
          >
            {/* Name Field */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-mono text-muted-foreground mb-2 text-left"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                maxLength={100}
                disabled={status === "loading"}
                className="w-full px-4 py-3 bg-background border-2 border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="Your name"
              />
            </div>

            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-mono text-muted-foreground mb-2 text-left"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                disabled={status === "loading"}
                className="w-full px-4 py-3 bg-background border-2 border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="your.email@example.com"
              />
            </div>

            {/* Message Field */}
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-mono text-muted-foreground mb-2 text-left"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                maxLength={2000}
                rows={6}
                disabled={status === "loading"}
                className="w-full px-4 py-3 bg-background border-2 border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="Your message..."
              />
            </div>

            {/* Status Messages */}
            {status === "success" && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-green-500/10 border-2 border-green-500/50 rounded-lg text-green-400 text-sm font-mono"
              >
                ✓ Message sent successfully! I&apos;ll get back to you soon.
              </motion.div>
            )}

            {status === "error" && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-red-500/10 border-2 border-red-500/50 rounded-lg text-red-400 text-sm font-mono"
              >
                ✗ {errorMessage}
              </motion.div>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              size="lg"
              disabled={status === "loading"}
              className="w-full font-mono group bg-gradient-to-r from-primary to-purple-500 hover:shadow-lg hover:shadow-primary/50 transition-all duration-300"
            >
              {status === "loading" ? (
                <>
                  <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="h-5 w-5 mr-2 group-hover:translate-x-1 transition-transform" />
                  Send Message
                </>
              )}
            </Button>
          </motion.form>

          {/* Download Resume Button */}
          <motion.div variants={itemVariants} className="mb-16">
            <Button
              size="lg"
              variant="outline"
              className="font-mono hover:bg-primary/10"
              onClick={() => {
                const link = document.createElement("a");
                link.href = "/Mufida_Resume_2026.pdf";
                link.download = "Mufida_Resume_2026.pdf";
                link.click();
              }}
            >
              <Download className="h-5 w-5 mr-2" />
              Download Resume
            </Button>
          </motion.div>

          {/* Contact Links */}
          <motion.div
            variants={containerVariants}
            className="flex flex-col sm:flex-row justify-center items-center gap-6 sm:gap-12"
          >
            {contactLinks.map((link) => (
              <motion.a
                key={link.name}
                variants={itemVariants}
                href={link.href}
                target={link.name !== "Email" ? "_blank" : undefined}
                rel={link.name !== "Email" ? "noopener noreferrer" : undefined}
                className={`group flex items-center gap-3 text-muted-foreground transition-colors ${link.color}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label={
                  link.name === "GitHub"
                    ? "Visit Mufida's GitHub profile at github.com/mufidaandi"
                    : link.name === "LinkedIn"
                      ? "Connect with Mufida on LinkedIn at linkedin.com/in/mufidaandi"
                      : "Email Mufida at contact@heymufi.com"
                }
              >
                <link.icon className="h-5 w-5" />
                <span className="font-mono text-sm">{link.label}</span>
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Clickable Bottom Area for Back to Top */}
      <div
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }
        }}
        tabIndex={0}
        className="absolute bottom-0 left-0 w-full h-32 flex items-end justify-center pb-8 cursor-pointer hover:bg-gradient-to-t hover:from-primary/5 to-transparent transition-all duration-700 group z-20 focus:outline-none focus:ring-2 focus:ring-primary/50"
        role="button"
        aria-label="Back to Top"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, -5, 0] }}
          transition={{
            opacity: { delay: 0.5 },
            y: { duration: 2, repeat: Infinity, ease: "easeInOut" },
          }}
          className="flex flex-col items-center text-muted-foreground/30 group-hover:text-primary/60 transition-colors duration-500"
        >
          <span className="text-xs font-mono mb-2 tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            BACK TO TOP
          </span>
          <ArrowUp className="w-10 h-10" strokeWidth={1} />
        </motion.div>
      </div>
    </section>
  );
}
