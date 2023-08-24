module.exports = {
  "env": {
    "browser": true,
    "es2021": true,
    "node": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:vue/vue3-recommended",
    "@vue/typescript/recommended"
  ],
  "parserOptions": {
    "ecmaVersion": "latest",
    "parser": "@typescript-eslint/parser",
    "sourceType": "module"
  },
  "rules": {
    'vue/html-self-closing': 'off', // 标签自闭和形式
    'vue/max-attributes-per-line': 'off', // 属性排列方式
    'vue/singleline-html-element-content-newline': 'off', // 文本长度换行
    'vue/multi-word-component-names': 'off', // 组件命名规则
  },
  global: {
    defineProps: "readonly",
    defineOptions: 'readonly'
  }
}
