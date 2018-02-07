import { ClassDeclaration, MethodDefinition } from 'estree';

const create = (context) => ({
    ClassDeclaration(node: ClassDeclaration) {
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

    MethodDefinition(node: MethodDefinition) {
        console.log('MethodDefinition');
    },

    'MethodDefinition:exit'(node: MethodDefinition) {
        console.log('MethodDefinition:exit');
    },
});

export = {
    create,
    meta: {
        fixable: 'code'
    }
};
