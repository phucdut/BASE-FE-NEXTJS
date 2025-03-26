"use client";

import LanguageSwitcher from "@/components/ui/language-switcher-icon";
import { ModeToggle } from "@/components/ui/mode-toggle";

export default function ProfileButton() {
  return (
    <div className="flex items-center gap-2">
      <LanguageSwitcher />
      <ModeToggle />
    </div>
  );
}
