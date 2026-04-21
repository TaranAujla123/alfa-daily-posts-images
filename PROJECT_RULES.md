# Project Rules — Must Apply to Every Render

These rules override any specific prompt language. When a rule conflicts with the prompt, the rule wins.

## ALWAYS — dual output (non-negotiable)

Every image, every quote.md, every final PNG is saved to **TWO locations** in the same operation. No exceptions.

1. **GitHub repo:** `C:\Users\Owner\alfa-daily-posts-images\samples\day-N\`
2. **Local working folder:** `C:\Users\Owner\ALFA REBUILD\MARKETING\IG Posts\POST IMAGES\day-N\`

When the post-pipeline is used, a **third** output goes to:

3. **Pipeline static assets:** `C:\Users\Owner\ALFA REBUILD\CLAUDE CODE\post-pipeline\public\bg-day-N\`

Generator scripts handle this tri-mirror automatically. For quote.md and final PNGs that I write manually, copy to both primary locations every time. Never ship to the repo without mirroring to POST IMAGES.

## Eye contact

- **No person in any image may look directly at the camera** unless Taran explicitly instructs otherwise for a specific shot.
- Acceptable: profile, three-quarter, looking away, looking at another person in the scene, eyes closed, eyes downcast, shot from behind.
- Unacceptable: smiling or speaking toward the lens, glass raised toward the lens, any "talking to the viewer" composition.
- The reason: these posts carry the teaching, not the subject. The subject is **in** a scene, never performing **for** a scene.

## Brand + tone

- Dark, moody, grounded, masculine. Warm amber highlights, cool deep shadows.
- No generic wellness iconography (lotus, sunrise silhouettes-with-arms-raised, yoga poses, stock-photo smiles).
- No emojis, no light / bright / airy backgrounds.
- 35mm film stock, cinematic stills, photographic realism.

## Text

- No baked-in text, words, logos, captions, watermarks, or typography in any image.
- Sign text inside the world (e.g. a liquor-store sign in a street scene) is acceptable because it's part of the scene, not overlay.

## Subject behavior

- Men pictured are in their late 30s to mid-50s, grounded, lived-in features, not models.
- Confidence shown through posture and quiet presence, not through poses-for-camera.
- Never pity, victimhood, or performative struggle. Ownership and choice only.

## Composition defaults

- Aspect ratio: `9:16` (1080×1920 portrait) — crops cleanly to IG 1080×1350 or center-cropped to 1080×1080.
- Shallow depth of field unless the scene requires otherwise.
- Subject off-center rule-of-thirds unless a centered composition is intentional (e.g. a single hero object).

## Output locations

Every render is saved to **both** locations:

1. **Repo:** `alfa-daily-posts-images/samples/day-N/`
2. **Local:** `C:\Users\Owner\ALFA REBUILD\MARKETING\IG Posts\POST IMAGES\day-N\`

`quote.md` is authored alongside each day's images in both locations.
