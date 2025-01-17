import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";

export default [
  {
    files: ["**/*.{js,mjs,cjs,ts}"],
  },
  { ignores: ["dist/**/*"] },
  { languageOptions: { globals: globals.node } },
  {
    overrides: [
      {
        files: ["**/*.test.js"],
        env: {
          jest: true,
        },
      },
    ],
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  eslintPluginPrettierRecommended,
];
