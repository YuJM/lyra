/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: ["@repo/eslint-config/react.js", "plugin:storybook/recommended"],
  overrides: [
    {
      files: ["src/stories/**/*.tsx", "src/stories/**/*.ts"],
      parserOptions: {
        project: "./tsconfig.stories.json",
      },
    },
  ],
};
