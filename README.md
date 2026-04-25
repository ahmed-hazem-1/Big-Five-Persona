<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# OCEAN.ai — Big Five Personality Assessment

An interactive personality assessment app based on the **Big Five (OCEAN) model**, featuring animated 3D card carousels, real-time progress tracking, radar chart results, and multilingual support (English & Arabic with RTL).

**Live Demo:** [https://ahmed-hazem-1.github.io/Big-Five-Persona/](https://ahmed-hazem-1.github.io/Big-Five-Persona/)

## Features

- **Big Five Personality Model** — Openness, Conscientiousness, Extraversion, Agreeableness, Neuroticism
- **3D Animated Carousel** — Interactive trait cards with smooth motion transitions
- **AI-Powered Insights** — Gemini API integration for personalized personality summaries
- **Radar Chart Results** — Visual representation of trait scores using Recharts
- **Multilingual** — English and Arabic with full RTL support (Cairo font for Arabic)
- **Glassmorphism Navbar** — Frosted glass navigation with pill-shaped design
- **Animated Background** — Dynamic gradient blobs with blur effects
- **Responsive** — Mobile-first design, works across all screen sizes

## Tech Stack

- **React 19** + **TypeScript** (strict mode)
- **Vite** — Build tool with GitHub Pages base path
- **Tailwind CSS 4** — Utility-first styling
- **Motion (Framer Motion)** — Animations and transitions
- **Recharts** — Radar chart visualizations
- **Zustand** — Lightweight state management
- **shadcn/ui** — UI component library
- **Google Gemini API** — AI-generated personality insights

## Run Locally

**Prerequisites:** Node.js 20+

1. Install dependencies:
   ```bash
   npm install
   ```
2. Set the `GEMINI_API_KEY` in `.env.local`:
   ```
   GEMINI_API_KEY=your_api_key_here
   ```
3. Run the dev server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000)

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start dev server on port 3000 |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Preview production build |
| `npm run lint` | TypeScript type checking |
| `npm run clean` | Remove `dist/` folder |

## Deployment

The app is automatically deployed to **GitHub Pages** via GitHub Actions on every push to `main`.

The workflow (`.github/workflows/ci.yml`):
1. Checks out the code
2. Installs dependencies with `npm ci`
3. Runs lint (`tsc --noEmit`)
4. Builds the production bundle
5. Deploys to GitHub Pages

### Setup GitHub Pages

1. Go to **Repo Settings → Pages**
2. Set **Source** to **"GitHub Actions"**
3. Push to `main` to trigger deployment

## Project Structure

```
src/
├── components/
│   ├── AnimatedBackground.tsx   # Gradient blob background
│   ├── Assessment.tsx           # Question flow with progress
│   ├── Landing.tsx              # Hero page with 3D carousel
│   ├── LanguageSwitcher.tsx     # EN/AR language toggle
│   ├── Results.tsx              # Radar chart + AI insights
│   └── TopNav.tsx               # Glassmorphism navbar
├── data/
│   ├── questions.ts             # Big Five assessment questions
│   └── translations.ts         # i18n strings (EN/AR)
├── store/
│   ├── useAssessmentStore.ts   # Assessment state (Zustand)
│   └── useI18nStore.ts         # Language & RTL state
├── App.tsx                      # Root component with routing
├── index.css                    # Global styles + Cairo font
└── main.tsx                     # Entry point
```

## License

Apache-2.0
