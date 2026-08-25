import SentenceBuilder from "@/components/sentences/SentenceBuilder";

export default async function Page() {
  return (
    <div className="flex h-full flex-col items-center justify-center p-6 w-full">
      <SentenceBuilder />
    </div>
  );
}
