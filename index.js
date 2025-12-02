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

const home = os.homedir();
const textsDir = path.join(home, "texts");
const imagesDir = path.join(home, "images");

await fs.mkdir(textsDir, { recursive: true });
await fs.mkdir(imagesDir, { recursive: true });

const files = await fs.readdir(userPath);

for (const file of files) {
  const filePath = path.join(userPath, file);
  const stats = await fs.stat(filePath);
  if (!stats.isFile()) continue;

  const ext = path.extname(file).toLowerCase();

  if (ext === ".txt") {
    await fs.rename(filePath, path.join(textsDir, file));
  } else if (ext === ".jpg") {
    await fs.rename(filePath, path.join(imagesDir, file));
  }
}

console.log("✅ Files organized successfully!");
rl.close();
