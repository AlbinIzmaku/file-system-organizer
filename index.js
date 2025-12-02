import * as readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import * as fs from "node:fs/promises";
import path from "node:path";
import os from "node:os";

const rl = readline.createInterface({ input, output });

async function askForValidPath() {
  while (true) {
    const userPath = await rl.question("Please give the path: ");

    try {
      await fs.access(userPath);
      const stats = await fs.stat(userPath);

      if (!stats.isDirectory()) {
        console.error("❌ The provided path is not a directory.\n");
        continue;
      }

      return userPath;
    } catch (err) {
      console.error("❌ The provided path does not exist.\n");
    }
  }
}

const userPath = await askForValidPath();

const documentExt = [".pdf", ".docx", ".txt", ".xlsx"];

const imageExt = [
  ".apng",
  ".png",
  ".avif",
  ".gif",
  ".jpg",
  ".jpeg",
  ".jfif",
  ".pjpeg",
  ".pjp",
  ".svg",
  ".webp",
];

const videoExt = [
  ".mp4",
  ".mov",
  ".wmv",
  ".avi",
  ".mkv",
  ".webm",
  ".flv",
  ".m4v",
  ".mpeg",
  ".mpg",
];

const home = os.homedir();
const documentsDir = path.join(home, "documents");
const imagesDir = path.join(home, "images");
const videosDir = path.join(home, "videos");
const othersDir = path.join(home, "others");

await fs.mkdir(documentsDir, { recursive: true });
await fs.mkdir(imagesDir, { recursive: true });
await fs.mkdir(videosDir, { recursive: true });
await fs.mkdir(othersDir, { recursive: true });

const files = await fs.readdir(userPath);

for (const file of files) {
  const filePath = path.join(userPath, file);
  const stats = await fs.stat(filePath);
  if (!stats.isFile()) continue;

  const ext = path.extname(file).toLowerCase();

  if (documentExt.includes(ext)) {
    await fs.rename(filePath, path.join(documentsDir, file));
  } else if (imageExt.includes(ext)) {
    await fs.rename(filePath, path.join(imagesDir, file));
  } else if (videoExt.includes(ext)) {
    await fs.rename(filePath, path.join(videosDir, file));
  } else {
    await fs.rename(filePath, path.join(othersDir, file));
  }
}

console.log("✅ Files organized successfully!");
rl.close();
