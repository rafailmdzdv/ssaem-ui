"use server";
import parseXml from "../xml/parse";

type Grammar = {
  title: string;
  description: string;
};

async function krGrammars() {
  return parseXml("src/lib/data/krGrammars.xml").grammars.grammar as Grammar[];
}

export { krGrammars };
