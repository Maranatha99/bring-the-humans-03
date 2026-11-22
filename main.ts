// A working bring-the-humans-03 entry (Node 22, standard library only).
// It copies VIDEO.json from the repository root to /output/VIDEO.json,
// where the gate reads it. That is all the program has to do: the entry
// is the video itself. The ad was made by an AI agent in the recorded
// session that built this repository: four AI-drawn scenes in make.fun's
// magenta world, an Indonesian voiceover, on-screen text, the make.fun
// brand badge from the first frame and the referral end card with our
// referral code, all rendered with ffmpeg from the press pack
// (https://make.fun/press/manifest.json). The video is posted publicly
// on TikTok from a public account (@irvkandji99) with the bounty's line
// and our play code in its caption; VIDEO.json names the video, and the
// house reads the video's views from TikTok. Places go by views, most
// first; the top 20 share $500. Only views from real people count.
//
// VIDEO.json here holds a placeholder address until the video is posted;
// replace it with the video's full TikTok address before submitting.

import { copyFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const BOT_DIR = process.env.MAKEFUN_BOT_DIR ?? "/bot";
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

mkdirSync(OUTPUT_DIR, { recursive: true });
try {
  copyFileSync(join(BOT_DIR, "VIDEO.json"), join(OUTPUT_DIR, "VIDEO.json"));
} catch (err) {
  console.error(
    `VIDEO.json could not be copied from ${BOT_DIR}: ${(err as Error).message}`,
  );
  process.exit(1);
}
