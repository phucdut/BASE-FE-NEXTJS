"use client";

// Example for the USA flag
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { useState, useTransition } from "react";

// Import icon for flags
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

const LanguageSwitcher = () => {
  const router = useRouter();
  const localeActive = useLocale();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [selectedLanguage, setSelectedLanguage] = useState(() =>
    localeActive === "en" ? "English" : "Việt Nam"
  );
  const [isPending, startTransition] = useTransition();

  const t = useTranslations("language");

  const languages = [
    {
      label: "Việt Nam",
      value: "vi",
      icon: "/flag/Co-Vietnam.png",
    }, // Vietnam flag icon
    {
      label: "English",
      value: "en",
      icon: "/flag/co-anh.png",
    }, // UK flag icon
  ];

  const onLanguageChange = (nextLocale: string, label: string) => {
    setSelectedLanguage(label);
    startTransition(() => {
      const currentLocale = `/${localeActive}`;
      const newPathname = pathname.replace(currentLocale, `/${nextLocale}`);

      const query = searchParams.toString();
      const newUrl = `${newPathname}${query ? `?${query}` : ""}`;

      router.replace(newUrl);
    });
  };

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="">
            {isPending ? (
              t("loading")
            ) : (
              <span className="flex items-center justify-start gap-2 h-[60px]">
                <Image
                  className="h-4 w-6 rounded-sm bg-white"
                  src={
                    localeActive === "en"
                      ? "/flag/co-anh.png"
                      : "/flag/Co-Vietnam.png"
                  }
                  alt="Flag Icon"
                  width={1000}
                  height={1000}
                />
                {selectedLanguage}
              </span>
            )}
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="">
              {languages.map((lang) => (
                <li key={lang.value}>
                  {/* <NavigationMenuLink asChild> */}
                  <div
                    className="flex items-center justify-start gap-3 p-2 w-[130px] hover:bg-gray-100 rounded-md"
                    onClick={() => onLanguageChange(lang.value, lang.label)}
                  >
                    <Image
                      className="h-4 w-6 rounded-sm"
                      src={lang.icon}
                      alt="User Avatar"
                      width={100}
                      height={100}
                    />
                    <div>{lang.label}</div>
                  </div>
                  {/* </NavigationMenuLink> */}
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default LanguageSwitcher;
