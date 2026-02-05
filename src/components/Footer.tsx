"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Heart } from "lucide-react";
import Image from "next/image";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: "GitHub",
      href: "https://github.com/mufidaandi",
      icon: Github,
    },
    {
      name: "LinkedIn",
      href: "https://linkedin.com/in/mufidaandi",
      icon: Linkedin,
    },
    {
      name: "Email",
      href: "mailto:mufidaandi@gmail.com",
      icon: Mail,
    },
  ];

  return (
    <footer className="py-8 border-t border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Logo */}
          <motion.a
            href="#home"
            className="flex items-center gap-2 group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              e.preventDefault();
              document
                .querySelector("#home")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            aria-label="Scroll to top"
          >
            <div className="w-10 h-10 flex items-center justify-center overflow-hidden">
              <Image
                src="/logo-icon.png"
                alt="Mufida's logo"
                width={36}
                height={36}
                className="object-contain group-hover:scale-110 transition-transform"
              />
            </div>
          </motion.a>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {socialLinks.map((link) => (
              <motion.a
                key={link.name}
                href={link.href}
                target={link.name !== "Email" ? "_blank" : undefined}
                rel={link.name !== "Email" ? "noopener noreferrer" : undefined}
                className="p-2 rounded-full text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label={
                  link.name === "GitHub"
                    ? "Visit Mufida's GitHub profile"
                    : link.name === "LinkedIn"
                      ? "Connect with Mufida on LinkedIn"
                      : "Email Mufida at mufidaandi@gmail.com"
                }
              >
                <link.icon className="h-5 w-5" />
              </motion.a>
            ))}
          </div>

          {/* Copyright */}
          <p className="text-muted-foreground text-sm font-mono flex items-center gap-1">
            Built with <Heart className="h-4 w-4 text-primary fill-primary" /> ©{" "}
            {currentYear}
          </p>
        </div>
      </div>
    </footer>
  );
}
