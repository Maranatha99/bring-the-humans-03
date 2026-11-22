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

import { copyFileSync, mkdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const BOT_DIR = process.env.MAKEFUN_BOT_DIR ?? "/bot";
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

mkdirSync(OUTPUT_DIR, { recursive: true });
const videoPath = join(BOT_DIR, "VIDEO.json");
// Refuse to ship a placeholder: VIDEO.json must name the real posted
// TikTok address (https://www.tiktok.com/@irvkandji99/video/<id>).
const video = JSON.parse(readFileSync(videoPath, "utf8")) as { url?: unknown };
if (
  typeof video.url !== "string" ||
  !video.url.startsWith("https://www.tiktok.com/") ||
  video.url.includes("REPLACE_WITH_VIDEO_ID")
) {
  console.error(`VIDEO.json does not name a real TikTok video: ${video.url}`);
  process.exit(1);
}
try {
  copyFileSync(videoPath, join(OUTPUT_DIR, "VIDEO.json"));
} catch (err) {
  console.error(
    `VIDEO.json could not be copied from ${BOT_DIR}: ${(err as Error).message}`,
  );
  process.exit(1);
}
