import { getAllGrammars } from "@/app/[lang]/queries";
import AddGrammarDialog from "@/components/grammars/AddGrammarDialog";
import initLingui from "@/initLingui";

export default async function Page({
  params,
}: Readonly<{ params: Promise<{ lang: string }> }>) {
  const lang = (await params).lang;
  initLingui(lang);
  const grammars = await getAllGrammars();

  return (
    <div className="flex h-full w-full items-center justify-center p-6">
      <AddGrammarDialog grammars={grammars} />
    </div>
  );
}
