/**
 * ALFA Daily Post Images — Sample generator
 *
 * Generates 3 cinematic angles per requested day via fal.ai Flux Pro 1.1 Ultra.
 * No text baked into images — backgrounds only (text overlay added in Canva).
 *
 * Usage:
 *   npx tsx scripts/generate-sample-day12.ts           → generates all configured days
 *   npx tsx scripts/generate-sample-day12.ts --day 12  → one day
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

// Mirror every render to this local folder in addition to the repo.
const LOCAL_MIRROR_ROOT =
  "C:\\Users\\Owner\\ALFA REBUILD\\MARKETING\\IG Posts\\POST IMAGES";

const GLOBAL_STYLE =
  "cinematic still, 35mm film stock, shallow depth of field, warm amber highlights, cool deep shadows, high contrast, grounded masculine tone, dark moody atmosphere, ultra-detailed, photographic realism, no text, no words, no logos, no watermarks, no captions, no typography";

interface Angle {
  id: string;
  description: string;
  prompt: string;
}

interface DayConfig {
  day: number;
  title: string;
  angles: Angle[];
}

const DAYS: DayConfig[] = [
  {
    day: 12,
    title: "The Danger Window",
    angles: [
      {
        id: "A-dusk-route",
        description: "Driver's POV toward a glowing liquor-store sign at dusk, wet asphalt",
        prompt:
          "Driver's point-of-view through a car windshield at dusk, empty suburban road wet from rain, a liquor store sign glowing amber and red in the middle distance, reflection of taillights in the wet pavement, hands resting on the steering wheel partially visible at bottom of frame, overcast sky deepening to navy, streetlights flickering on, the exact moment of a predictable daily intersection, a known threshold approaching, " +
          GLOBAL_STYLE,
      },
      {
        id: "B-man-at-window",
        description: "Man silhouette at apartment window at golden hour, city lights below",
        prompt:
          "Man in his 40s shot from behind, silhouetted against a large apartment window at the golden amber hour, city lights just beginning to glow in the valley below, warm amber light catching the edge of his shoulder and jaw, one hand resting against the window frame, the other held loosely at his side, shallow focus on the man with city softly blurred, quiet tension, the hour when the pull arrives, muted dark interior, " +
          GLOBAL_STYLE,
      },
      {
        id: "C-threshold-door",
        description: "Door slightly ajar in a dark hallway, warm light spilling through the crack",
        prompt:
          "Long dark narrow hallway, polished dark hardwood floor, one door at the end of the hallway standing slightly ajar, warm amber light spilling through the narrow crack and pooling on the floor, the rest of the hallway in deep shadow with only faint ambient light, cinematic single-point perspective, heavy atmosphere of decision, threshold, the moment before action, no people visible, minimal contemporary architecture, " +
          GLOBAL_STYLE,
      },
    ],
  },
  {
    day: 40,
    title: "It Has No Leverage",
    angles: [
      {
        id: "A-severed-chain",
        description: "Heavy chain snapped clean, one link broken, cold industrial light",
        prompt:
          "Close-up macro photograph of a heavy thick iron chain lying across weathered dark concrete, one link cleanly snapped in the center, the severed ends slightly separated, cold blue morning light from a high window raking across the broken link, dust motes visible in the light beam, the rest of the chain receding into deep shadow, industrial warehouse atmosphere, oxidized metal texture, the precise moment a hold is broken, stark and quiet, " +
          GLOBAL_STYLE,
      },
      {
        id: "B-abandoned-glass",
        description: "Whiskey glass half-full, left on a bar, early morning light, the man has walked away",
        prompt:
          "Crystal whiskey glass half-filled with amber liquid standing alone on a polished dark wood bar top, an empty barstool slightly pushed back, morning light streaming through dusty tall windows behind catching the glass and making the amber glow, the rest of the bar in deep shadow, no people visible, an abandoned moment, the drinker has walked away and is not coming back, still-life composition, quiet and decisive, " +
          GLOBAL_STYLE,
      },
      {
        id: "C-man-walking-away",
        description: "Man in dark jacket walking away at dawn into warm light, decisive silhouette",
        prompt:
          "Man in his 40s in a dark jacket shot from behind, walking away down a wet empty street at dawn, warm golden light at the end of the street, deep cool blue shadows closer to the camera, his shoulders squared, stride steady and decisive, steam rising from a grate beside him, tall narrow buildings framing the alley in silhouette, the suggestion of something dark receding behind him into the shadows, cinematic one-point perspective, " +
          GLOBAL_STYLE,
      },
    ],
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

async function generateOne(day: number, angle: Angle, outputDir: string): Promise<void> {
  console.log(`\n[day-${day} / ${angle.id}] generating...`);
  console.log(`  ${angle.description}`);
  const start = Date.now();

  const result: any = await fal.subscribe(MODEL, {
    input: {
      prompt: angle.prompt,
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
    console.error(JSON.stringify(result, null, 2));
    return;
  }

  const outPath = path.join(outputDir, `day${day}-${angle.id}.jpg`);
  await downloadImage(imageUrl, outPath);
  const ms = Date.now() - start;
  const sizeKb = Math.round(fs.statSync(outPath).size / 1024);
  console.log(`  OK  ${outPath}  (${sizeKb} KB, ${(ms / 1000).toFixed(1)}s)`);

  // Mirror to local POST IMAGES folder, bucketed by day
  try {
    const mirrorDir = path.join(LOCAL_MIRROR_ROOT, `day-${day}`);
    fs.mkdirSync(mirrorDir, { recursive: true });
    const mirrorPath = path.join(mirrorDir, path.basename(outPath));
    fs.copyFileSync(outPath, mirrorPath);
    console.log(`      mirrored → ${mirrorPath}`);
  } catch (err) {
    console.warn(`      mirror failed: ${(err as Error).message}`);
  }
}

async function main() {
  const dayFilter = process.argv.indexOf("--day");
  const targetDay = dayFilter >= 0 ? parseInt(process.argv[dayFilter + 1], 10) : null;

  const queue = targetDay ? DAYS.filter((d) => d.day === targetDay) : DAYS;
  if (queue.length === 0) {
    console.error(`No day configured for --day ${targetDay}`);
    process.exit(1);
  }

  for (const day of queue) {
    const outputDir = path.resolve(`samples/day-${day.day}`);
    fs.mkdirSync(outputDir, { recursive: true });
    console.log(`\n===== Day ${day.day} — ${day.title} =====`);
    console.log(`Output: ${outputDir}`);

    for (const angle of day.angles) {
      try {
        await generateOne(day.day, angle, outputDir);
      } catch (err) {
        console.error(`  ERROR on day ${day.day} / ${angle.id}:`, err);
      }
    }
  }

  console.log(`\nDone.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
