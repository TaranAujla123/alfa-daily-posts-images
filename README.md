# alfa-daily-posts-images

Cinematic background images (generated via fal.ai Flux Pro 1.1 Ultra) and separate quote text files for the 65-day ALFA Rebuild program. Backgrounds only — no icon, no text baked into the image. Quote text is delivered as Markdown alongside each image for Canva compositing.

## Structure

```
alfa-daily-posts-images/
├── README.md                      ← you are here
├── scripts/
│   └── generate-sample-day12.ts   ← fal.ai sample generator (Day 12 + Day 40)
├── samples/                       ← samples for user review
│   ├── day-12/
│   │   ├── quote.md               ← hook + alternates + caption + hashtags
│   │   ├── day12-A-dusk-route.jpg
│   │   ├── day12-B-man-at-window.jpg
│   │   └── day12-C-threshold-door.jpg
│   └── day-40/
│       ├── quote.md
│       ├── day40-A-severed-chain.jpg
│       ├── day40-B-abandoned-glass.jpg
│       └── day40-C-man-walking-away.jpg
└── (future) by-day/day-01 … day-65/ ← once the 65-day batch is approved
```

## Workflow

1. **Hook quote authored** per day from `wisdom_content.txt` + the day's teaching slides (direct, 8–14 words, 1–2 gold key-words).
2. **3 cinematic angles** written per day — different visual interpretations of the same teaching.
3. **fal.ai Flux Pro 1.1 Ultra** generates each angle at `aspect_ratio: 9:16` (portrait — crops cleanly to IG 1080×1350 or center-cropped to 1080×1080).
4. User selects the strongest angle(s) per day.
5. Selected images dropped into the ALFA Canva template where the gold ALFA icon, horizontal rules, and quote typography get composited.

## Tech

- **Model:** `fal-ai/flux-pro/v1.1-ultra` · aspect `9:16` · JPEG output
- **Cost per image:** ~$0.05–0.10
- **Full 65-day batch (3 angles each):** ~$10–20 before selection

## Run the sampler

```bash
cp path/to/pattern-video/.env .env     # provides FAL_KEY
npm install
npm run sample                          # generates Day 12 + Day 40 (6 images)
# or:
npx tsx scripts/generate-sample-day12.ts --day 12
```

## Dual output — repo + local

Every render is saved in TWO places:

1. **This repo** under `samples/day-N/` (for review and version history)
2. **Local working folder** under `C:\Users\Owner\ALFA REBUILD\MARKETING\IG Posts\POST IMAGES\day-N\` (for direct Canva upload)

The generator scripts handle the JPG mirror automatically. Quote markdown (`quote.md`) is written to both locations at author time.

## Status

- **2026-04-20** — Initial samples published: Day 12 (The Danger Window), Day 40 (It Has No Leverage). Iteration 1 shipped with user-requested revisions (Day 12 B-v2, Day 40 A-v2 + D + E). Awaiting user selection before scaling to the full 65-day batch.
