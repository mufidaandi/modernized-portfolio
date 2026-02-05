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
  title: "Mufida | Full Stack Developer",
  description:
    "Full Stack Developer passionate about building intelligent, accessible, and user-friendly web applications. Combining clean design with smart functionality.",
  keywords: [
    "Full Stack Developer",
    "Web Developer",
    "React",
    "Next.js",
    "TypeScript",
    "Accessibility",
    "WCAG",
    "Software Engineer",
  ],
  authors: [{ name: "Mufida" }],
  openGraph: {
    title: "Mufida | Full Stack Developer",
    description:
      "Full Stack Developer passionate about building intelligent, accessible, and user-friendly web applications.",
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
