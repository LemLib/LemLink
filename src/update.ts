#!/usr/bin/env ts-node

import { renameSync, unlinkSync, createWriteStream } from "fs";
import child_process = require("child_process");
import { get as httpGet, type IncomingMessage } from "http";
import { standalone } from "../config.json";
if (!standalone)
  /**
   * self updates the cli executable
   * @warning DO NOT USE THIS IF NOT PART OF STANDALONE EXECUTABLE
   */
  module.exports = async function updateCLI(
    downloadUrl: string,
  ): Promise<void> {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const filePath = process.env._!;
    const newPath = filePath + "-new";
    const oldPath = filePath + "-old";
    try {
      console.log("attempting to delete old file");
      unlinkSync(oldPath);
    } catch (err) {
      console.log("Downloading new file...");
      const fileStream = createWriteStream(newPath);

      const response = await new Promise<IncomingMessage>((resolve) =>
        httpGet(downloadUrl, resolve),
      );

      response.pipe(fileStream);
      await new Promise((resolve) => fileStream.on("finish", resolve));
      fileStream.close();

      console.log("File downloaded successfully.");

      console.log("Replacing current file...");
      renameSync(filePath, oldPath);
      renameSync(newPath, filePath);
      console.log("Replaced current file successfully!");

      console.log("Restarting...");
      child_process.spawn(
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        process.argv.shift()!,
        process.argv,
        {
          cwd: process.cwd(),
          detached: true,
          stdio: "inherit",
          shell: true,
        },
      );
    }
  };
