import { redirect } from "next/navigation";
import { getLocale } from "next-intl/server";

export default function RootPage() {
  const locale = getLocale();
  redirect(`/${locale}/home`);
}
