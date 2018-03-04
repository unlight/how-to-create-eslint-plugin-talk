# Creating a custom ESLint rules

A brief introduction how to create your own ESLint rules

Note:
Итак, как создать свой плагин для ESLint или как написать свое правило.

---

## Why?
* Lack of existing rules
* Framework specific rules
* Project specific rules
* Convention tests

Note:
Сразу должен возникнуть вопрос: а зачем нам создавать свои правила или собственный плагин.
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
Чтобы проанализировать код, из него получить синтаксическое дерево (AST - Abstract Syntax Tree).
Это происходит в 2 этапа:
1. Токенизация, на этом этапе текст разбивается на тОкены
2. Парсинг, из тОкенов и каких-то правил синтаксиса строится AST

---

### AST Types

1. ESTree and it's variations (acorn, esprima, flow, etc.)
2. TypeScript
3. Others

Note:
Есть много различных парсеров и на выходе получаются разные типы деревьев.
Чамые популярные это ESTree и его вариации, Typescript.
ESLint использует парсер ESpree.
Other - traceur, uglifyjs

---
## AST Example

```js
const answer = Math.sqrt(a + 1)
```

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
astexplorer.net, самый удобный. Слева код, справа синтаксическое дерево.
Можно выбрать язык (css, graphQL), парсер и другие.
Можно навести мышкой на выражение, на плюс, и оно будет сразу посдвечено справа.

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
В процессе обхода ESTraverse сообщает, об объектах AST всем заинтересованным компонентам, т.е. правилам.
Если логика правила нашла какую-то проблему, правило сообщает об этом обратно eslint-у и там уже дальше это как обрабатывается:
выводится в консоль и т.п.

---

## Adding custom rule

1. By creating plugin (eslint-plugin-myawesomeplugin) 
2. `--rulesdir` in cli mode

Note:
Как подключить его в проект.
Можно двумя способами: создать плагин и подключить его с помощью секции plugins в конфиге.
или просто создать директорию с правилами и указать её в конфиге или параметром при запуске.

---

## How to create a custom rule

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
Также можно можно указать какую дополнительную мета информацию, типа описание, будет ли оно fixable, автовычиниваться и т.д.
Опционально можно указать configs, здесь можно указать опции по умолчанию для правила, либо задать список рекомендованных правил.
environments - для настройки окружения
processors - позволяет парсить другие типы файлов помимо джаваскрипта

---

## Rule implementation

```ts
module.exports = function create(context) {
    return {
        ClassDeclaration(node: ClassDeclaration) {
            context.report({ node, message: 'Class found' });
        },

        OtherNodeType(node) { /* ... */ },
    };
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
На astexplorer.net есть функция transform которая, которая позиволит написать прототип eslint правила.
contex.report() как раз сообщает eslint-у о срабатывании правила.
estraverse обходя дерево, может сообщать об элементе два раза, 1-ый раз когда начинает его обходить его потомков,
и 2-ой раз когда обход потомков закончен, в этом случает надоу указать имя типа двоеточие exit.

Пример. Есть класс.
И в имени класса используется суффикс - класс.
Давайте напишем такое правило, которое будет запрещать имя класса оканчивалось на 'class'.
Перейдем на astexplorer.net

---

## Fixable code

+++
```ts
context.report({
    node: node.id,
    message: 'Do not use `Class` suffix in class names',
    fix: (fixer) => {
    }
});
```

+++
```ts
context.report({
    node: node.id,
    message: 'Do not use `Class` suffix in class names',
    fix: (fixer) => {
        const newName = node.id.name.slice(0, -5);
    }
});
```

+++

```ts
context.report({
    node: node.id,
    message: 'Do not use `Class` suffix in class names',
    fix: (fixer) => {
        const newName = node.id.name.slice(0, -5);
        const range = node.id.range;
        return fixer.replaceTextRange(range, newName);
    }
});
```
API:  
https://eslint.org/docs/developer-guide/working-with-rules#applying-fixes

Note:
В ESLint есть возможность автоматического вычинивания, не у всех правил это есть, потому что не всегда это возможно.
В вызов report надо передать объект fix, это функция которая принимает объект, и у этого объекта есть API для преобразования кода.
Посмотрим в код, поскольку у меня записано мета, что fixable=code, когда я запускаю мне выдается предупреждение что 1 ошибка может быть исправлена.
npm run eslint:example:class-name -- --fix

---

## How to test

```js
const { RuleTester } = require('eslint');
const ruleTester = new RuleTester({ options });

const rule = require('../rules/class-name');

ruleTester.run('rule name', rule, {
    invalid: [
        { code: `class CatClass { }`, errors: [{ message }] },
    ],
    valid: [
        { code: `class { }` },
        { code: `class Cat { }` },
    ],
});
```

Note:
Как тестировать?
В ESLint уже есть вся инфраструктура для тестирования.
Импортируем класс RuleTester, задаем настройки и заупускаем.
ruleTester.run принимает в качестве параметров:
имя теста, как правило это имя правила, само правило - его реализацию, и варианты кода с неправильной реализацией,
т.е. на эти примеры правило должно сработать, правильный код - на это примеры, правило срабатывать не должно.
Этот файл надо запустить с помощью тест раннера - мока.

---
## Example 2 

#### Rule: Method Lines
```
rules: {
    "method-lines": [1, { max: 5} ]
}
```

---
```js
function create(context) {
    
    const [{ max }] = context.options;
    
    return {
        // ...
    };
```

---

## What is not covered

* [context.getSourceCode()](https://eslint.org/docs/developer-guide/working-with-rules#contextgetsourcecode)
* [Code Path Analysis](https://eslint.org/docs/developer-guide/code-path-analysis)
* [Processors/Configs in Plugins](https://eslint.org/docs/developer-guide/working-with-plugins)

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
