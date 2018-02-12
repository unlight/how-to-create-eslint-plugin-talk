# Creating a custom ESLint rules

A brief introduction how to create your own ESLint rules

Note:
Как создать свой ESLint плагин со своими правилами.
Для начала небольшая теория.

---

## Why?
* Lack of existing rules
* Framework specific rules
* Project specific rules
* Convention tests

Note:
Зачем может понадобиться создавать свои правила?
Недостающий функционал (особенно во фреймворках).
Во фреймворках как правило бывают, какие-то бест практики, и написав свое правило, можно заставить эти практики применять.
Иногда правила специфические для проекта называют Convention tests (конвеншн тестами).
В JavaScript - одну и ту же вещь можно реализовать 10-ю разными способами.

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

## Your code is not a string

1. Lexer/Tokenize(Input, Lexical Grammar)  
   --> Tokens
2. Parse(Tokens, Syntax Grammar)  
   --> AST (Abstract Syntax Tree)

Note:
Чтобы без проблема анализировать код или преобразовывать в другой код, из него получить синтаксическое дерево (AST - Abstract Syntax Tree).
1. Токенизация, на этом этапе строка просто разбивается на тОкены
2. Парсинг, из тОкенов и каких-то правил синтаксиса строится AST

+++

## Your code is not a string

```js
const answer = Math.sqrt(a + 1)
```

Note:
Есть много различных парсеров и на выходе получаются разные типы деревьев.
Чамые популярные это ESTree и его вариации, Typescript.
ESLint использует парсер ESpree.

+++?include=answer-ast.md

Note: 
Как это работает.
const answer = Math.sqrt(a + 1)
Вот так выглядит визуализация синтаксического дерева.
...

---

## Abstract Syntax Tree

```js
const answer = Math.sqrt(a + 1)
```

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
Такое простое выражение разложилось на 50 строчек json.
У каждого объекта есть, есть по крайней мере свойство type, которое указывет на тип объекта.
Здесь не полная информация, есть еще range которое отражают позицию начала и конца выражения,
и loc содержит тоже самое, только содержит информацию про строки и колонки.
Как видно, простое выражение разбивается на объект типа VariableDeclaration, у которого есть свойство declarations
массив из объекта VariableDeclarator, если бы у меня было несколько объявлений переменных, то было бы соответсвующее количество
элементов в массиве. http://esprima.org/demo/parse.html?code=const%20answer%20%3D%20Math.sqrt(a%20%2B%201)

---

## AST Visual Tools
* [astexplorer.net](https://astexplorer.net/#/gist/433bc0721837f6131015237244f42340/97b61c07409adf0fdb7ccaf7a8dc373cae39c353)
* [esprima.org/demo/parse.html](http://esprima.org/demo/parse.html?code=const%20answer%20%3D%20Math.sqrt%28a%20%2B%201%29)
* [viswesh.github.io/astVisualizer](https://viswesh.github.io/astVisualizer/index.html)

Note:
Есть несколько онлайн инструментов которые позволяют посмотреть синтаксическое дерево в более удобном виде.
astexplorer.net, кроме него вам больше ничего не нужно.
Можно выбрать язык (css, graphQL), парсер и другие.
Можно навести мышкой на выражене, на плюс и оно будет сразу посдвечено справа.

---

## How ESLint works

```uml
@startuml
left to right direction

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

Note:
Упрощенная схема работы выглядит следующим образом.
ESLint парсит код, создает AST, а дальше модуль ESTraverse его обходит.
В процессе обхода ESTraverse сообщает, об объектах AST всем заинтересованным правила.
Если правило заинтересован в этом типе элемента, то eslint вызовет метод и с параметром, где параметром будет.
Паттерн visitor.
Если логика правила нашла какую-то проблему, правило сообщает об этом обратно eslint-у и там уже дальше это как обрабатывается:
выводится в консоль и т.п.

---

## Adding custom rule

1. By creating plugin (eslint-plugin-myawesomeplugin) 
2. `rulePaths` config or `--rulesdir` in cli mode

Note:
Как создать правило и подключить его в проект.
Можно двумя способами: создать плагин и подключить его с помощью секции plugins в конфиге.
или просто создать директорию с правилами и указать её в конфиге.

---

## How to write custom ESLint rule

```js
// index.js
module.exports = {
    rules: {
        'my-rule-name': function create (context) {
            // rule implementation ...
        },
        'my-rule-name2': {
            create,
            meta,
        },
    },
    // configs: { ... },
    // environments: { ... },
    // processors: { ... },
};
```

Note:
Как написать правило.
Создать модуль, который будет экспортировать объект у которого есть свойство rules - это в объект,
ключи у которого это айди правила и значение - это функция, которая принимает какой-то контекст.
Это сокращенная запись.
В полной записи, надо определить значение как объект с свойством create.
Также можно можно указать какую дополнительную информацию, типа описание, будет ли оно fixable, автовычиниваться и т.д.
Опционально можно указать configs, здесь можно указать опции по умолчанию для правила, либо задать список рекомендованных правил.
environments - для настройки окружения
processors - позволяет парсить другие типы файлов помимо джаваскрипта

---

## Rule implementation

```ts
module.exports = (context) => ({

    ClassDeclaration(node: ClassDeclaration) {
        console.log('ClassDeclaration');
    },

    OtherNodeType(node) { /* ... */ },
});
```

Note:
Имплементация (src\rules\class-name.js)
В этой create функции, которая принимает контекст, нужно сказать eslint-у в каких типах объектах аст дерева мы заинтересованы.
Этим мы говорим что estraverse если встретишь объекта типа ClassDeclaration то вызови эту функцию
будет передан этот объект как параметр.
Посмотрим пример.
npm run eslint:example:class-name

---
## Example 1

+++?code=src/example/cat.class.ts&lang=typescript

Note:
Простой пример. Есть класс которая описывает животное.
И в имени класса используется суффикс - класс.
Давайте напишем такое правило, которое будет запрещать имя класса оканчивалось на 'class'.
Перейдем на astexplorer.net

---

## How to test

Note:



## Example 2

+++?code=src/example/math.service.ts&lang=typescript

@[5](Pass dependency through constructor)
@[13](Use Math.hypot())

Note:
Пример, у нас есть такой класс. Используется в приложении типа калькулятор.
Что в этом коде не так? Какая здесь проблема?
Нарушение SOLID - D.
Если мы начнем тестировать, что произойдет, у нас в консоль или куда настроен, начнут сыпаться сообщения.
Хорошо если если только в консоль, а то может и в файловую систему или системный журнал.
Т.е. вместе с нашим классом мы будем тестировать еще этот логгер.
2. Вот эта может быть записана как Math.hypot()

---

## Links

* https://eslint.org/docs/developer-guide/working-with-plugins
* https://gist.github.com/sindresorhus/1656c46f23545deff8cc713649dcff26
* https://github.com/cowchimp/awesome-ast
* https://www.youtube.com/watch?v=CFQBHy8RCpg
* https://github.com/estools/escope

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
