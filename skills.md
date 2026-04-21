# skills.md — ALFA Rebuild IG Post Production

Full toolkit, skills, and standard workflow for producing Instagram single posts and carousels for the 65-day ALFA Rebuild program.

This is the reference another Claude Code session — or you — can read cold to understand everything that ships an IG post.

---

## 1. What this system produces

**Branded 1080×1080 Instagram posts** (PNG) with cinematic AI-generated backgrounds.

- **Single posts** — one PNG with headline (gold accent word), body, day marker, CTA
- **Carousels** — 3-10 PNGs per set: hook → middle slides → closing CTA
- **Raw BG library** — photographic/cinematic fal.ai images for Canva workflows when you want manual composition

Every output is delivered in two locations simultaneously:
1. **GitHub:** `alfa-daily-posts-images/samples/day-N/`
2. **Local working folder:** `C:\Users\Owner\ALFA REBUILD\MARKETING\IG Posts\POST IMAGES\day-N\`

---

## 2. Aspect ratios — use the right one

| Format | Dimensions | Use |
|--------|------------|-----|
| **1:1 square** | **1080×1080** | **IG feed post — default. Matches `post-pipeline` template.** |
| 4:5 portrait | 1080×1350 | IG feed post, max feed height (recent default option) |
| 9:16 vertical | 1080×1920 | Stories + Reels only — NOT feed posts |

fal.ai `aspect_ratio` prop: `"1:1"`, `"4:5"`, or `"9:16"`.

---

## 3. Tools (what exists, what it does, when to use)

### Image generation — fal.ai

| Model | Fal slug | Cost/img | Style lane |
|-------|----------|----------|------------|
| **Flux Pro 1.1 Ultra** | `fal-ai/flux-pro/v1.1-ultra` | ~$0.05–0.10 | Cinematic photoreal (current default) — grounded, moody, Villeneuve-like |
| **Flux Pro** | `fal-ai/flux-pro` | ~$0.04 | Photoreal baseline, slightly softer than Ultra |
| **Flux Schnell** | `fal-ai/flux/schnell` | ~$0.003 | Fast cheap drafts for concept iteration |
| **Flux Kontext Max** | `fal-ai/flux-pro/kontext/max` | ~$0.05 | Edit / composite existing images — place logo on scene, change colors |
| **Recraft V3** | `fal-ai/recraft/v3/text-to-image` | ~$0.04 | Editorial illustration, bold flat graphic, poster aesthetic |
| **Ideogram V3** | `fal-ai/ideogram/v3` | ~$0.05 | Stylized art with reliable in-image text |
| **Nano Banana (Gemini 2.5)** | `fal-ai/gemini-25-flash-image` | ~$0.04 | Text-in-image composites when needed |
| **Bytedance Seedream 4** | `fal-ai/bytedance/seedream/v4` | ~$0.05 | Commercial-grade, alt aesthetic to Flux |

### Animation / video (for Reels variants)

| Model | Fal slug | Cost | Purpose |
|-------|----------|------|---------|
| **Kling 2.1** | `fal-ai/kling-video/v2.1/standard/image-to-video` | ~$0.50/5s | Animate a still BG into a 5s Reel clip |
| **LTX Video** | `fal-ai/ltx-video` | ~$0.10/5s | Fast cheap image-to-video |
| **Veo 3** | `fal-ai/veo3` | ~$3.00/5s | Premium image-to-video (hero launches) |
| **MMAudio** | `fal-ai/mmaudio-v2` | ~$0.10 | Ambient sound design for Reels |
| **Stable Audio** | `fal-ai/stable-audio` | ~$0.10 | 30s music tracks |

### Composition — local

| Tool | Where | What it does |
|------|-------|--------------|
| **post-pipeline** | `C:\Users\Owner\ALFA REBUILD\CLAUDE CODE\post-pipeline\` | Remotion-based branded-post renderer. Accepts `slides.json` with `background_image` + `dim`, outputs 1080×1080 PNGs. |
| **Canva (via MCP)** | Managed via Canva MCP tools | Manual composition option when finer control needed |
| **FFmpeg + Sharp** | local binaries | Post-processing, format conversion, thumbnail generation |

### Sources

| Source | What's in it | Used for |
|--------|--------------|----------|
| `C:\Users\Owner\ALFA REBUILD\wisdom_content.txt` | Days 6–65 wisdom_context + full teaching slides | Quote extraction, theme understanding |
| `alfa-phase1-RESET-MERGED-updated.html` | Days 1–5 | Days 1-5 content (not in wisdom_content.txt) |
| `alfa-social-briefings` repo | Weekly briefings | Tone + hashtag conventions |
| @alfa.rebuild IG | Reference visual direction | Style pattern-matching |

---

## 4. Standard workflow (per day)

### Phase 1 — Content prep (no spend)

1. Pull the day's `wisdom_context` + slides from `wisdom_content.txt`
2. Author a **hook quote**: 8–14 words, direct/visceral, 1–2 gold key-words
3. For single post → one hook. For carousel → cover hook + 2-4 teaching beats + closing CTA
4. Author the **caption** (body text) and **hashtag pack** (13 tags)
5. Author a **fal.ai prompt** per visual — cinematic, specific, brand-aligned

### Phase 2 — Background generation (fal.ai)

6. Generate at `aspect_ratio: "1:1"` (feed) — Flux Pro 1.1 Ultra unless another lane is called
7. Save to **three locations** simultaneously:
   - `alfa-daily-posts-images/samples/day-N/`
   - `post-pipeline/public/bg-day-N/` (for pipeline consumption)
   - `C:\...\POST IMAGES\day-N\` (for Canva workflow)
8. Review → regen weak images (budget ~15-20% regen rate)

### Phase 3 — Composition (two paths)

**Path A — Branded PNGs via post-pipeline (fully automated):**

9. Write `post-pipeline/content/day-N-carousel.json` referencing the BGs
10. Run `node post.js --type carousel --topic "day-N" --day "DAY N" --slides "content/day-N-carousel.json"`
11. Output lands in `post-pipeline/output/carousel-day-N/`
12. Copy PNGs to repo + POST IMAGES `final-carousel/` subfolders

**Path B — Raw BGs into Canva (manual composition):**

9. Upload the `samples/day-N/*.jpg` BGs into Canva
10. Apply brand template (ALFA icon, gold rules, quote typography) in Canva
11. Export

### Phase 4 — Publishing

13. Generate `quote.md` alongside images with: hook, alternates, caption, hashtags
14. Review via `alfa-content-auditor` + `anti-ai-humanizer` skills
15. Commit to repo → push → ready to copy-paste into Meta Business Suite

---

## 5. PROJECT RULES — hard constraints

See `PROJECT_RULES.md` for the canonical list. Key points:

- **No person looks at the camera** unless explicitly instructed
- **No text / words / logos** baked into fal.ai images
- **Dark, moody, grounded** — never light/airy/generic-wellness
- **Aspect ratio:** 1:1 for feed, 4:5 for portrait feed, 9:16 for Stories/Reels only
- **Forbidden words:** addiction, craving, recovery, journey, healing, therapy (full list in the brand kit)
- **Subject age:** late 30s to mid-50s, grounded, lived-in (not models)

---

## 5b. Voice Rules Compliance Checklist (run this on every quote + caption before shipping)

Every piece of text I author — hook quotes, alternate hooks, captions, carousel body copy — passes through this checklist. If any item fails, rewrite before shipping.

### The 8-point check

1. **Subject-Naming Rule** (highest priority for cold-reach content)
   - [ ] Does slide 1 / first caption line name the subject in **plain English** (drinking, the drink, alcohol, what you pour at 9pm, what you reach for at the end of the day) BEFORE any ALFA proprietary term?
   - **Exempt:** Mid-funnel content for existing followers only — content explicitly gated or posted to warm audience. Default is to assume cold reach.

2. **Plain-Language Rule**
   - [ ] Every ALFA proprietary term (the pattern, the pull, the noise, the mechanism, the permission voice, the rebuild, the observer, the danger window, leverage) is paired with a **concrete plain-language anchor in the same breath**?
   - Example: ✗ "Relief from the pull" → ✓ "Relief from the 6 p.m. itch to reach for the glass"

3. **Forbidden words**
   - [ ] No: addiction · alcoholic · addict · substance abuse · alcoholism · craving · anxiety · stress disorder · recovery · healing · detox · rehab · relapse · abstinence · client · patient · user · CBT · DBT · ACT · urge surfing · window of tolerance · author names · "you are not alone" · "journey" (in cold-reach hooks or founder voice)

4. **Exclamation marks**
   - [ ] Zero exclamation marks anywhere in ALFA voice content.

5. **"One day at a time"**
   - [ ] Used ONLY as the closing line of a caption. Never mid-sentence. Never in a headline. Never repeated.

6. **Caption opener**
   - [ ] Opens with ONE sentence, straight to it, no preamble. Not "Let me tell you about..." or "Today we're talking about..." — just the punch.

7. **Pain → Solution → Outcome → How ordering**
   - [ ] Caption structure: name the pain (let him feel seen) → offer the reframe → point to the outcome → hint at the how. In that order.

8. **Ownership, not pity**
   - [ ] Language frames the reader as agent, not victim. "You stopped needing it" ✓ / "It stopped having power over you" ✗
   - [ ] No pity language. No victim framing. No "you deserve better" or "you're not alone" therapy-speak.

### Allowed plain-English subject references (use any of these in hooks)

- `drinking` · `the drinking` · `the drink` · `drink more than you should`
- `alcohol` · `the habit` · `what you reach for at the end of the day` · `what you pour at 9pm`
- `the drinking has become a problem`

### Pre-publish test

Read the first sentence (hook or caption line 1) aloud to a stranger. Can they tell what the post is about? If no → rewrite the opener to name the subject.

### Worked before/after examples

| ✗ Before | ✓ After | Why |
|----------|---------|-----|
| "THE PULL IS NOT RANDOM. IT ARRIVES ON SCHEDULE." | "THE PULL TO DRINK ISN'T RANDOM. IT ARRIVES ON SCHEDULE." | Cold reader now knows the pull is about drinking |
| "The pattern had leverage because you needed what it provided." | "The drink had leverage because you needed what it provided." | Subject named before proprietary term |
| "Relief from the pull" | "Relief from the 6 p.m. itch to reach for the glass" | Concrete anchor next to proprietary term |
| "The mechanism can be interrupted." | "The automatic sequence — the one that runs before you've decided — can be interrupted. We call it the mechanism." | Plain language does the work; proprietary term names it |
| "You've got this! Start your healing journey today!" | "You drink more than you want to. There's a stronger version of you on the other side of that." | Kill exclamation, kill journey, name the subject, frame the destination |

---

## 6. post-pipeline — quick reference

Located at `C:\Users\Owner\ALFA REBUILD\CLAUDE CODE\post-pipeline\`.

### Commands

**Single post:**
```bash
node post.js --type single \
  --topic "day-N" \
  --headline "YOUR HEADLINE HERE" \
  --gold "KEYWORD" \
  --body "Supporting statement." \
  --day "DAY N" \
  --bg "bg-day-N/image.jpg" \
  --dim 0.6
```

**Carousel:**
```bash
node post.js --type carousel \
  --topic "day-N" \
  --day "DAY N" \
  --slides "content/day-N-carousel.json"
```

### slides.json schema

```json
[
  {
    "headline": "UPPERCASE HEADLINE",
    "gold": "KEYWORD",
    "body": "Supporting statement (3–4 lines max).",
    "background_image": "bg-day-N/slide-01.jpg",
    "dim": 0.6
  },
  {
    "closing": true,
    "cta": "DM REBUILD TO START",
    "url": "alfarebuild.com"
  }
]
```

### Template spec (fixed)

- **Canvas:** 1080×1080 PNG
- **Fonts:** Barlow Condensed 900 (headlines), Barlow 400 (body + muted text)
- **Brand frame on every slide:** radial gradient (`#1E1B17` center → `#0D0B09` edges), 5% noise texture, 1px gold border inset 8px, 4 L-shaped gold corner brackets
- **Typography:** Hook 52px / Middle 44px / Closing ALFA hero 88px gold
- **Controls available per slide:** `headline`, `gold`, `body`, `background_image`, `dim`

---

## 7. File locations

```
ALFA REBUILD/
├── wisdom_content.txt                              ← Day 6-65 source content
├── MARKETING/IG Posts/POST IMAGES/                 ← Local working folder (Canva-ready)
│   ├── day-12/
│   ├── day-28/
│   │   ├── slide-01.jpg ... slide-04.jpg           ← Raw BGs
│   │   ├── quote.md                                ← Text + caption + hashtags
│   │   └── final-carousel/
│   │       └── 01-hook.png ... 05-closing.png     ← Branded finals
│   └── day-40/
│
└── CLAUDE CODE/post-pipeline/
    ├── post.js                                     ← CLI orchestrator
    ├── content/                                    ← Carousel JSON specs live here
    │   ├── day-28-carousel-bg.json
    │   └── day-N-carousel-bg.json
    ├── public/                                     ← Remotion static assets
    │   └── bg-day-N/slide-01.jpg ...              ← fal.ai BGs for pipeline
    ├── remotion/
    │   ├── posts/                                  ← Compositions (extended to accept bg)
    │   │   ├── SinglePost.tsx
    │   │   ├── CarouselHook.tsx
    │   │   ├── CarouselMiddle.tsx
    │   │   └── CarouselClosing.tsx
    │   └── components/
    │       └── PostFrame.tsx                       ← BG + dim overlay handled here
    └── output/carousel-day-N/                      ← Rendered PNGs land here

alfa-daily-posts-images/ (GitHub repo)
├── README.md
├── CLAUDE.md (if present)
├── skills.md                                       ← THIS FILE
├── PROJECT_RULES.md                                ← Brand + shot rules
├── scripts/
│   ├── generate-sample-day12.ts
│   ├── generate-iteration-1.ts
│   ├── generate-iteration-2.ts
│   └── generate-day-28-carousel-bgs.ts
└── samples/
    ├── day-12/
    ├── day-28/
    └── day-40/
```

---

## 8. Cost per output

| Deliverable | fal.ai cost | Time | Notes |
|-------------|-------------|------|-------|
| Single post BG only | $0.05–0.10 | ~15 sec | One Flux Pro Ultra call |
| Single post (BG + branded render) | $0.10 | ~30 sec | Add post-pipeline render |
| 5-slide carousel BGs only | $0.40 | ~1 min | 4 BGs (slide 5 no BG) |
| **Full 5-slide branded carousel** | **$0.40** | **~5 min** | BGs + JSON + pipeline render |
| Kling 2.1 Reel variant (5s) | $0.50 | ~2 min | Animate a still |
| **Full 65-day library (single posts)** | **~$10** | **~3 hours** | Sequential, with regens |
| **Full 65-day library (carousels, 5 slides each)** | **~$30** | **~1 day** | 65 × $0.40 + render time |

---

## 9. Style lanes — when to use each

Avoid feed monotony by rotating lanes across the 65 days.

| Lane | Fal model | Best for which days |
|------|-----------|---------------------|
| **Cinematic photoreal** | Flux Pro 1.1 Ultra | Environmental scenes, confrontation, trigger moments |
| **Editorial B&W portrait** | Flux Pro Ultra + B&W prompt | Identity days (Day 18, 37-41, 65) |
| **Cinematic abstract/textural** | Flux Pro Ultra | Concept days — "the pull," "the noise," "the gap" |
| **Macro detail** | Flux Pro Ultra | Carousel middle slides needing variety |
| **Editorial poster/illustration** | Recraft V3 / Ideogram V3 | Framework days — "the sequence," "the operating system," "three rules" |
| **Document noir / surveillance** | Flux Pro Ultra + grain | High-stakes emotional — 3 AM, cost reveals |

---

## 10. Common prompt patterns that work

### The global style suffix (always append)

```
cinematic still, 35mm film stock, shallow depth of field,
warm amber highlights, cool deep shadows, high contrast,
grounded masculine tone, dark moody atmosphere, ultra-detailed,
photographic realism, no text, no words, no logos, no watermarks,
no captions, no typography, subject NOT looking at camera,
NO direct eye contact with lens, engaged with scene not performing for camera
```

### Scene prompt structure

```
[Subject in posture/action] + [setting with specific props] +
[lighting direction + color temp] + [composition angle] +
[emotional beat] + [GLOBAL_STYLE suffix]
```

### Macro / abstract prompts

Shorter, punchier. Lead with the texture and let the physics take over:

```
Extreme macro close-up of [thing], [physics of the moment],
frozen [high-speed-shutter / mid-motion], deep black background,
single directional warm light, [no people / no objects],
[GLOBAL_STYLE suffix]
```

---

## 11. Troubleshooting

| Symptom | Cause | Fix |
|---------|-------|-----|
| Subject stares at camera despite rule | Flux ignores negation sometimes | Use strict profile language: "head turned 90 degrees away, far eye hidden behind nose" |
| AI hallucinates physics (mirror wrong spot, 6 fingers) | Flux layout drift | Regen with tighter positional language; or swap angle |
| Text is unreadable over BG | Dim too low, or BG too busy | Raise `dim` to 0.7+, or pick a simpler BG composition |
| BG looks flat after dim | Correct — raise `dim` too high kills the photo | Reduce `dim` to 0.5 and rely on radial gradient of PostFrame |
| Headline overflows two lines | Too long for 52px canvas at 1080px | Shorten headline to ~10-12 words |
| Remotion can't find `staticFile(...)` | File missing from `public/` | Confirm file at `post-pipeline/public/bg-day-N/...` matches the path in slides.json |

---

## 12. What this system does NOT do (yet)

Room to grow — add when needed:

- **Automated quote → prompt pipeline** — I still author prompts by hand. Could generate 65 prompts via a batch LLM call.
- **Automated regen selection** — I manually inspect. Could auto-score candidates and pick best.
- **4:5 portrait variants** — post-pipeline only does 1:1 right now. Add a `PORTRAIT_SIZE` constant + alt compositions.
- **Reels extension** — Kling 2.1 could animate any still. Would need a `reels-pipeline` extension or standalone script.
- **Canva auto-publish** — upload finals directly to a Canva folder via MCP.
- **Meta Business Suite auto-schedule** — would close the last-mile loop.

---

## 13. Related skills + repos

| Repo / skill | What it gives you |
|--------------|-------------------|
| [`claude-video-styles`](https://github.com/TaranAujla123/claude-video-styles) | Motion / video style catalog — 10 Remotion compositions for Reels + samplers |
| [`alfa-social-briefings`](https://github.com/TaranAujla123/alfa-social-briefings) | Weekly 3-post briefings — tone, hashtag packs, posting schedule |
| `alfa-brand-kit` (skill) | Brand palette, fonts, tone rules — load before any content generation |
| `alfa-content-auditor` (skill) | QA pass on generated quotes + captions |
| `anti-ai-humanizer` (skill) | Strip AI tells from copy before shipping |
| `alfa-product-marketing-context` (skill) | Positioning, audience, ICP |
| `post-pipeline/CLAUDE.md` | Full Remotion pipeline spec |
| `PROJECT_RULES.md` | Shot + brand rules for this specific repo |
