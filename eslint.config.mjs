import antfu from '@antfu/eslint-config'

export default antfu(
  {
    ignores: [
      '**/*.json',
    ],
  },
  {
    rules: {
      'no-console': 'off',
      'curly': 'off',
      'style/brace-style': ['error', '1tbs', { allowSingleLine: true }],
      'unused-imports/no-unused-vars': 'warn',
    },
  },
)
