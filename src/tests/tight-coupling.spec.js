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

const rule = require('../rules/tight-coupling');
const message = 'Pass dependency through constructor';

ruleTester.run('tight-coupling', rule, {
    invalid: [
        { code: `class Class { logger = new Logger() }`, errors: [{ message }] },
    ],
    valid: [
        { code: `class Class { }` },
        { code: `class Class { constructor(logger) { } }` },
        { code: `class Class { logger = new FancyLogger() }`, options: ['FancyLogger'] },

    ],
});
