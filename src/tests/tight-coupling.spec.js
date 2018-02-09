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

const { rule } = require('./tight-coupling');
const message = '';

ruleTester.run('use-validation-pipe', rule, {
    invalid: [
        { code: `class { @Post() async create(@Body() createCatDto: CreateCatDto) { } }`, errors: [{ message }] },
    ],
    valid: [
        { code: `class { @Post() @UsePipes(new ValidationPipe()) async create(@Body() createCatDto: CreateCatDto) { } }` },
    ],
});
