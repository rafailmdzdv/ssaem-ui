"use client";

import { type Messages, setupI18n } from "@lingui/core";
import { I18nProvider } from "@lingui/react";
import { useState } from "react";

export function LinguiClientProvider({
  initialLocale,
  initialMessages,
  children,
}: {
  initialLocale: string;
  initialMessages: Messages;
  children: React.ReactNode;
}) {
  const [i18n] = useState(() => {
    return setupI18n({
      locale: initialLocale,
      messages: { [initialLocale]: initialMessages },
    });
  });
  return <I18nProvider i18n={i18n}>{children}</I18nProvider>;
}
