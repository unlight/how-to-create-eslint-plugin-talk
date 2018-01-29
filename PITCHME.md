# Creating a ESLint plugin

A brief introduction how to create your own ESLint plugin

Note:
Как создать свой ESLint плагин.

---

## This talk is *NOT*
* About parsing, tokenizing and lexing
* *Everything* you need to know about AST

Note:
Написание плагина тесно связано с термином AST (Abstract Syntax Tree).
Не будем говорить о парсинге, токенизации, лексинге. Я не знаю что-это такое.
Анализ и преобразование кода с помощью AST - это довольно большая тема.
---

## Why?
* Lack of existing rules
* Framework specific rules
* Project specific rules
* Convention tests

Note:
Зачем?
Недостающий функционал (особенно во фреймворках).
Иногда правила специфические для проекта называют Convention tests (конвеншн тестами).
В JavaScript - одну и ту же вещь можно реализовать 10-ю разными способами
---

## Types of Issues

1. Stylistic Issues
2. Possible Errors

Note:
Есть два типа ошибок.
Стилистические - неправильное оформление, точка с запятой, пробелы между скобками у функций, пробелы после запятой в параметрах функций, пробелы или табы и т.д.
Реальные ошибки в коде, которые ведут к неправильной работе или возможным падениям (runtime exceptions), утечкам памяти и т.д.
Мы рассмотрим создание плагина для ошибок 2-го типа.
Потому что 1-го надо использовать API, для 2-го это можно сделать в более декларативном виде.

---

## Example

---?code=src/example/math.service.ts&lang=typescript

@[5]

Note:
Что в этом коде не так? Какая здесь проблема?
Нарушение SOLID - D.
Если мы начнем тестировать, что произойдет, у нас в консоль или куда настроен, начнут сыпаться сообщения.
Хорошо если если только в консоль, а то может и в файловую систему или системный журнал.
Т.е. вместе с нашим классом мы будем тестировать еще этот логгер.

---

## Our goal
```
class {
    // ...
    private logger = new Logger();
}
```

Note:
Найти такую такую конструкцию и сообщить ESLint-у что здесь проблема.

---

## Your code is not a string

```js
const a = 1 + 2;
```

1. Lexer/Tokenize(Input, Lexical Grammar) -> Tokens
2. Parse(Tokens, Syntax Grammar) -> AST (Abstract Syntax Tree)

Note:
Чтобы без проблема анализировать код или преобразовывать в другой код, из него получить синтаксическое дерево (AST - Abstract Syntax Tree).
1. Токенизация на этом этапе просто разбивается на тОкен
2. Парсинг, из тОкенов и каких-то правил синтаксиса строится AST

+++

## Your code is not a string


+++

## Your code is not a string
```js
const answer = 42
```
```
const        answer     =        42
|         |             |   |                ||
|         \_Identifier__/   \_____Literal____/|
|         |                                   |
|         \_________VariableDeclarator________/
|                                             |
\______________VariableDeclaration____________/
```

Note:
Чтобы проанализировать код его надо преобразовать в так называемое абстрактное синтаксическое дерево (Abstract Syntax Tree) или AST.
Есть много различных парсеров и на выходе получаются разные типы деревьев.
ESLint использует парсер ESpree.

---

## Abstract Syntax Tree

```json
{
    "type": "Program",
    "sourceType": "script",
    "body": [
        {
            "type": "VariableDeclaration",
            "kind": "const",
            "declarations": [
                {
                    "type": "VariableDeclarator",
                    "id": {
                        "type": "Identifier",
                        "name": "answer"
                    },
                    "init": {
                        "type": "Literal",
                        "value": 42,
                        "raw": "42"
                    }
                }
            ]
        }
    ]
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

---

## How ESLint works

![](http://www.plantuml.com/plantuml/img/JL1BQyCm3BuRz1zqR64DFOuSIal9JeEMjRSj1vEegI6nWwoqXRB_FgklnGTXVVeUifTHBClGjM1QEWXAG7RDKR1sJ9MuuC74ohQ4dRtW-toEPrVB4GoOoJhKD4KRyNvJJ3NMDubUx3wT5xo2mNI-jI5--_6htgLAKcMbIk-qTM1w48lOCr69izb26s5x8eu9o76rsuFvrPW3suvmsmwDyr4pRgXkyT2zN4imu-vfUylGqIWWonOlonoB4tc9O9w8Jl-D4k6B-i02PWIg-MGpI3_8DCUFm9sLz6hTRKc-Jh_y1m00)

Note:
Упрощенная схема работы выглядит следующим образом.

+++

```
@startuml
left to right direction
scale max 800 width

(Code) as (Code)

rectangle ESLint {
    [Linter,\nApi,\netc.] as ESLintCore
    [Espree] --> [Estraverse] : AST
}

frame Plugins {
}

Code --> [ESLintCore]
[ESLintCore] --> [Espree]
[Estraverse] ..> Plugins : Events
Plugins ..> ESLintCore : Report
ESLintCore --> (Output): Formatter

@enduml
```

+++
```
@startuml
scale max 800 width

[*] --> Lexer: Input
Lexer --> Parser : Tokens
Parser --> [*] : AST

@enduml
```

---

<!-- 
Токены это объекты которые отражают какую-то конструкцию в коде
чтобы создать плагин нам надо придумать, ему название, написать логику нахождения плохого кода
нам нужно написать модуль, из модуля выставить объект rules, у которого свойства - идентификатор правила, а значение объект
объект в в котором должно быть функция create, в которую передается контекст,
мы должны возвратить объект ключи у которого - это типы токенов из AST дерева.
Декларативно: methods definition два раза
мы говорим что мы заинтересованы только в таком типе объектов?
Если Estraverse при обходе дерева встречает такой тип ноды, то он вызывает эту функцию с этой нодой в качестве параметра.
Как сделать fix?
Чтобы создать плагин надо создать npm модуль с именем eslint-plugin-имя
estraverse обходит дерево и вызывает функцию именем типа ноды, когда идет сверху внизу
    и вызывается функция с именем типа ноды и суффиксом :exit когда обход идет снизу вверх
есть 2 тип событий: 1 тип ноды и тип ноды + exit 2-ой тип: т.н. называемый codepath
    codepath (путь выполнения кода) тут https://eslint.org/docs/developer-guide/code-path-analysis
    События пути выполнения кода, т.е. это когда встречаются if, switch, циклы, блоки и т.п.
-->
