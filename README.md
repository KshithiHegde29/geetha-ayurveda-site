# Dr. Geetha Ayurveda — Web App

Modern Next.js app to publish Ayurveda articles, support pharma & colleges, and deliver premium PDFs via WhatsApp.

## Objectives

- Publish free articles and updates
- Offer premium articles via WhatsApp-based access
- Provide downloads (brochures, case studies, publications)
- Establish credibility for Ayurveda research and formulations

## Architecture

- Frontend: Next.js (web), later PWA/React Native optional
- Backend: Supabase / Node.js API (planned, Phase 2)
- Database: PostgreSQL on Supabase (planned, Phase 2)
- Hosting: Vercel (frontend), Supabase (auth+db), CDN (Cloudflare optional)

## Current Features (Phase 1)

- Core pages: Home, About, Articles, Products, Services, Contact, Privacy, Terms
- Homepage animated slider (Swiper)
- Articles listing with Free/Premium badges
- Premium article detail shows WhatsApp request button

## Getting Started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

Set your WhatsApp number to enable the request flow:

```bash
export NEXT_PUBLIC_WHATSAPP_NUMBER=919999999999
```

On macOS, you can add this to your shell profile or `.env.local`.

## Content Model (temporary)

- See `src/data/articles.ts` for sample articles (`isPremium` flag).
- In Phase 2, we will migrate this to Supabase tables.

## Next Phases

- Phase 2: Supabase setup (Auth, Articles, Storage), API integration
- Phase 3: Products/Services content and PDF downloads
- Phase 4: SEO, social links, and deployment to Vercel

## Development Notes

- Tech: Next.js 16, React 19, Tailwind CSS 4
- Slider: `swiper` package with pagination & autoplay
