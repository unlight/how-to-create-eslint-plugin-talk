## Your code is not a string

```js
const answer = 1 + 2
```

Note:
Чтобы проанализировать код его надо преобразовать в так называемое абстрактное синтаксическое дерево (Abstract Syntax Tree) или AST.
Есть много различных парсеров и на выходе получаются разные типы деревьев.
ESLint использует парсер ESpree.

+++

```uml
@startuml
scale max 800 height

[const answer = 1 + 2] ..> VariableDeclaration

@enduml
```

+++

```uml
@startuml
scale max 800 height

[const answer = 1 + 2] --> VariableDeclaration
VariableDeclaration --> [const]: kind
VariableDeclaration --> [answer = 1 + 2]: declarations

@enduml
```

+++

```uml
@startuml
scale max 800 height

[const answer = 1 + 2] --> VariableDeclaration
VariableDeclaration --> [const]: kind
VariableDeclaration --> [answer = 1 + 2]: declarations

[answer = 1 + 2] --> VariableDeclarator
VariableDeclarator --> [answer] : id
VariableDeclarator --> [1 + 2] : init

@enduml
```

+++

```uml
@startuml
scale max 800 height

[const answer = 1 + 2] --> VariableDeclaration
VariableDeclaration --> [const]: kind
VariableDeclaration --> [answer = 1 + 2]: declarations

[answer = 1 + 2] --> VariableDeclarator

Identifier --> [answer]: name
VariableDeclarator --> Identifier : id
VariableDeclarator --> [1 + 2] : init

@enduml
```

+++

```uml
@startuml
scale max 800 height

[const answer = 1 + 2] --> VariableDeclaration
VariableDeclaration --> [const]: kind
VariableDeclaration --> [answer = 1 + 2]: declarations

[answer = 1 + 2] --> VariableDeclarator

Identifier --> [answer]: name
VariableDeclarator --> Identifier : id
VariableDeclarator --> [1 + 2] : init

[1 + 2] ..> BinaryExpression: operator

@enduml
```

+++

```uml
@startuml
scale max 800 height

[const answer = 1 + 2] --> VariableDeclaration
VariableDeclaration --> [const]: kind
VariableDeclaration --> [answer = 1 + 2]: declarations

[answer = 1 + 2] --> VariableDeclarator

Identifier --> [answer]: name
VariableDeclarator --> Identifier : id
VariableDeclarator --> [1 + 2] : init

[1 + 2] --> BinaryExpression
[BinaryExpression] --> [1] : left
[BinaryExpression] --> [+] : operator
[BinaryExpression] --> [2] : right

@enduml
```

```uml
@startuml
scale max 800 height

[const answer = 1 + 2] --> VariableDeclaration
VariableDeclaration --> [const]: kind
VariableDeclaration --> [answer = 1 + 2]: declarations

[answer = 1 + 2] -> VariableDeclarator

Identifier --> [answer]: name
VariableDeclarator --> Identifier : id
VariableDeclarator --> [1 + 2] : init

[1 + 2] --> BinaryExpression
[BinaryExpression] --> [1] : left
[BinaryExpression] --> [+] : operator
[BinaryExpression] --> [2] : right

() Literal as L1
() Literal as L2
[1] ..> L1
[2] ..> L2

@enduml
```

+++

```uml
@startuml
scale max 800 height

[const answer = 1 + 2] --> VariableDeclaration
VariableDeclaration --> [const]: kind
VariableDeclaration --> [answer = 1 + 2]: declarations

[answer = 1 + 2] -> VariableDeclarator

Identifier --> [answer]: name
VariableDeclarator --> Identifier : id
VariableDeclarator --> [1 + 2] : init

() Literal as L1

[1 + 2] --> BinaryExpression
[BinaryExpression] --> L1 : left
[BinaryExpression] --> [+] : operator
() Literal as L2
[BinaryExpression] --> L2 : right

L1 --> [1]: value
L2 --> [2]: value

@enduml
```
