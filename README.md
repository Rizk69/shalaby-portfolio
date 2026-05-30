<div align="center">

# Mohamed Rizk Shalaby — Portfolio

**Flutter Developer · 3 years shipping production mobile apps · iOS + Android**

[![Live](https://img.shields.io/badge/Live-shalabby--portfolio.vercel.app-0ea5e9?style=for-the-badge&logo=vercel&logoColor=white)](https://shalabby-portfolio.vercel.app)
[![Next.js](https://img.shields.io/badge/Next.js-15-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178c6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-06b6d4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-11-ff0080?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion)

A cinematic single-page portfolio built with Next.js 15, Tailwind, Framer Motion, and Lenis smooth-scroll. Live App Store metadata (icons, ratings, screenshots) is pulled at build time and gracefully scraped when the iTunes API falls short.

[Live Demo →](https://shalabby-portfolio.vercel.app)  ·  [Email](mailto:mrizk5500@icloud.com)  ·  [LinkedIn](https://www.linkedin.com/in/mohamed-rizk-shalaby)

</div>

---

## ✨ Highlights

- **Cinematic Hero** with magnetic CTAs, parallax glows, and a phone mockup that cycles real App Store screenshots
- **Sticky AppShowcase** — a pinned phone in the middle of the viewport that cross-fades screenshots while content swaps as you scroll
- **Real App Store data** — iTunes Lookup API + HTML scrape fallback for icons, ratings, and screenshots
- **Fluid embla carousels** with autoplay, peek, and a phone-framed lightbox with keyboard navigation
- **Lenis smooth scroll** + scroll progress bar + scroll-linked animations everywhere
- **Active section indicator** in the Navbar (IntersectionObserver + Framer Motion `layoutId`)
- **Filterable Projects grid** with category-tinted gradients
- **Dark, premium dark UI** with dotted-grid backdrop, glass cards, and a Flutter-blue accent
- 100% **static** — deploys anywhere, no backend required

## 🧱 Tech Stack

| Area | Tools |
|---|---|
| Framework | Next.js 15 (App Router, RSC) |
| Language | TypeScript 5.6 |
| Styling | Tailwind CSS 3.4 · CSS variables · custom utilities |
| Motion | Framer Motion 11 · Lenis · Embla Carousel |
| Icons | Lucide React |
| Data | Static JSON + live iTunes Lookup at build time (24h revalidate) |
| Hosting | Vercel |

## 📂 Project Structure

```
app/
  layout.tsx          Root layout · fonts · SmoothScroll · ScrollProgress
  page.tsx            Composes all sections
  globals.css         Theme variables · utilities · custom scrollbar

components/
  Navbar.tsx          Active-section pill nav · mobile menu
  Hero.tsx            Parallax + magnetic CTAs + cycling phone mockup
  About.tsx           Stats credibility row
  Marquee.tsx         Infinite tech strip
  Experience.tsx      Vertical timeline
  AppShowcase.tsx     Sticky scroll showcase (THE centerpiece)
  Projects.tsx        Filterable grid with App Store integration
  AppScreenshots.tsx  Fluid carousel + phone-framed lightbox
  Skills.tsx          Categorized icon cards
  Education.tsx       Side-by-side cards
  Languages.tsx       Accent card
  Footer.tsx          Contact CTA + socials
  SmoothScroll.tsx    Lenis provider
  ScrollProgress.tsx  Top progress bar
  Magnetic.tsx        Magnetic hover wrapper

lib/
  app-store.ts        iTunes Lookup + HTML scrape fallback
  portfolio-data.ts   Loads JSON + enriches projects with App Store data

types/portfolio.ts    Domain types
public/portfolio-data.json    Source of truth for content
```

## 🚀 Local Development

```bash
git clone https://github.com/Rizk69/shalabby-portfolio.git
cd shalabby-portfolio
npm install
npm run dev
# → http://localhost:3000
```

```bash
npm run build      # Production build
npm run start      # Run the production build
npm run check      # TypeScript check
```

## ✏️ Editing Content

Open [`public/portfolio-data.json`](./public/portfolio-data.json) and edit:

- `personalInfo` — name, role, tagline, contacts, languages
- `experiences` — job entries with role, company, period, achievements
- `projects` — name, category, description, technologies, optional `storeLink`
- `skills` — categorized skill groups
- `education` — degrees + training

When a project has a `storeLink` to `apps.apple.com`, the build automatically pulls the live icon, rating, and screenshots — no manual work needed.

## 🚢 Deploy

Pushes to `main` auto-deploy on Vercel.

```bash
git push origin main
# → live within ~2 minutes
```

## 📱 Featured Apps

| App | Category | Live |
|---|---|---|
| **SeeSooq** | E-commerce | [App Store](https://apps.apple.com/eg/app/seesooq-%D8%B4%D9%88%D9%81-%D8%A7%D9%84%D8%B3%D9%88%D9%82/id6499473019) |
| **Jaeek (Captain)** | Delivery | [App Store](https://apps.apple.com/eg/app/%D8%AC%D8%A7%D9%8A%D9%83-%D9%83%D8%A7%D8%A8%D8%AA%D9%86/id6755484328) |
| **Peets** | Pet E-commerce | [App Store](https://apps.apple.com/jo/app/peets/id6717589262) |
| Fashion App, Bank App, Monazamah, Acwad HR | — | Coming soon |

## 📬 Contact

- **Email** · mrizk5500@icloud.com
- **Phone** · +20 109 843 4717
- **Location** · Egypt
- **LinkedIn** · [mohamed-rizk-shalaby](https://www.linkedin.com/in/mohamed-rizk-shalaby)

## 📄 License

MIT © Mohamed Rizk Shalaby
