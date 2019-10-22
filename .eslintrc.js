// https://eslint.org/docs/user-guide/configuring

module.exports = {
    root: true,
    parserOptions: {
        parser: '@typescript-eslint/parser',
        ecmaFeatures: {
            jsx: true
        }
    },
    env: {
        browser: true,
        jest: true
    },
    extends: [
        'plugin:react/recommended',
        // https://github.com/standard/standard/blob/master/docs/RULES-en.md
        'standard'
    ],
    plugins: [
        '@typescript-eslint',
        'react'
    ],
    // add your custom rules here
    rules: {
        // allow async-await
        'indent': 'off',
        'generator-star-spacing': 'off',
        'no-undef': 'error',
        // allow debugger during development
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'space-before-function-paren': 'off'
    }
}
