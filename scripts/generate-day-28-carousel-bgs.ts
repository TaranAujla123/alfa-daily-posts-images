/**
 * Day 28 — "Between Stimulus and Response" — carousel backgrounds
 *
 * Generates 4 × 1:1 (1080×1080) cinematic backgrounds via fal.ai Flux Pro
 * 1.1 Ultra, for slides 1–4 of the Day 28 carousel. Slide 5 (CTA) stays on
 * the existing clean dark gradient.
 *
 * Outputs to THREE locations:
 *   1. This repo:     samples/day-28/
 *   2. post-pipeline: post-pipeline/public/bg-day-28/   ← consumed by Remotion
 *   3. POST IMAGES:   ALFA REBUILD/MARKETING/IG Posts/POST IMAGES/day-28/
 *
 * Applies PROJECT_RULES: no direct eye contact, no text in image,
 * moody grounded masculine cinematic tone.
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

const REPO_DIR = path.resolve("samples/day-28");
const POST_PIPELINE_PUBLIC =
  "C:\\Users\\Owner\\ALFA REBUILD\\CLAUDE CODE\\post-pipeline\\public\\bg-day-28";
const LOCAL_MIRROR =
  "C:\\Users\\Owner\\ALFA REBUILD\\MARKETING\\IG Posts\\POST IMAGES\\day-28";

[REPO_DIR, POST_PIPELINE_PUBLIC, LOCAL_MIRROR].forEach((d) =>
  fs.mkdirSync(d, { recursive: true })
);

const GLOBAL_STYLE =
  "cinematic still, 35mm film stock, shallow depth of field, warm amber highlights, cool deep shadows, high contrast, grounded masculine tone, dark moody atmosphere, ultra-detailed, photographic realism, " +
  "no text, no words, no logos, no watermarks, no captions, no typography, " +
  "subject NOT looking at camera, NO direct eye contact with lens, engaged with scene not performing for camera";

interface Job {
  slot: string; // "slide-01" etc
  description: string;
  prompt: string;
}

const JOBS: Job[] = [
  // ── Slide 1 (Hook) — "MOST MEN REACT. THE REBUILT MAN RESPONDS."
  {
    slot: "slide-01",
    description:
      "A man frozen in the decisive moment — the pause between trigger and action",
    prompt:
      "Dramatic side-profile silhouette of a grounded man in his 40s standing in a dimly lit modern interior, dark walls and moody amber rim-light catching only the edge of his jawline, shoulder, and hand, " +
      "he stands completely still in a moment of profound stillness — his eyes closed or looking downward, face turned 90 degrees away from the camera, NOT looking at the lens, " +
      "one hand raised slightly as if paused mid-gesture, the other resting at his side, his posture suggests a man holding a fraction of a second — the instant before a decision, " +
      "deep shadow dominates the composition with a single warm amber light source from the left, rich blacks, cinematic chiaroscuro, " +
      "the empty negative space around him is heavy and charged, the moment hangs in the air, " +
      GLOBAL_STYLE,
  },
  // ── Slide 2 — "THE AUTOMATIC MIND FIRES BEFORE YOU NOTICE."
  {
    slot: "slide-02",
    description:
      "Macro sparks or ignition — the exact moment something fires, pre-conscious",
    prompt:
      "Extreme macro close-up photograph of bright hot sparks erupting from the moment of ignition, captured in high-speed shutter detail, " +
      "amber and orange flecks of burning metal or ember flying outward from a single point of impact, frozen in mid-air against a deep pure black background, " +
      "each spark rendered with microscopic clarity showing the incandescent trails behind them, wisps of smoke curling at the edges of the frame, " +
      "no people, no objects, no context — just the pure visual vocabulary of something automatic firing before anything else can happen, " +
      "the sparks feel alive and unstoppable, the blackness around them total, " +
      GLOBAL_STYLE,
  },
  // ── Slide 3 — "MEET THE OBSERVER."
  {
    slot: "slide-03",
    description:
      "Extreme macro of a man's eye in three-quarter view, NOT looking at camera — the watcher",
    prompt:
      "Extreme macro photograph of a man's single eye filling the frame, shown in three-quarter profile — the eye is NOT looking at the camera, the gaze is directed sharply off to the right side beyond the frame, focusing on something far outside the image, " +
      "the iris is deep brown with amber flecks catching a single directional light source, the pupil contracted, fine detail visible in the iris fibers and the lashes, " +
      "the eyelid and surrounding skin rendered in deep cinematic shadow with a single warm amber rim light catching the top of the cheekbone and the bridge of the nose, " +
      "background pitch black, the eye as the sole subject, an aware watcher observing without being observed, " +
      "no reflection of the camera in the eye, the eye is not engaging with the viewer, " +
      GLOBAL_STYLE,
  },
  // ── Slide 4 — "YOU CANNOT STOP THE THOUGHT."
  {
    slot: "slide-04",
    description:
      "A hand paused inches from a whiskey glass on a bar — the line being held",
    prompt:
      "Dramatic side-angle close-up of a man's hand frozen in mid-air about one inch away from a crystal whiskey tumbler filled with amber liquid sitting on a dark polished wood bar top, " +
      "the hand is paused — not retreating, not advancing — held in perfect stillness with fingers slightly curled, knuckles catching warm amber light from an off-camera source, " +
      "the whiskey glass crisp and sharp in the foreground, the amber liquid catching the same light, the reflection of the glass on the bar wood visible, " +
      "the rest of the frame in deep shadow, the man's wrist and sleeve of a dark shirt fading into black, no face visible, no body, just the hand and the glass and the decisive gap between them, " +
      "the exact inch between finger and glass is the subject of the image — the line being held, " +
      GLOBAL_STYLE,
  },
];

function downloadImage(url: string, outPath: string): Promise<void> {
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
  const fileName = `${job.slot}.jpg`;
  const repoPath = path.join(REPO_DIR, fileName);

  console.log(`\n[${job.slot}] ${job.description}`);
  const start = Date.now();

  const result: any = await fal.subscribe(MODEL, {
    input: {
      prompt: job.prompt,
      aspect_ratio: "1:1",
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
    console.error(`  FAILED — no image URL in fal.ai response`);
    return;
  }

  await downloadImage(imageUrl, repoPath);

  // Mirror to post-pipeline/public/ and POST IMAGES
  fs.copyFileSync(repoPath, path.join(POST_PIPELINE_PUBLIC, fileName));
  fs.copyFileSync(repoPath, path.join(LOCAL_MIRROR, fileName));

  const ms = Date.now() - start;
  const sizeKb = Math.round(fs.statSync(repoPath).size / 1024);
  console.log(`  OK  ${repoPath}  (${sizeKb} KB, ${(ms / 1000).toFixed(1)}s)`);
  console.log(`      → post-pipeline/public/bg-day-28/${fileName}`);
  console.log(`      → POST IMAGES/day-28/${fileName}`);
}

async function main() {
  console.log(`Generating ${JOBS.length} BGs for Day 28 carousel at 1:1…`);
  for (const job of JOBS) {
    try {
      await generateOne(job);
    } catch (err) {
      console.error(`  ERROR on ${job.slot}:`, err);
    }
  }
  console.log(`\nDone.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
