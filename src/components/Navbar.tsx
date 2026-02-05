"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  User,
  Code,
  Briefcase,
  Mail,
  FileDown,
  Menu,
  X,
} from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const navItems = [
  { name: "Home", href: "#home", icon: Home },
  { name: "About", href: "#about", icon: User },
  { name: "Skills", href: "#skills", icon: Code },
  { name: "Projects", href: "#projects", icon: Briefcase },
  { name: "Contact", href: "#contact", icon: Mail },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("home");
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [isHoveringNav, setIsHoveringNav] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Ensure we're in the browser environment
    if (typeof window === "undefined") return;

    const handleScroll = () => {
      const sections = navItems.map((item) => item.href.substring(1));
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetBottom = offsetTop + element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (e.clientY < 100 || isHoveringNav) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isHoveringNav]);

  const handleNavClick = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false); // Close mobile menu after clicking
  };

  return (
    <>
      {/* Mobile/Tablet Hamburger Button - Touch Devices */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden fixed top-6 right-6 z-50 p-3 rounded-xl bg-card/80 backdrop-blur-xl border border-border/50 shadow-lg"
        whileTap={{ scale: 0.95 }}
        aria-label="Toggle mobile menu"
      >
        {isMobileMenuOpen ? (
          <X className="w-6 h-6 text-foreground" />
        ) : (
          <Menu className="w-6 h-6 text-foreground" />
        )}
      </motion.button>

      {/* Mobile/Tablet Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden fixed inset-0 bg-background/80 backdrop-blur-sm z-40"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Mobile/Tablet Menu - Touch Devices */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="lg:hidden fixed top-0 right-0 bottom-0 w-72 bg-card/95 backdrop-blur-xl border-l border-border/50 shadow-2xl z-40 overflow-y-auto"
          >
            <div className="p-6 pt-20">
              <nav className="space-y-2">
                {navItems.map((item) => {
                  const isActive = activeSection === item.href.substring(1);
                  const Icon = item.icon;

                  return (
                    <motion.button
                      key={item.name}
                      onClick={() => handleNavClick(item.href)}
                      className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all ${
                        isActive
                          ? "bg-primary/20 text-primary"
                          : "text-muted-foreground hover:bg-primary/10 hover:text-foreground"
                      }`}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Icon
                        className="w-5 h-5"
                        strokeWidth={isActive ? 2.5 : 2}
                      />
                      <span className="font-medium">{item.name}</span>
                      {isActive && (
                        <motion.div
                          layoutId="mobileActiveIndicator"
                          className="ml-auto w-2 h-2 rounded-full bg-primary"
                          transition={{
                            type: "spring",
                            stiffness: 380,
                            damping: 30,
                          }}
                        />
                      )}
                    </motion.button>
                  );
                })}

                {/* Divider */}
                <div className="h-px bg-border/50 my-4" />

                {/* Resume Download */}
                <motion.button
                  onClick={() => {
                    const link = document.createElement("a");
                    link.href = "/Mufida_Resume_2026.pdf";
                    link.download = "Mufida_Resume_2026.pdf";
                    link.click();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-4 px-4 py-3 rounded-xl text-muted-foreground hover:bg-primary/10 hover:text-foreground transition-all"
                  whileTap={{ scale: 0.98 }}
                >
                  <FileDown className="w-5 h-5" strokeWidth={2} />
                  <span className="font-medium">Download Resume</span>
                </motion.button>

                {/* Theme Toggle */}
                <div className="flex items-center gap-4 px-4 py-3">
                  <span className="text-sm text-muted-foreground font-medium">
                    Theme
                  </span>
                  <div className="ml-auto">
                    <ThemeToggle />
                  </div>
                </div>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* macOS Dock-Style Navbar - Desktop Only (non-touch devices) */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: isVisible ? 0 : -100 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        onMouseEnter={() => setIsHoveringNav(true)}
        onMouseLeave={() => setIsHoveringNav(false)}
        className="hidden lg:block fixed top-8 left-1/2 -translate-x-1/2 z-50"
      >
        <div className="relative">
          {/* Glassmorphism Container */}
          <div className="flex items-end gap-2 px-3 py-3 rounded-2xl bg-card/40 backdrop-blur-2xl border border-border/50 shadow-2xl">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.substring(1);
              const Icon = item.icon;

              return (
                <motion.button
                  key={item.name}
                  onClick={() => handleNavClick(item.href)}
                  onMouseEnter={() => setHoveredItem(item.name)}
                  onMouseLeave={() => setHoveredItem(null)}
                  className={`relative flex flex-col items-center justify-center transition-all duration-300 ${
                    isActive ? "text-primary" : "text-muted-foreground"
                  }`}
                  whileHover={{ y: -8 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={`Navigate to ${item.name} section`}
                >
                  <motion.div
                    className={`relative p-3 rounded-xl transition-all ${
                      isActive ? "bg-primary/20" : "hover:bg-primary/10"
                    }`}
                    animate={{
                      scale: hoveredItem === item.name ? 1.3 : 1,
                    }}
                  >
                    <Icon
                      className="w-5 h-5"
                      strokeWidth={isActive ? 2.5 : 2}
                    />

                    {/* Active Indicator Dot */}
                    {isActive && (
                      <motion.div
                        layoutId="activeIndicator"
                        className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary"
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 30,
                        }}
                      />
                    )}
                  </motion.div>

                  {/* Tooltip */}
                  <AnimatePresence>
                    {hoveredItem === item.name && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute -bottom-12 px-3 py-1.5 bg-popover/95 backdrop-blur-sm text-popover-foreground text-xs font-medium rounded-lg border border-border/50 whitespace-nowrap shadow-lg"
                      >
                        {item.name}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>
              );
            })}

            {/* Divider */}
            <div className="w-px h-8 bg-border/50 mx-1" />

            {/* Theme Toggle */}
            <div className="flex items-end">
              <ThemeToggle />
            </div>

            {/* Divider */}
            <div className="w-px h-8 bg-border/50 mx-1" />

            {/* Resume Download Icon */}
            <motion.button
              onClick={() => {
                const link = document.createElement("a");
                link.href = "/resume.pdf";
                link.download = "Mufida_Resume.pdf";
                link.click();
              }}
              onMouseEnter={() => setHoveredItem("Resume")}
              onMouseLeave={() => setHoveredItem(null)}
              className="relative flex flex-col items-center justify-center text-muted-foreground transition-all duration-300"
              whileHover={{ y: -8 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Download Resume"
            >
              <motion.div
                className="relative p-3 rounded-xl hover:bg-primary/10 transition-all"
                animate={{
                  scale: hoveredItem === "Resume" ? 1.3 : 1,
                }}
              >
                <FileDown className="w-5 h-5" strokeWidth={2} />
              </motion.div>

              {/* Tooltip */}
              <AnimatePresence>
                {hoveredItem === "Resume" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute -bottom-12 px-3 py-1.5 bg-popover/95 backdrop-blur-sm text-popover-foreground text-xs font-medium rounded-lg border border-border/50 whitespace-nowrap shadow-lg"
                  >
                    Resume
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </motion.nav>
    </>
  );
}
