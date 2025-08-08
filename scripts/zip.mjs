import { createWriteStream } from "node:fs";
import { stat, readdir } from "node:fs/promises";
import path from "node:path";
import archiver from "archiver";

const out = createWriteStream(path.resolve("BF6COMPAPP.zip"));
const archive = archiver("zip", { zlib: { level: 9 } });

archive.on("error", err => { throw err; });
archive.pipe(out);

async function addDir(dir, base = "") {
  const items = await readdir(dir, { withFileTypes: true });
  for (const it of items) {
    const full = path.join(dir, it.name);
    const rel = path.join(base, it.name);
    if (it.isDirectory()) {
      await addDir(full, rel);
    } else {
      archive.file(full, { name: rel });
    }
  }
}

(async () => {
  const root = process.cwd();
  const skip = new Set(["node_modules", ".git", "BF6COMPAPP.zip"]);
  const top = await readdir(root, { withFileTypes: true });
  for (const it of top) {
    if (skip.has(it.name)) continue;
    const full = path.join(root, it.name);
    const st = await stat(full);
    if (st.isDirectory()) {
      await addDir(full, it.name);
    } else {
      archive.file(full, { name: it.name });
    }
  }
  await archive.finalize();
  console.log("Created BF6COMPAPP.zip");
})();
