module.exports = {
  "parser": "@typescript-eslint/parser",
  "extends": [
    "next/core-web-vitals",
    "prettier",
    "prettier/@typescript-eslint"
  ],
  "plugins": [
    "import",
    "prettier"
  ],
  "parserOptions": {
    "ecmaVersion": 2020,
    "sourceType": "module"
  },
  "rules": {
    "import/no-default-export": "off"
  }
}
