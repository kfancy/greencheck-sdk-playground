// eslint.config.js

import js from "@eslint/js";
import globals from "globals";
import tsParser from "@typescript-eslint/parser";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import reactPlugin from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import jsxA11y from "eslint-plugin-jsx-a11y";
import prettierRecommended from "eslint-plugin-prettier/recommended";

export default [
  {
    ignores: ["dist/**", "node_modules/**"],
  },

  js.configs.recommended,

  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parser: tsParser,
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
    },
    rules: {
      ...tsPlugin.configs.recommended.rules,
    },
  },

  reactPlugin.configs.flat.recommended,

  reactHooks.configs.flat.recommended,

  jsxA11y.flatConfigs.recommended,

  prettierRecommended,

  {
    files: ["**/*.{js,mjs,cjs,jsx,ts,tsx}"],

    languageOptions: {
      parser: tsParser,
      ecmaVersion: 2022,
      sourceType: "module",
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },

    settings: {
      react: {
        version: "detect",
      },
    },

    rules: {
      "prettier/prettier": ["error", { endOfLine: "auto" }],

      "@typescript-eslint/no-explicit-any": "off",
      "react/prop-types": "off",

      // sometimes TS path aliases confuse this rule
      "node/no-missing-import": "off",

      // explicit override
      "react-hooks/exhaustive-deps": "warn",
    },
  },
];
