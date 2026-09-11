import { XMLParser } from "fast-xml-parser";
import * as fs from "fs";

export default function parseXml(path) {
  const parser = new XMLParser({
    ignoreAttributes: false,
    parseAttributeValue: true,
    isArray: (tagName, jPath, isLeafNode, isAttribute) => {
      return tagName === "grammar";
    },
  });
  return parser.parse(fs.readFileSync(path, { encoding: "utf-8" }));
}
