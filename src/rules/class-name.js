const create = (context) => ({
    ClassDeclaration(node) {
        console.log('ClassDeclaration');
        if (!node.id || node.id.type !== 'Identifier') {
            return;
        }
        if (node.id.name && node.id.name.endsWith('Class')) {
            context.report({
                node,
                message: 'Do not use `Class` suffix in class names',
                fix: (fixer) => {
                    const newName = node.id.name.slice(0, -5);
                    const range = node.id.range;
                    return fixer.replaceTextRange(range, newName);
                }
            });

        }
    },

    MethodDefinition(node) {
        console.log('MethodDefinition');
    },

    'MethodDefinition:exit'(node) {
        console.log('MethodDefinition:exit');
    },
});

module.exports = {
    create,
    meta: {
        fixable: 'code'
    }
};
