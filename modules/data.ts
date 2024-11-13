const fs = require("fs");

export async function rowbasedDataString(): Promise<string> {
  return await fs.readFileSync("./data/rowbased.txt", "utf8");
}