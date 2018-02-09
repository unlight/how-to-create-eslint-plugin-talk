module.exports = (context) => {
    const { options } = context;
    return {
        ClassProperty: (node) => {

            if (node.value && node.value.type === 'NewExpression') {
                context.report({ node, message: 'Pass dependency through constructor' });
            }
        }
    };
};
