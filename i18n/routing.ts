import { createNavigation } from "next-intl/navigation";
import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "vi"],
  defaultLocale: "vi",
  localePrefix: {
    mode: "always",
    prefixes: {
      en: "/en",
      vi: "/vi",
    },
  },
  pathnames: {
    "/": "/",
    "/home": {
      en: "/home",
      vi: "/trang-chu",
    },
  },
});

export const { Link, redirect, usePathname, useRouter } =
  createNavigation(routing);
