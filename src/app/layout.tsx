import type { Metadata } from "next";
import { DM_Sans, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import ChatBubble from "@/components/ChatBubble";
import { ThemeProvider } from "@/components/ThemeProvider";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Mufida | QA Automation Engineer",
  description:
    "QA Automation Engineer with a full stack development background. I write Playwright test suites, wire up CI pipelines, and run accessibility audits (WCAG/Section 508) — combining hands-on QA experience with the ability to read, write, and debug the code under test.",
  keywords: [
    "QA Automation Engineer",
    "Test Automation",
    "Playwright",
    "CI/CD",
    "Accessibility Testing",
    "WCAG",
    "Section 508",
    "Software Testing",
    "Full Stack Development",
    "TypeScript",
  ],
  authors: [{ name: "Mufida" }],
  openGraph: {
    title: "Mufida | QA Automation Engineer",
    description:
      "QA Automation Engineer with a full stack development background — building Playwright test suites and CI pipelines, backed by real accessibility audit experience.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${dmSans.variable} ${plusJakartaSans.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <ChatBubble />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
