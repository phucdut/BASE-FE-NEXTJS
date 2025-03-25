import { FlatCompat } from "@eslint/eslintrc";
import pluginJs from "@eslint/js";
import eslintPluginImport from "eslint-plugin-import";
import pluginReact from "eslint-plugin-react";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import tseslint from "typescript-eslint";

// Tạo FlatCompat để hỗ trợ định dạng cũ
const compat = new FlatCompat();

// Kết hợp cấu hình Next.js với các quy tắc nâng cao
const config = [
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
      node: { extensions: [".js", ".jsx", ".ts", ".tsx", ".svg"] },
    },
    plugins: {
      import: eslintPluginImport,
      "simple-import-sort": simpleImportSort,
    },
    rules: {
      "@typescript-eslint/no-explicit-any": "warn",
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      "@typescript-eslint/no-unused-vars": "warn",
      "simple-import-sort/imports": [
        "error",
        {
          groups: [["^node:.*", "^@?\\w"], ["^@/"], ["^.+\\.s?css$"]],
        },
      ],
      "sort-imports": [
        "error",
        {
          ignoreCase: false,
          ignoreDeclarationSort: true,
          ignoreMemberSort: true,
          memberSyntaxSortOrder: ["none", "single", "multiple", "all"],
          allowSeparatedGroups: true,
        },
      ],
    },
  },
];

export default config;
