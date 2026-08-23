import LanguageSelect from "@/components/layout/LanguageSelect";

export default function Footer({ lang }: Readonly<{ lang: string }>) {
  return (
    <footer className="p-3">
      <div className="flex w-full justify-end">
        <LanguageSelect lang={lang} />
      </div>
    </footer>
  );
}
