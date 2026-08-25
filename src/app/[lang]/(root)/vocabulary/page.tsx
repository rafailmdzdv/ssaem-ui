import { getWords } from "@/app/[lang]/queries";
import WordList from "@/components/vocabulary/WordList";

export default async function Page() {
  const words = []; // await getWords();

  return (
    <div className="flex h-full w-full items-start justify-center p-6">
      <WordList words={words} />
    </div>
  );
}
