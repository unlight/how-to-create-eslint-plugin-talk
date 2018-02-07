"use strict";
var create = function (context) { return ({
    ClassDeclaration: function (node) {
        console.log('ClassDeclaration');
        if (!node.id || node.id.type !== 'Identifier') {
            return;
        }
        if (node.id.name && node.id.name.endsWith('Class')) {
            context.report({
                node: node,
                message: 'Do not use `Class` suffix in class names',
                fix: function (fixer) {
                    node.id.name = node.id.name.slice(0, -5);
                }
            });
        }
    },
    MethodDefinition: function (node) {
        console.log('MethodDefinition');
    },
    'MethodDefinition:exit': function (node) {
        console.log('MethodDefinition:exit');
    }
}); };
module.exports = {
    create: create,
    meta: {
        fixable: 'code'
    }
};
