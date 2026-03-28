# Misiunea Matematică 🚀

Joc educațional web pentru copii de 6-12 ani, cu temă spațială. Matematică, distracție și rachete!

## Demo

> Deploy pe Vercel: importă repo-ul la [vercel.com/new](https://vercel.com/new) — zero configurare necesară.

## Funcționalități

- **5 niveluri de dificultate** — de la adunări simple (1–10) până la toate operațiile (1–100)
- **4 operații** — adunare, scădere, înmulțire, împărțire (doar cu rezultat întreg)
- **3 vieți per nivel**, 10 întrebări per nivel
- **8 achievements** cu notificări toast animate
- **Clasament top 10** cu persistență în localStorage
- **Audio** — Howler.js cu fallback Web Audio API (funcționează fără fișiere MP3)
- **Animații** — stele animate, confetti la răspuns corect, rachete Framer Motion

## Niveluri

| # | Nume | Numere | Operații |
|---|------|--------|----------|
| 1 | Cadet Spațial 🌟 | 1–10 | ➕ ➖ |
| 2 | Pilot Cosmic 🚀 | 1–20 | ➕ ➖ |
| 3 | Comandant Stele ⭐ | 1–20 | ➕ ➖ ✖️ |
| 4 | Explorator Galactic 🌌 | 1–50 | ➕ ➖ ✖️ ➗ |
| 5 | Maestru Cosmic 🏆 | 1–100 | ➕ ➖ ✖️ ➗ |

## Stack tehnic

- **React 18.3** + **TypeScript 5.4** (strict mode)
- **Vite 5.2** + **Tailwind CSS 3.4**
- **Framer Motion 11** — animații
- **Howler.js 2.2** — audio
- **canvas-confetti** — celebrări
- **Vitest 1.6** — teste unitare

## Comenzi

```bash
npm install
npm run dev          # server local → http://localhost:5173
npm run build        # build producție (output în dist/)
npm run test:run     # rulează toate testele
npm run lint         # ESLint
```

## Arhitectură

Starea jocului este gestionată exclusiv printr-un **reducer central** (`useGameState`). Nu există `useEffect` pentru tranziții de stare — toate schimbările trec prin acțiuni tipizate.

```
useGameState (reducer) → GameScreen → componente individuale
storageManager.ts      → singurul punct de acces la localStorage
useAudio.ts            → Howler.js + fallback Web Audio API
```

## Deploy

Proiectul este pur client-side — nicio variabilă de mediu necesară.

```bash
npm run build
# → dist/ gata de deploy
```

Vercel detectează automat Vite. Import repo → Deploy.

## Fișiere audio (opționale)

Plasează în `public/sounds/`: `correct.mp3`, `wrong.mp3`, `levelup.mp3`, `gameover.mp3`, `background.mp3`.

Dacă lipsesc, jocul generează sunete programatic prin Web Audio API.
