const { RuleTester } = require('eslint');
const ruleTester = new RuleTester({
    parser: 'typescript-eslint-parser'
});
RuleTester.setDefaultConfig({
    parserOptions: {
        ecmaVersion: 2017,
        sourceType: 'module',
        ecmaFeatures: {},
    },
});

const rule = require('../rules/class-name');
const message = 'Do not use `Class` suffix in class names';

ruleTester.run('class-name', rule, {
    invalid: [
        { code: `class CatClass { }`, errors: [{ message, column: 7 }] },
        { code: `class Class { }`, errors: [{ message }] },
    ],
    valid: [
        { code: `class { }` },
        { code: `class Cat { }` },
    ],
});
