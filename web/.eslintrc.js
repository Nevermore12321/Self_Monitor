module.exports = {
    env: {
        browser: true,
        es6: true,
        node: true,
        commonjs: true,
    },
    extends: [ 'airbnb', 'prettier' ],
    parser: 'babel-eslint',
    parserOptions: {
        sourceType: 'module',
        ecmaVersion: 8,
        ecmaFeatures: {
            jsx: true,
            impliedStrict: true, // enable global strict mode
        },
    },
    plugins: [ 'react', 'react-hooks', 'prettier' ],
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'react/prefer-stateless-function': 0, // 关闭react默认的props-type验证
        'react/jsx-closing-bracket-location': 'off',
        'consistent-return': 'off',
        // 关闭使用解构赋值的检测
        'react/destructuring-assignment': [ 0, 'always' ],
        // 解决require报错问题
        'import/no-extraneous-dependencies': [ 'error', { devDependencies: true } ],
        'react/jsx-wrap-multilines': 'off',
        'jsx-a11y/no-static-element-interactions': 0,
        'jsx-a11y/click-events-have-key-events': 0,

        'semi': 1, // 行末分号，根据编码习惯选择添加，这里配置的不加分号
        'comma-dangle': [ 2,'always-multiline' ],
        'max-len': 0,
        'space-before-function-paren': [ 0,'always' ],
        'no-unused-expressions': [
            0,
            {
                'allowShortCircuit': true,
                'allowTernary': true,
            },
        ],
        'arrow-body-style': [ 0, 'never' ],
        'func-names': 0,
        // "prefer-const": 0,
        'no-extend-native': 0,
        // 'no-param-reassign': 0,
        'no-restricted-syntax': 0,
        'no-eval': 0,
        'no-continue': 0,
        'no-unused-vars': [
            0,
            {
                'ignoreRestSiblings': true,
            },
        ],
        // 'no-underscore-dangle': 0,
        'global-require': 0,
        'import/prefer-default-export': 0,
        // "import/no-unresolved": 0,
        'import/extensions': 0,
        // react
        'react/jsx-first-prop-new-line': 0,
        'react/jsx-filename-extension': 0,
        'react/jsx-no-bind': 0,
        // 'react/no-array-index-key': 0,
        'react/forbid-prop-types': 0,
        'react/no-string-refs': 0,
        'react/no-find-dom-node': 0,
        'react/no-danger': 0,
        'react/display-name': 0,
        'react/no-deprecated': 0,
        'react/no-direct-mutation-state': 0,
        'jsx-a11y/href-no-hash': 0,

        'react/jsx-uses-react': 2,
        'react/jsx-uses-vars': 2,
        // "react/jsx-in-jsx-scope": 2,
        // "indent": ["error", "tab"],
        'indent': [ 'off', 4 ],
        'react/jsx-indent-props': [ 2, 4 ],
        'react/jsx-indent': [ 2, 4 ],
        // "react/jsx-filename-extension": [ 1, { "extensions": [".js", ".jsx"] } ],
        'no-tabs': 'off', // 禁止缩进错误

        'guard-for-in': 0,

        'linebreak-style': 0,
        'react/prop-types': 1, // 开启PropTypes验证
        'react/jsx-one-expression-per-line': 0,
        'react-hooks/rules-of-hooks': 'error', // 检查 Hook 的规则
        'react-hooks/exhaustive-deps': 'warn', // 检查 effect 的依赖
        'import/no-unresolved': [ 1, { ignore: [ '^@/' ] } ],

        'space-in-parens': [ 0, 'always' ],
        'template-curly-spacing': [ 2, 'always' ],
        'array-bracket-spacing': [ 2, 'always' ],
        'object-curly-spacing': [ 2, 'always' ],
        'computed-property-spacing': [ 2, 'always' ],
        'no-multiple-empty-lines': [ 2, { 'max': 1, 'maxEOF': 0, 'maxBOF': 0 } ],
        'quotes': [ 1, 'single', 'avoid-escape' ],
        'no-use-before-define': [ 2, { 'functions': false } ],
        'prefer-const': 0,
        'react/prefer-es6-class': 0,
        'react/jsx-curly-spacing': [ 2, 'always' ],
        // "react/jsx-indent": [ 2, 4 ],
        'react/no-array-index-key': [ 1 ],
        'class-methods-use-this': [ 1 ],
        'no-undef': [ 1 ],
        'no-case-declarations': [ 1 ],
        'no-return-assign': [ 1 ],
        'no-param-reassign': [ 1 ],
        'no-shadow': [ 1 ],
        'camelcase': [ 1 ],
        'no-underscore-dangle' : [ 0, 'always' ],
        'max-classes-per-file': [ 1, 5 ],
        'react/require-default-props': 0,
        'react/jsx-props-no-spreading': 'off',
    },
};