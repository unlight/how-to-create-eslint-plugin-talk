import { ClassDeclaration, MethodDefinition } from 'estree';

export = (context) => ({

    ClassProperty: (node) => {

        // if (!isInjectable || !node.value) {
        //     return;
        // }
        // const nodeValue = node.value;
        // if (isNewExpression(nodeValue)
        //     || isRequireCall(nodeValue)
        //     || isIdentifierFromImports(nodeValue.name)
        // ) {
        //     context.report({ node: nodeValue, message });
        // }
    }
});
