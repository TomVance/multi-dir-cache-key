import fh from "folder-hash";
import core from "@actions/core";
import fs from "node:fs";

async function start() {
  try {
    const dirs = core.getMultilineInput("parts", {
      required: true,
    });

    const parts = [];
    for (const dir of dirs) {
      if (!fs.existsSync(dir)) {
        throw new Error(`${dir} directory does not exist`);
      }

      const { hash } = await fh.hashElement(dir);
      parts.push(hash);
    }

    core.setOutput("hash", parts.join(""));
  } catch (e) {
    core.setFailed((e as Error).message);
  }
}

start().catch((err) => {
  console.error(err);
});
