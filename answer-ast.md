```uml
@startuml

[const answer = Math.sqrt(a + 1)] ..> VariableDeclaration

@enduml
```

+++

```uml
@startuml

[const answer = Math.sqrt(a + 1)] --> VariableDeclaration
VariableDeclaration --> [const]: kind
VariableDeclaration --> [answer = Math.sqrt(a + 1)]: declarations

@enduml
```

+++

```uml
@startuml

[const answer = Math.sqrt(a + 1)] --> VariableDeclaration
VariableDeclaration --> [const]: kind
VariableDeclaration --> [answer = Math.sqrt(a + 1)]: declarations

[answer = Math.sqrt(a + 1)] ..> VariableDeclarator

@enduml
```

+++

```uml
@startuml

[const answer = Math.sqrt(a + 1)] --> VariableDeclaration
VariableDeclaration --> [const]: kind
VariableDeclaration --> [answer = Math.sqrt(a + 1)]: declarations

[answer = Math.sqrt(a + 1)] --> VariableDeclarator
VariableDeclarator --> [answer]: id
VariableDeclarator --> [Math.sqrt(a + 1)]: init

@enduml
```

+++

```uml
@startuml

[const answer = Math.sqrt(a + 1)] --> VariableDeclaration
VariableDeclaration --> [const]: kind
VariableDeclaration --> [answer = Math.sqrt(a + 1)]: declarations

[answer = Math.sqrt(a + 1)] --> VariableDeclarator
VariableDeclarator --> [answer]: id
VariableDeclarator --> [Math.sqrt(a + 1)]: init

[answer] ..> Identifier
[Math.sqrt(a + 1)] ..> CallExpression

@enduml
```

+++

```uml
@startuml

[const answer = Math.sqrt(a + 1)] --> VariableDeclaration
VariableDeclaration --> [const]: kind
VariableDeclaration --> [answer = Math.sqrt(a + 1)]: declarations

[answer = Math.sqrt(a + 1)] --> VariableDeclarator
VariableDeclarator --> Identifier: id
VariableDeclarator --> [Math.sqrt(a + 1)]: init

Identifier --> [answer]: name
[Math.sqrt(a + 1)] ..> CallExpression

@enduml
```

+++

```uml
@startuml
scale max 800 height

[const answer = Math.sqrt(a + 1)] --> VariableDeclaration
VariableDeclaration --> [const]: kind
VariableDeclaration --> [answer = Math.sqrt(a + 1)]: declarations

[answer = Math.sqrt(a + 1)] --> VariableDeclarator
VariableDeclarator --> Identifier: id
VariableDeclarator --> CallExpression: init

Identifier --> [answer]: name
CallExpression --> [Math.sqrt]: callee
CallExpression --> [a + 1]: arguments

[Math.sqrt] ..> MemberExpression
[a + 1] ..> BinaryExpression

@enduml
```

+++

```uml
@startuml
scale max 800 height

[const answer = Math.sqrt(a + 1)] --> VariableDeclaration
VariableDeclaration --> [const]: kind
VariableDeclaration --> [answer = Math.sqrt(a + 1)]: declarations

[answer = Math.sqrt(a + 1)] --> VariableDeclarator
VariableDeclarator --> Identifier: id
VariableDeclarator --> CallExpression: init

Identifier --> [answer]: name
CallExpression --> [Math.sqrt]: callee
CallExpression --> [a + 1]: arguments

[Math.sqrt] --> MemberExpression
[a + 1] ..> BinaryExpression

MemberExpression --> [Math]: object
MemberExpression --> [sqrt]: property

@enduml
```

+++

```uml
@startuml
scale max 800 height

[const answer = Math.sqrt(a + 1)] --> VariableDeclaration
VariableDeclaration --> [const]: kind
VariableDeclaration --> [answer = Math.sqrt(a + 1)]: declarations

[answer = Math.sqrt(a + 1)] --> VariableDeclarator
VariableDeclarator --> Identifier: id
VariableDeclarator --> CallExpression: init

Identifier --> [answer]: name
CallExpression --> [Math.sqrt]: callee
CallExpression --> [a + 1]: arguments

[Math.sqrt] --> MemberExpression
[a + 1] ..> BinaryExpression

MemberExpression --> [Math]: object
MemberExpression --> [sqrt]: property

() Identifier as IMath
() Identifier as Isqrt
[Math] ..> IMath
[sqrt] ..> Isqrt

@enduml
```

+++

```uml
@startuml
scale max 800 height

[const answer = Math.sqrt(a + 1)] --> VariableDeclaration
VariableDeclaration --> [const]: kind
VariableDeclaration --> [answer = Math.sqrt(a + 1)]: declarations

[answer = Math.sqrt(a + 1)] --> VariableDeclarator
VariableDeclarator --> Identifier: id
VariableDeclarator --> CallExpression: init

Identifier --> [answer]: name
CallExpression --> [Math.sqrt]: callee
CallExpression --> [a + 1]: arguments

[Math.sqrt] --> MemberExpression
[a + 1] ..> BinaryExpression

MemberExpression --> [Math]: object
MemberExpression --> [sqrt]: property

() Identifier as IMath
() Identifier as Isqrt
[Math] ..> IMath
[sqrt] ..> Isqrt

BinaryExpression --> [a]: left
BinaryExpression --> [+]: operator
BinaryExpression --> [1]: right

@enduml
```

+++

```uml
@startuml
scale max 800 height

[const answer = Math.sqrt(a + 1)] --> VariableDeclaration
VariableDeclaration --> [const]: kind
VariableDeclaration --> [answer = Math.sqrt(a + 1)]: declarations

[answer = Math.sqrt(a + 1)] --> VariableDeclarator
VariableDeclarator --> Identifier: id
VariableDeclarator --> CallExpression: init

Identifier --> [answer]: name
CallExpression --> [Math.sqrt]: callee
CallExpression --> [a + 1]: arguments

[Math.sqrt] --> MemberExpression
[a + 1] ..> BinaryExpression

MemberExpression --> [Math]: object
MemberExpression --> [sqrt]: property

() Identifier as IMath
() Identifier as Isqrt
[Math] ..> IMath
[sqrt] ..> Isqrt

BinaryExpression --> [a]: left
BinaryExpression --> [+]: operator
BinaryExpression --> [1]: right

() Identifier as Ia
[a] ..> Ia
[1] ..> Literal

@enduml
```

+++

```uml
@startuml
scale max 800 height

[const answer = Math.sqrt(a + 1)] --> VariableDeclaration
VariableDeclaration --> [const]: kind
VariableDeclaration --> [answer = Math.sqrt(a + 1)]: declarations

[answer = Math.sqrt(a + 1)] --> VariableDeclarator
VariableDeclarator --> Identifier: id
VariableDeclarator --> CallExpression: init

Identifier --> [answer]: name
CallExpression --> [Math.sqrt]: callee
CallExpression --> [a + 1]: arguments

[Math.sqrt] --> MemberExpression
[a + 1] ..> BinaryExpression

MemberExpression --> [Math]: object
MemberExpression --> [sqrt]: property

() Identifier as IMath
() Identifier as Isqrt
[Math] ..> IMath
[sqrt] ..> Isqrt

BinaryExpression --> [a]: left
BinaryExpression --> [+]: operator
BinaryExpression --> Literal: right

() Identifier as Ia
[a] ..> Ia
Literal --> [1]: value

@enduml
```

---
## Abstract Syntax Tree

```json
{
    "type": "Program",
    "body": [
        {
            "type": "VariableDeclaration",
            "declarations": [
                {
                    "type": "VariableDeclarator",
                    "id": {
                        "type": "Identifier",
                        "name": "answer"
                    },
                    "init": {
                        "type": "CallExpression",
                        "callee": {
                            "type": "MemberExpression",
                            "computed": false,
                            "object": {
                                "type": "Identifier",
                                "name": "Math"
                            },
                            "property": {
                                "type": "Identifier",
                                "name": "sqrt"
                            }
                        },
                        "arguments": [
                            {
                                "type": "BinaryExpression",
                                "operator": "+",
                                "left": {
                                    "type": "Identifier",
                                    "name": "a"
                                },
                                "right": {
                                    "type": "Literal",
                                    "value": 1,
                                    "raw": "1"
                                }
                            }
                        ]
                    }
                }
            ],
            "kind": "const"
        }
    ],
    "sourceType": "script"
}
```

Note:
Так выглядит AST в JSON виде.
У каждого объекта есть, есть по крайней мере свойство type, которое указывет на тип объекта.
Здесь не полная информация, есть еще range которое отражают позицию начала и конца выражения,
и loc содержит тоже самое, только содержит информацию про строки и колонки.
Как видно, простое выражение разбивается на объект типа VariableDeclaration, у которого есть свойство declarations
массив из объекта VariableDeclarator, если бы у меня было несколько объявлений переменных, то было бы соответсвующее количество
элементов в массиве.
http://esprima.org/demo/parse.html?code=const%20answer%20%3D%20Math.sqrt(a%20%2B%201)
