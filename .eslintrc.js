module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    env: {
      browser: true,
      node: true,    
      es6: true
    },
    plugins: [
      '@typescript-eslint',
    ],
    extends: [
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
    ],
    "rules": {
        'eqeqeq': 'error'
    }
  };