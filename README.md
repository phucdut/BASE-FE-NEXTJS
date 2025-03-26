# 🚀 BASE-FE-NEXTJS

Base project structure for **Next.js** with modern technologies like **TypeScript, Redux Toolkit, React Query, Next-Intl, Zod, Axios, and more**.

## 📌 Features

- **⚡ Next.js** (App Router)
- **🎨 TailwindCSS + ShadCN** (Modern UI components)
- **🌎 Next-Intl** (Internationalization)
- **🔗 React Query** (Data fetching and caching)
- **🔒 Redux Toolkit + Persist** (State management)
- **✅ Zod** (Schema validation)
- **📡 Axios** (API calls with error handling)
- **🔥 ESLint & Prettier** (Code formatting & linting)

---

## 📂 Project Structure

```
BASE-FE-NEXTJS/
├── api/
│   ├── axios.ts                 # Axios instance
│   ├── endpoints.ts             # API endpoints
│   ├── services/
│   │   ├── auth.ts              # Auth service
│   │   ├── user.ts              # User service
│   ├── queries/
│   │   ├── authQueries.ts       # React Query for auth
│   │   ├── userQueries.ts       # React Query for user
│
├── app/
│   ├── [locale]/
│   │   ├── layout.tsx           # Layout wrapper
│   │   ├── page.tsx             # Root page
│   │   ├── not-found.tsx        # 404 Page
│   │   ├── (protected)/         # Protected routes
│   │   │   ├── (routes)/
│   │   │   │   ├── login/
│   │   │   │   │   ├── page.tsx # Login page
│   │   │   │   │   ├── LoginForm.tsx # Login form (React Query)
│   │   ├── api(server-side)/    # API routes (server-side)
│   │   │   ├── auth/
│   │   │   │   ├── [...nextauth]/route.ts # NextAuth config
│   ├── config.ts                # App config
│   ├── eventBus.ts              # Global event bus
│   ├── globals.css              # Global styles
│
├── components/
│   ├── ui/                      # Reusable UI components (Button, Modal, Card...)
│   ├── layout/                  # Layout components (Header, Sidebar, Footer)
│   ├── form/                    # Form components (Input, Select)
│   ├── i18n.tsx                 # Internationalization setup
│
├── features/                    # Feature-based components
│   ├── auth/                    # Auth-related components
│
├── lib/
│   ├── redux/
│   │   ├── features/
│   │   │   ├── userSlice.ts    # Redux slice for user state
│   │   ├── store.ts            # Redux store setup
│   ├── requests.ts              # API request handlers
│   ├── utils.ts                 # Utility functions
│
├── hooks/                       # Custom hooks
│   ├── useAuth.ts                # Authentication hook
│   ├── useTheme.ts               # Theme switcher hook
│
├── messages/                    # Language files
│   ├── en.json
│   ├── vi.json
│
├── providers/                   # React Providers
│   ├── QueryProvider.tsx         # React Query provider
│
├── schemas/                     # Zod schema validation
│   ├── auth.schema.ts            # Auth validation schema
│
├── public/                       # Static assets
├── .gitignore
├── next-env.d.ts
├── next.config.ts
├── package.json
├── package-lock.json
├── postcss.config.mjs
├── README.md
├── tsconfig.json
```

---

## 🌍 i18n (Internationalization)

This project uses **next-intl** to support multiple languages. The translations are defined in the `messages/` directory as JSON files containing localized content.

### ✅ Installing `next-intl`

```sh
npm install next-intl
```

### 📌 Configuring Routing with `next-intl`

In `app/routing.ts`, we configure supported `locales` and `pathnames` as follows:

```ts
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
```

### 📂 Managing Translation Files

Create a `messages/` directory and add JSON files for each language:

```json
// messages/en.json
{
  "home.title": "Welcome to our website",
  "home.description": "This is a modern Next.js boilerplate"
}
```

```json
// messages/vi.json
{
  "home.title": "Chào mừng bạn đến với trang web của chúng tôi",
  "home.description": "Đây là một boilerplate Next.js hiện đại"
}
```

### 🔧 Using i18n in Components

Example usage in a Next.js component:

```tsx
import { useTranslations } from "next-intl";

export default function HomePage() {
  const t = useTranslations("home");
  return (
    <div>
      <h1>{t("title")}</h1>
      <p>{t("description")}</p>
    </div>
  );
}
```

## 📦 Required Dependencies

Before running the project, ensure you have installed the following dependencies:

```sh
npx shadcn@latest init
npm install next-intl
npm install zod
npm install axios
npm install @tanstack/react-query
npm install sonner
npm install react-hook-form
npm install @reduxjs/toolkit
npm install redux-persist @types/redux-persist
npm install next-themes
```

---

## 🛠️ Installation

### 1️⃣ Clone the repository

```sh
git clone https://github.com/phucdut/BASE-FE-NEXTJS.git
cd BASE-FE-NEXTJS
```

### 2️⃣ Install dependencies

```sh
npm install  # or yarn install
```

### 3️⃣ Run the development server

```sh
npm run dev  # or yarn dev
```

---

## 🚀 Tech Stack

| Technology            | Description                    |
| --------------------- | ------------------------------ |
| **Next.js**           | React framework with SSR & SSG |
| **TypeScript**        | Type-safe JavaScript           |
| **Redux Toolkit**     | State management               |
| **React Query**       | Fetching & caching data        |
| **Zod**               | Schema validation              |
| **TailwindCSS**       | Utility-first CSS framework    |
| **ShadCN**            | Pre-built UI components        |
| **Next-Intl**         | Internationalization           |
| **Axios**             | HTTP requests                  |
| **ESLint & Prettier** | Code linting & formatting      |

---

## 🔥 ESLint & Prettier Setup

### Install dependencies

```sh
npm install --save-dev eslint eslint-config-next
```

### ESLint Config (`eslint.config.mjs`)

```js
import { FlatCompat } from "@eslint/eslintrc";
import pluginJs from "@eslint/js";
import eslintPluginImport from "eslint-plugin-import";
import pluginReact from "eslint-plugin-react";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import tseslint from "typescript-eslint";

const compat = new FlatCompat();

export default [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  { files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"] },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    settings: {
      react: { version: "detect" },
      "import/resolver": {
        typescript: { alwaysTryTypes: true, project: "./tsconfig.json" },
      },
    },
    plugins: {
      import: eslintPluginImport,
      "simple-import-sort": simpleImportSort,
    },
    rules: {
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      "@typescript-eslint/no-unused-vars": "warn",
      "simple-import-sort/imports": ["error"],
    },
  },
];
```

### Run ESLint

```sh
npm run lint -- --fix
```

---

## 🌙 Dark Mode with ShadCN UI

### Setup Dark Mode Provider

1. Install next-themes:

```sh
npm install next-themes
```

2. Create a ThemeProvider in `providers/theme-provider.tsx`:

```tsx
"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
```

3. Add Provider to your layout:

```tsx
// app/[locale]/layout.tsx
import { ThemeProvider } from "@/providers/theme-provider";

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
```

### Add Theme Toggle

Create a theme toggle component:

```tsx
"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    </Button>
  );
}
```

---

## 🎯 Conclusion

✅ **Fully structured Next.js boilerplate** with best practices.
✅ **Supports TypeScript, Redux Toolkit, React Query, and Zod.**
✅ **Pre-configured ESLint, Prettier, and Next-Intl.**
✅ **Ready for production!** 🚀

Enjoy coding! 🎉
