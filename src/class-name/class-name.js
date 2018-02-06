"use strict";
module.exports = function (context) { return ({
    ClassDeclaration: function (node) {
        if (!node.id || node.id.type !== 'Identifier') {
            return;
        }
        if (node.id.name && node.id.name.endsWith('Class')) {
            context.report({ node: node, message: 'Do not use `Class` suffix in class names' });
        }
    }
}); };
