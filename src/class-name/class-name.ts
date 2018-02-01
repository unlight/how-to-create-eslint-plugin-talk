import { ClassDeclaration, MethodDefinition } from 'estree';

export = (context) => ({

    ClassDeclaration(node: ClassDeclaration) {
        if (!node.id || node.id.type !== 'Identifier') {
            return;
        }
        if (node.id.name && node.id.name.endsWith('Class')) {
            context.report({ node, message: 'Do not use `Class` suffix in class names' });
        }
    },

    // MethodDefinition(node: MethodDefinition) {
    //     console.log('MethodDefinition');
    // },

    // 'MethodDefinition:exit'(node: MethodDefinition) {
    //     console.log('MethodDefinition:exit');
    // },
});
