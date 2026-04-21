/**
 * Regenerate Day 12 + Day 40 approved angles at 1:1 (1080x1080)
 * for IG feed use. Original generations were 9:16 — wrong for feed.
 *
 * Uses the same prompts that landed well on the first pass, with the
 * PROJECT_RULES eye-contact/no-text rules baked into GLOBAL_STYLE.
 *
 * Outputs to repo + POST IMAGES (tri-mirror not needed here —
 * these BGs are for Canva workflow, not the post-pipeline).
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

const GLOBAL_STYLE =
  "cinematic still, 35mm film stock, shallow depth of field, warm amber highlights, cool deep shadows, high contrast, grounded masculine tone, dark moody atmosphere, ultra-detailed, photographic realism, " +
  "no text, no words, no logos, no watermarks, no captions, no typography, " +
  "subject NOT looking at camera, NO direct eye contact with lens, engaged with scene not performing for camera";

interface Job {
  day: number;
  id: string;
  description: string;
  prompt: string;
}

const JOBS: Job[] = [
  // ─── Day 12 — The Danger Window ─────────────────────────────────
  {
    day: 12,
    id: "A-dusk-route-1x1",
    description:
      "Driver's POV toward a glowing liquor-store sign at dusk, wet asphalt",
    prompt:
      "Driver's point-of-view through a car windshield at dusk, empty suburban road wet from rain, a liquor store sign glowing amber and red in the middle distance, reflection of taillights in the wet pavement, hands resting on the steering wheel partially visible at bottom of frame, overcast sky deepening to navy, streetlights flickering on, the exact moment of a predictable daily intersection, a known threshold approaching, square 1:1 composition with generous negative space in the upper half for potential overlay text, " +
      GLOBAL_STYLE,
  },
  {
    day: 12,
    id: "B-v2-home-evening-1x1",
    description:
      "Man relaxing at home, staring at evening city view through floor-to-ceiling windows",
    prompt:
      "Man in his 40s seated in a relaxed posture on a modern dark leather sofa or low lounge chair inside a contemporary high-rise apartment at dusk, floor-to-ceiling windows behind or beside him showing an evening city skyline with building lights just beginning to twinkle, warm amber table lamp on a side table casting a pool of soft light, cool blue dusk light coming in through the glass, he is leaning back with forearms on his thighs or one hand loosely on the armrest, sleeves pushed up, jacket off, comfortable unguarded posture, looking out at the city view with a quiet contemplative expression, the unguarded hour when the pull arrives in comfort, muted dark contemporary interior with subtle gold accents, shallow focus on the man with city softly blurred, side profile or three-quarter view with the subject offset to one side of the frame, square 1:1 composition, " +
      GLOBAL_STYLE,
  },
  {
    day: 12,
    id: "C-threshold-door-1x1",
    description:
      "Door slightly ajar in a dark hallway, warm light spilling through the crack",
    prompt:
      "Long dark narrow hallway, polished dark hardwood floor, one door at the end of the hallway standing slightly ajar, warm amber light spilling through the narrow crack and pooling on the floor, the rest of the hallway in deep shadow with only faint ambient light, cinematic single-point perspective, heavy atmosphere of decision, threshold, the moment before action, no people visible, minimal contemporary architecture, square 1:1 composition with the door centered and symmetry emphasized, " +
      GLOBAL_STYLE,
  },

  // ─── Day 40 — It Has No Leverage ────────────────────────────────
  {
    day: 40,
    id: "A-v2-chain-visible-snap-1x1",
    description: "Chain with ONE LINK CLEANLY BROKEN — the snap dead center",
    prompt:
      "Extreme close-up macro photograph of a heavy thick iron chain lying across a weathered dark steel surface, ONE LINK CLEANLY BROKEN IN THE CENTER OF THE FRAME, the two severed ends pulled apart with a clear inch of air between them, the broken edges sharp and metallic and clean, both severed tips catching a dramatic shaft of cold cinematic light, the rest of the chain receding softly into shadow on both sides, the snapped link is unmistakably the subject and focal point, industrial warehouse atmosphere, oxidized rough iron texture with rust flecks, high-detail sharp focus on the broken gap, dust particles suspended in the light beam, stark dramatic chiaroscuro lighting, the precise decisive moment a hold is broken, square 1:1 composition, " +
      GLOBAL_STYLE,
  },
  {
    day: 40,
    id: "D-v3-group-water-profile-1x1",
    description:
      "Man in side profile at a group gathering, clear water in hand, NOT looking at camera",
    prompt:
      "Candid documentary photograph of a social gathering in a warm-lit upscale modern home kitchen-island bar, wide medium shot of a group of four to five people in mid-conversation, " +
      "CAMERA IS POSITIONED TO THE RIGHT OF THE MAIN SUBJECT, capturing him from his right side in STRICT SIDE PROFILE, " +
      "the main subject is a grounded man in his mid-40s with short salt-and-pepper hair and a trimmed beard, shown ONLY in left-side profile view — his nose, mouth, and chin visible in silhouette against the warm background, his face turned 90 degrees AWAY from the camera, facing a friend on his left whom he is listening to and speaking with, HIS FAR EYE IS HIDDEN BEHIND HIS OWN NOSE from this camera angle, he is NOT smiling at the camera, HE IS NOT FACING THE CAMERA, his attention is entirely on his friend, " +
      "in his right hand (closer to camera) he is holding a tall clear highball glass of CLEAR SPARKLING WATER with visible ice cubes and a thin slice of lime, glass held relaxed at chest height, " +
      "surrounding him are three or four friends holding whiskey tumblers with amber liquid, red wine glasses, and beer bottles — the alcohol visible in the group context — some facing the subject, some facing away, in the natural geometry of a real conversation, " +
      "warm amber pendant lights overhead, rich wood bar surface, rows of backlit bottles blurred behind the group, " +
      "candid off-the-cuff photojournalism moment, nobody posed, nobody looking at the camera, depth of field softly blurring the friends at the edges, square 1:1 composition, " +
      GLOBAL_STYLE,
  },
  {
    day: 40,
    id: "E-driving-away-rearview-1x1",
    description:
      "Car interior — liquor store clearly visible in the rearview mirror",
    prompt:
      "Interior of a car at dusk or early evening, point-of-view from the driver's seat with the RECTANGULAR REARVIEW MIRROR prominently positioned in the UPPER CENTER of the windshield exactly where a real rearview mirror mounts — approximately 12 inches below the headliner and centered horizontally, the mirror is the sharp focal point of the frame, the rearview mirror clearly showing the reflection of a LIQUOR STORE with its amber and red glowing sign receding in the distance behind the car, the liquor store sign unmistakably visible in the mirror, rain or light evening mist on the rear windshield visible behind the mirror, the driver's hand resting calmly and loosely on the leather steering wheel in soft focus in the foreground bottom of frame, cabin interior dark with the amber dashboard glow, cool blue dusk light through the windshield ahead, deliberate decisive driving motion suggested, the moment of driving past and moving on, cinematic interior composition with the rearview mirror as hero element, square 1:1 composition, " +
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
  const repoDir = path.resolve(`samples/day-${job.day}`);
  fs.mkdirSync(repoDir, { recursive: true });
  const repoPath = path.join(repoDir, `day${job.day}-${job.id}.jpg`);

  console.log(`\n[day-${job.day} / ${job.id}] ${job.description}`);
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
    console.error(`  FAILED — no image URL`);
    return;
  }

  await downloadImage(imageUrl, repoPath);

  const mirrorDir = path.join(LOCAL_MIRROR_ROOT, `day-${job.day}`);
  fs.mkdirSync(mirrorDir, { recursive: true });
  fs.copyFileSync(repoPath, path.join(mirrorDir, path.basename(repoPath)));

  const ms = Date.now() - start;
  const sizeKb = Math.round(fs.statSync(repoPath).size / 1024);
  console.log(`  OK  ${repoPath}  (${sizeKb} KB, ${(ms / 1000).toFixed(1)}s)`);
  console.log(`      → POST IMAGES/day-${job.day}/`);
}

async function main() {
  console.log(`Regenerating ${JOBS.length} BGs for Day 12 + Day 40 at 1:1…`);
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
