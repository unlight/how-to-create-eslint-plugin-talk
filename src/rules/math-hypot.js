function create(context) {
    let mathSqrt = null;
    return {
        CallExpression(node) {
            if (node.callee && node.callee.object.name === 'Math' && node.callee.property.name === 'sqrt'
                && node.callee.arguments.length === 1) {
                mathSqrt = node;
            }
        },
        'CallExpression:exit'(node) {
            mathSqrt = null;
        },
        BinaryExpression(node) {
            if (mathSqrt
                && node.operator === '+'
                && isMultiplyingSameIdentifiers(node.left)
                && isMultiplyingSameIdentifiers(node.right)) {
                context.report(mathSqrt, 'Use Math.hypot()');
            }
        }
    };
}

function isMultiplyingSameIdentifiers(node) {
    return node.left.type === 'Identifier'
        && node.right.type === 'Identifier'
        && node.operator === '*'
        && node.right.name === node.left.name;
}

module.exports = {
    create,
};
