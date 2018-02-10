module.exports = (context) => {
    const { options } = context;
    return {
        ClassProperty: (node) => {

            if (node.value && node.value.type === 'NewExpression') {
                const callee = node.value.callee;
                if (callee && callee.type === 'Identifier' && options && options.includes(callee.name)) {
                    return;
                }
                context.report({ node, message: 'Pass dependency through constructor' });
            }
        }
    };
};
