/**
 * Iteration 1 — user-requested revisions + additions
 *
 * Day 12:
 *   B-v2 · man relaxing at home, staring at evening city view
 *
 * Day 40:
 *   A-v2 · chain with the snap clearly visible
 *   D    · man at social gathering, confident, drinking water while friends drink alcohol
 *   E    · man driving away from liquor store, liquor store visible in rearview
 */

import { fal } from "@fal-ai/client";
import fs from "fs";
import path from "path";
import https from "https";
import "dotenv/config";

const FAL_KEY = process.env.FAL_KEY;
if (!FAL_KEY) {
  console.error("FAL_KEY not found in .env");
  process.exit(1);
}
fal.config({ credentials: FAL_KEY });

const MODEL = "fal-ai/flux-pro/v1.1-ultra";

const GLOBAL_STYLE =
  "cinematic still, 35mm film stock, shallow depth of field, warm amber highlights, cool deep shadows, high contrast, grounded masculine tone, dark moody atmosphere, ultra-detailed, photographic realism, no text, no words, no logos, no watermarks, no captions, no typography";

interface Job {
  day: number;
  id: string;
  description: string;
  prompt: string;
}

const JOBS: Job[] = [
  // ─── Day 12 B v2 ──────────────────────────────────────────────────
  {
    day: 12,
    id: "B-v2-home-evening",
    description: "Man relaxing at home, staring out at an evening city view through floor-to-ceiling windows",
    prompt:
      "Man in his 40s seated in a relaxed posture on a modern dark leather sofa or low lounge chair inside a contemporary high-rise apartment at dusk, floor-to-ceiling windows behind or beside him showing an evening city skyline with building lights just beginning to twinkle, warm amber table lamp on a side table casting a pool of soft light, cool blue dusk light coming in through the glass, he is leaning back with forearms on his thighs or one hand loosely on the armrest, sleeves pushed up, jacket off, comfortable unguarded posture, looking out at the city view with a quiet contemplative expression, the unguarded hour when the pull arrives in comfort, muted dark contemporary interior with subtle gold accents, shallow focus on the man with city softly blurred, side or three-quarter angle, " +
      GLOBAL_STYLE,
  },
  // ─── Day 40 A v2 ──────────────────────────────────────────────────
  {
    day: 40,
    id: "A-v2-chain-visible-snap",
    description: "Chain with ONE LINK CLEANLY BROKEN — the snap highly visible in center frame",
    prompt:
      "Extreme close-up macro photograph of a heavy thick iron chain lying across a weathered dark steel surface, ONE LINK CLEANLY BROKEN IN THE CENTER OF THE FRAME, the two severed ends pulled apart with a clear inch of air between them, the broken edges sharp and metallic and clean, both severed tips catching a dramatic shaft of cold cinematic light, the rest of the chain receding softly into shadow on both sides, the snapped link is unmistakably the subject and focal point of the image, industrial warehouse atmosphere, oxidized rough iron texture with rust flecks, high-detail sharp focus on the broken gap, dust particles suspended in the light beam, stark dramatic chiaroscuro lighting, the precise decisive moment a hold is broken, " +
      GLOBAL_STYLE,
  },
  // ─── Day 40 D — social gathering + water ─────────────────────────
  {
    day: 40,
    id: "D-social-water-confident",
    description: "Man at social gathering, confidently holding water, friends around him holding alcohol",
    prompt:
      "Man in his 40s at an upscale social gathering in a warm-lit modern home or intimate restaurant, confidently holding a clear crystal glass of water with a slice of lemon or a single ice cube, standing and engaged in conversation with a small group of friends who are holding whiskey tumblers, wine glasses, and beer glasses, his posture is relaxed and confident with weight on one leg, slight genuine smile, strong masculine presence, comfortable in his own skin, his glass of water catches the warm amber light, the alcohol around him clearly visible but not activating him, candid documentary photography style, shallow focus favoring the man's hand with the water and his confident expression, group softly blurred in the background, warm interior lighting with dimmed overhead fixtures, the pattern has no leverage because he does not need what it offers, " +
      GLOBAL_STYLE,
  },
  // ─── Day 40 E — driving away, liquor store in rearview ──────────
  {
    day: 40,
    id: "E-driving-away-rearview",
    description: "Car interior — liquor store receding clearly in the rearview mirror, decisive exit",
    prompt:
      "Interior of a car at dusk or early evening, point-of-view from the driver's seat with the RECTANGULAR REARVIEW MIRROR prominently in the upper center of the frame as the sharp focal point, the rearview mirror clearly showing the reflection of a LIQUOR STORE with its amber and red glowing sign receding in the distance behind the car, the liquor store sign unmistakably visible in the mirror, rain or light evening mist on the rear windshield visible behind the mirror, the driver's hand resting calmly and loosely on the leather steering wheel in soft focus in the foreground bottom of frame, cabin interior dark with the amber dashboard glow, cool blue dusk light through the windshield ahead, deliberate decisive driving motion suggested, the moment of driving past and moving on, cinematic interior composition with the rearview mirror as hero element, " +
      GLOBAL_STYLE,
  },
];

async function downloadImage(url: string, outPath: string): Promise<void> {
  return new Promise((resolve, reject) => {
    https
      .get(url, (response) => {
        if (response.statusCode !== 200) {
          reject(new Error(`HTTP ${response.statusCode}`));
          return;
        }
        const stream = fs.createWriteStream(outPath);
        response.pipe(stream);
        stream.on("finish", () => stream.close(() => resolve()));
        stream.on("error", reject);
      })
      .on("error", reject);
  });
}

async function generateOne(job: Job): Promise<void> {
  const outDir = path.resolve(`samples/day-${job.day}`);
  fs.mkdirSync(outDir, { recursive: true });
  const outPath = path.join(outDir, `day${job.day}-${job.id}.jpg`);

  console.log(`\n[day-${job.day} / ${job.id}] generating...`);
  console.log(`  ${job.description}`);
  const start = Date.now();

  const result: any = await fal.subscribe(MODEL, {
    input: {
      prompt: job.prompt,
      aspect_ratio: "9:16",
      num_images: 1,
      enable_safety_checker: true,
      safety_tolerance: "2",
      output_format: "jpeg",
      raw: false,
    },
    logs: false,
  });

  const imageUrl = result?.data?.images?.[0]?.url;
  if (!imageUrl) {
    console.error(`  FAILED — no image URL`);
    return;
  }

  await downloadImage(imageUrl, outPath);
  const ms = Date.now() - start;
  const sizeKb = Math.round(fs.statSync(outPath).size / 1024);
  console.log(`  OK  ${outPath}  (${sizeKb} KB, ${(ms / 1000).toFixed(1)}s)`);
}

async function main() {
  console.log(`Running ${JOBS.length} iteration jobs…`);
  for (const job of JOBS) {
    try {
      await generateOne(job);
    } catch (err) {
      console.error(`  ERROR on day ${job.day} / ${job.id}:`, err);
    }
  }
  console.log(`\nDone.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
