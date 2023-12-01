import { renameSync, unlinkSync, createWriteStream, existsSync } from "fs";
import child_process = require("child_process");
import { get as httpGet, type IncomingMessage } from "http";
import { standalone } from "../../config.json";

/**
 * self updates the cli executable
 * @warning DO NOT USE THIS IF NOT PART OF STANDALONE EXECUTABLE
 */
export class SelfUpdateUtility {
  /**
   * So how the heck does this CLI update itself?
   *
   * 1. Attempt to download new executable from downloadUrl to newPath
   * 2. Rename current executable to oldPath
   * 3. Rename newly downloaded executable to filePath
   * 4. On startup of the cli, we attempt to remove oldPath
   */

  protected readonly filePath: string; // normal executable path
  protected readonly newPath: string; // the new executable that will be downloaded
  protected readonly oldPath: string;

  private static singleton?: SelfUpdateUtility;
  /**
   * self updates the cli executable
   * @warning DO NOT USE THIS IF NOT PART OF STANDALONE EXECUTABLE
   */
  private constructor() {
    if (!standalone)
      throw new Error(
        "LemLink is not part of a standalone executable, and thus cannot self update",
      );
    const nodeExecutablePath = process.env._;
    if (nodeExecutablePath === undefined) {
      throw new Error("Could not find node executable path");
    }

    this.filePath = nodeExecutablePath;
    this.newPath = this.filePath + "-new";
    this.oldPath = this.filePath + "-old";

    this.attemptToDeleteOldPathFile();
  }

  /**
   * Should be run at the start of CLI program
   */
  public static init(): void {
    if (this.singleton !== undefined) {
      console.error(
        "Self Update Utility has already been initialized, canceling init..",
      );
      return;
    }
    this.singleton = new SelfUpdateUtility();
  }

  public static get(): SelfUpdateUtility {
    if (this.singleton === undefined)
      throw new Error(
        "Self Update Utility was not initialized at the start of CLI program!!",
      );
    return this.singleton;
  }

  /**
   * @returns true if oldPath exists, false if otherwise
   */
  private attemptToDeleteOldPathFile(): boolean {
    if (existsSync(this.oldPath)) {
      unlinkSync(this.oldPath);
      return true;
    }
    return false;
  }

  /**
   * Replaces the current CLI executable with the one found at {@link downloadUrl}
   * @param downloadUrl url from which a new executable should be downloaded
   */
  public async updateCLI(downloadUrl: string): Promise<void> {
    /**
     * See top of this file for info on how this works
     */
    console.log("Downloading new file...");
    const fileStream = createWriteStream(this.newPath);

    const response = await new Promise<IncomingMessage>((resolve) =>
      httpGet(downloadUrl, resolve),
    );

    response.pipe(fileStream);
    await new Promise((resolve) => fileStream.on("finish", resolve));
    fileStream.close();

    console.log("File downloaded successfully.");

    console.log("Replacing current file...");
    renameSync(this.filePath, this.oldPath);
    renameSync(this.newPath, this.filePath);
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
}
