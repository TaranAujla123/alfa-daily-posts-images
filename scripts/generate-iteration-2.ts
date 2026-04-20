/**
 * Iteration 2 — user feedback
 *
 * Day 40 D-v2 · man at social gathering, drinking CLEAR water, group scene,
 *               NOT looking at camera, engaged with the group.
 *
 * Rules applied globally:
 *   - No direct eye contact with the camera
 *   - No text / watermarks / typography
 *   - Dark moody cinematic grade, Barlow-brand emotional tone
 *   - Output saved to repo AND local POST IMAGES folder
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

const LOCAL_MIRROR_ROOT =
  "C:\\Users\\Owner\\ALFA REBUILD\\MARKETING\\IG Posts\\POST IMAGES";

// Hard style rules applied to every prompt
const GLOBAL_STYLE =
  "cinematic still, 35mm film stock, shallow depth of field, warm amber highlights, cool deep shadows, high contrast, grounded masculine tone, dark moody atmosphere, ultra-detailed, photographic realism, " +
  "no text, no words, no logos, no watermarks, no captions, no typography, " +
  "subject NOT looking at the camera, NOT facing the lens, no direct eye contact with viewer, three-quarter or profile view, engaged with the scene not performing for camera";

interface Job {
  day: number;
  id: string;
  description: string;
  prompt: string;
}

const JOBS: Job[] = [
  {
    day: 40,
    id: "D-v3-group-water-profile",
    description:
      "Man mid-40s in SIDE PROFILE to the camera, talking to a friend on his left, clear water in hand, group scene around him",
    prompt:
      "Candid documentary photograph of a social gathering in a warm-lit upscale modern home kitchen-island bar, wide medium shot of a group of four to five people in mid-conversation, " +
      "CAMERA IS POSITIONED TO THE RIGHT OF THE MAIN SUBJECT, capturing him from his right side in STRICT SIDE PROFILE, " +
      "the main subject is a grounded man in his mid-40s with short salt-and-pepper hair and a trimmed beard, shown ONLY in left-side profile view — his nose, mouth, and chin visible in silhouette against the warm background, his face turned 90 degrees AWAY from the camera, facing a friend on his left whom he is listening to and speaking with, HIS FAR EYE IS HIDDEN BEHIND HIS OWN NOSE from this camera angle, he is NOT smiling at the camera, HE IS NOT FACING THE CAMERA, his attention is entirely on his friend, " +
      "in his right hand (closer to camera) he is holding a tall clear highball glass of CLEAR SPARKLING WATER with visible ice cubes and a thin slice of lime, glass held relaxed at chest height, " +
      "surrounding him are three or four friends holding whiskey tumblers with amber liquid, red wine glasses, and beer bottles — the alcohol visible in the group context — some facing the subject, some facing away, in the natural geometry of a real conversation, " +
      "warm amber pendant lights overhead, rich wood bar surface, rows of backlit bottles blurred behind the group, " +
      "candid off-the-cuff photojournalism moment, nobody posed, nobody looking at the camera, depth of field softly blurring the friends at the edges, " +
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

  // Mirror to local POST IMAGES folder
  try {
    const mirrorDir = path.join(LOCAL_MIRROR_ROOT, `day-${job.day}`);
    fs.mkdirSync(mirrorDir, { recursive: true });
    const mirrorPath = path.join(mirrorDir, path.basename(outPath));
    fs.copyFileSync(outPath, mirrorPath);
    console.log(`      mirrored → ${mirrorPath}`);
  } catch (err) {
    console.warn(`      mirror failed: ${(err as Error).message}`);
  }
}

async function main() {
  console.log(`Running ${JOBS.length} iteration-2 job(s)…`);
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
