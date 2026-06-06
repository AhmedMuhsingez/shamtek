# Shamtek

A multilingual product catalog / storefront built with [Astro](https://astro.build) and React. Customers browse products by category and brand, save favorites, and order directly over WhatsApp — there's no backend, so the whole site builds to static files and deploys to Vercel.

## ✨ Features

- **Product catalog** — categories, brands, featured products, filtering, and pagination
- **Multilingual** — Arabic (default, RTL), English, and Turkish via Astro i18n
- **WhatsApp ordering** — no checkout or backend; orders go straight to chat
- **Favorites & recently viewed** — persisted in `localStorage`, no account needed
- **Light / dark theme** and responsive mobile navigation

## 🧰 Tech Stack

Astro 5 · React 19 · Tailwind CSS 4 · Swiper · TypeScript

## 🧞 Commands

Run from the project root:

| Command         | Action                                       |
| :-------------- | :------------------------------------------- |
| `yarn install`  | Install dependencies                         |
| `yarn dev`      | Start the dev server at `localhost:4321`     |
| `yarn build`    | Build the static site to `./dist/`           |
| `yarn preview`  | Preview the production build locally          |

## 📁 Structure

```text
src/
├── components/   UI components (.astro + React)
├── data/         static product & company data
├── i18n/         ar / en / tr translations
├── layouts/      page layouts
├── pages/        routes (localized under [lang]/)
└── utils/        i18n, storage, WhatsApp helpers
```

Localized routes live under `src/pages/[lang]/`; the root `/` redirects to the default locale (`/ar`).
