// eslint-disable-next-line no-undef
module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:jsx-a11y/recommended',
  ],
  settings: {
    react: {
      version: 'detect',
    },
  },
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
    ecmaFeatures: { jsx: true },
    project: './tsconfig.json',
  },
  plugins: ['react'],
  rules: {
    'no-unused-vars': ['warn', { varsIgnorePattern: 'wo' }],
    'no-mixed-spaces-and-tabs': 'error',
    'no-useless-escape': 'off',
    'react/jsx-uses-react': 'error',
    'react/jsx-uses-vars': 'error',
    'no-duplicate-imports': 'error',
    'no-eval': 'error',
    'no-multiple-empty-lines': 'error',
    camelcase: ['error', { properties: 'never' }],
  },
}
