const create = (context) => {

    const [{ max }] = context.options;

    return {

        MethodDefinition(node) {
            const height = node.loc.end.line - node.loc.start.line;
            if (height > max) {
                context.report({
                    node: node.key,
                    message: 'Method body too long, exceeded {{ exceeded }} lines',
                    data: { exceeded: (height - max) },
                });
            }
        }
    };

};

module.exports = {
    create,
};
