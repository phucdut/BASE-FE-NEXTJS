import { NextIntlClientProvider } from "next-intl";
import { getLocale } from "next-intl/server";
import { Toaster } from "sonner";

import QueryProvider from "@/providers/QueryProvider";

import "@/app/globals.css";

interface RootLayoutProps {
  children: React.ReactNode;
}

export default async function ProtectedLayout({
  children,
}: Readonly<RootLayoutProps>) {
  const locale = await getLocale();

  let messages = {};
  try {
    messages = await import(`@/messages/${locale}.json`).then(
      (module) => module.default
    );
  } catch (err) {
    console.error("Failed to load messages for locale", err);
  }

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <QueryProvider>
        <Toaster richColors position="top-right" />
        {children}
      </QueryProvider>
    </NextIntlClientProvider>
  );
}
