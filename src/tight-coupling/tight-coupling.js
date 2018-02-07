"use strict";
module.exports = function (context) {
    var options = context.options;
    return {
        ClassProperty: function (node) {
            if (node.value && node.value.type === 'NewExpression') {
                context.report({ node: node, message: 'Pass dependency through constructor' });
            }
        }
    };
};
