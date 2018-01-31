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
