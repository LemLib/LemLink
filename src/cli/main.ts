import yargs from "yargs";
import { standalone } from "../../config.json";
import { SelfUpdateUtility } from "./update";

if (standalone) SelfUpdateUtility.init();

yargs(process.argv.slice(2)).command(
  "update",
  "update",
  {
    url: {
      alias: "u",
      describe: "the URL to download the new executable from",
    },
  },
  async (argv) => {
    if (typeof argv.url === "string")
      await SelfUpdateUtility.get().updateCLI(argv.url);
  },
);
