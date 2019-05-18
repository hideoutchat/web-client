module.exports = {
  env: {
    browser: true,
    es6: true
  },
  extends: [
    'eslint:recommended',
    'plugin:ante/recommended',
    'plugin:ante/style',
    'plugin:react/recommended'
  ],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      jsx: true
    },
    ecmaVersion: 6,
    sourceType: 'module'
  },
  plugins: [
    'eslint-plugin-ante',
    'eslint-plugin-react'
  ],
  rules: {
    'id-blacklist': [
      'error',
      'e',
      'err',
      'evt',
      'req',
      'res'
    ]
  },
  settings: {
    react: {
      version: '16.0'
    }
  }
};
