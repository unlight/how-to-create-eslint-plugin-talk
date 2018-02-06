"use strict";
module.exports = function (context) { return ({
    ClassDeclaration: function (node) {
        console.log('ClassDeclaration');
        // if (!node.id || node.id.type !== 'Identifier') {
        //     return;
        // }
        // if (node.id.name && node.id.name.endsWith('Class')) {
        //     context.report({ node, message: 'Do not use `Class` suffix in class names' });
        // }
    },
    MethodDefinition: function (node) {
        console.log('MethodDefinition');
    },
    'MethodDefinition:exit': function (node) {
        console.log('MethodDefinition:exit');
    }
}); };
