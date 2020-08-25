module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module'
  },
  plugins: ['@typescript-eslint/eslint-plugin', 'only-warn'],
  extends: [
    'airbnb-typescript/base',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'prettier/@typescript-eslint'
  ],
  root: true,
  env: {
    node: true,
    jest: true
  },
  rules: {
    'import/no-extraneous-dependencies': 0,
    'import/prefer-default-export': 0,
    'class-methods-use-this': 0,
    'import/no-cycle': 0,
    semi: 1,
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    indent: ['warn', 2, { SwitchCase: 1 }],
    'eol-last': ['warn', 'always'],
    'lines-between-class-members': ['warn', 'always'],
    'comma-dangle': ['warn', 'never'],
    quotes: 'off',
    '@typescript-eslint/quotes': ['warn'],
    'key-spacing': ['warn', { beforeColon: false }],
    'space-infix-ops': ['error', { int32Hint: false }],
    'no-irregular-whitespace': 1,
    'no-multi-spaces': 1,
    'no-multiple-empty-lines': 1,
    'no-trailing-spaces': 1,
    'comma-spacing': 1,
    'array-bracket-spacing': 1,
    'object-curly-spacing': 1,
    '@typescript-eslint/explicit-module-boundary-types': 'off'
  }
};
