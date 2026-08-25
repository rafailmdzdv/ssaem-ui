import { getGrammars } from "@/app/[lang]/queries";
import GrammarList from "@/components/grammars/GrammarList";

export default async function Page() {
  const grammars = []; // await getGrammars();

  return (
    <div className="flex h-full w-full items-start justify-center p-6">
      <GrammarList grammars={grammars} />
    </div>
  );
}
