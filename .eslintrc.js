module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "standard-with-typescript",
    "prettier",
  ],
  //   overrides: [
  //     {
  //       env: {
  //         node: true,
  //       },
  //       files: [".eslintrc.{js,cjs}"],
  //       parserOptions: {
  //         sourceType: "script",
  //       },
  //     },
  //   ],
  parser: "@typescript-eslint/parser",
  //   parserOptions: {
  //     ecmaVersion: "latest",
  //   },
  plugins: ["@typescript-eslint"],
  rules: {},
};
