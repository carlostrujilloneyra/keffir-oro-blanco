// eslint-disable-next-line no-undef
module.exports = {
  env: {
    browser: true,
    es2022: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:jsx-a11y/recommended',
    'plugin:@next/next/recommended',
    'plugin:@typescript-eslint/recommended', // Añadir las recomendaciones de TypeScript
  ],
  settings: {
    react: {
      version: 'detect',
    },
  },
  parser: '@typescript-eslint/parser', // Usar el parser de TypeScript
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
    ecmaFeatures: { jsx: true },
    project: './tsconfig.json',
  },
  plugins: ['react', '@typescript-eslint', '@next/eslint-plugin-next'], // Incluir el plugin de TypeScript
  rules: {
    'no-unused-vars': 'off', // Desactivar la regla base
    '@typescript-eslint/no-unused-vars': ['warn', { varsIgnorePattern: 'wo' }], // Usar la regla de TypeScript
    'no-mixed-spaces-and-tabs': 'error',
    'no-useless-escape': 'off',
    'react/jsx-uses-vars': 'error',
    'no-duplicate-imports': 'error',
    'no-eval': 'error',
    'no-multiple-empty-lines': 'error',
    /*   camelcase: ['error', { properties: 'never' }], */
  },
};

// Instalar:
// npm install eslint eslint-plugin-react eslint-plugin-jsx-a11y @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint-config-next --save-dev
