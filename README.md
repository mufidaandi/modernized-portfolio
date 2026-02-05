# Portfolio Website

My personal portfolio built with Next.js. Clean, accessible, and modern.

## What's inside

- **Hero section** with typing effect
- **About** with skills grid
- **Projects** showcase with image/video previews
- **Contact form** connected to email API
- **AI Chatbot** embedded (ask questions about me)
- **WCAG 2.1 AA compliant** - keyboard nav, screen reader friendly, proper contrast

## Tech stack

- Next.js 16 (React)
- Tailwind CSS v4
- TypeScript
- Framer Motion (animations)
- Shadcn UI components

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`

## Structure

```
src/
├── app/
│   ├── page.tsx           # Main page
│   ├── layout.tsx         # Root layout with ChatBubble
│   └── globals.css        # Tailwind config
│
├── components/
│   ├── Hero.tsx           # Intro with typing effect
│   ├── About.tsx          # Skills & background
│   ├── Projects.tsx       # Project cards
│   ├── Contact.tsx        # Contact form
│   ├── ChatBubble.tsx     # AI chatbot widget
│   └── ui/                # Reusable components
│
└── lib/
    └── utils.ts           # Helper functions
```

## Connected services

- **Email API** - Handles contact form
- **Chatbot Backend** - Gemini AI chatbot

## Deploy

```bash
vercel
```

Update these in Vercel:

- `NEXT_PUBLIC_CHATBOT_API_URL` - Your chatbot backend URL
- Email API URL in Contact component (update API endpoint)
