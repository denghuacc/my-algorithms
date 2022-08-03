module.exports = {
  root: true,
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
  plugins: ["@typescript-eslint"],
  parser: "@typescript-eslint/parser",
  rules: {
    "@typescript-eslint/no-non-null-assertion": "off",
    "no-constant-condition": ["error", { checkLoops: false }],
    "prefer-const": [
      "error",
      {
        destructuring: "all",
        ignoreReadBeforeAssign: false,
      },
    ],
  },
  env: {
    browser: true,
    node: true,
  },
  overrides: [
    {
      files: ["leetcode/*/*.ts"],
      rules: {
        "no-irregular-whitespace": "off",
        "no-var": "off",
        "@typescript-eslint/no-unused-vars": "off",
      },
    },
  ],
};
