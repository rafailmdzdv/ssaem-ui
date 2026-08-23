"use client";

import { Trans } from "@lingui/react/macro";
import "flag-icons/css/flag-icons.min.css";
import { usePathname, useRouter } from "next/navigation";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const languages = [
  {
    value: "ru",
    label: (
      <div className="space-x-2">
        <span className="fi fi-ru" />
        <span>Русский</span>
      </div>
    ),
  },
  {
    value: "en",
    label: (
      <div className="space-x-2">
        <span className="fi fi-gb" />
        <span>English</span>
      </div>
    ),
  },
  {
    value: "kr",
    label: (
      <div className="space-x-2">
        <span className="fi fi-kr" />
        <span>한국어</span>
      </div>
    ),
  },
];

export default function LanguageSelect({ lang }: Readonly<{ lang: string }>) {
  const pathname = usePathname();
  const router = useRouter();
  function onValueChange(value: string | null) {
    const pathNameWithoutLocale = pathname?.split("/")?.slice(2) ?? [];
    const newPath = `/${value}/${pathNameWithoutLocale.join("/")}`;
    document.cookie = `NEXT_LOCALE=${value}; path=/; expiry=Session; SameSite=Lax`;

    router.push(newPath);
  }

  return (
    <Select items={languages} value={lang} onValueChange={onValueChange}>
      <SelectTrigger className="w-full max-w-48">
        <SelectValue placeholder={<Trans>Language</Trans>}></SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {languages.map((langOpts) => (
            <SelectItem key={langOpts.value} value={langOpts.value}>
              {langOpts.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
