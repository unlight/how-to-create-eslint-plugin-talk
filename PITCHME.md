# Creating a ESLint plugin

A brief introduction how to create your own ESLint plugin

Note:
Как создать свой ESLint плагин.

---

## Why?
* Lack of existing rules
* Specific framework rules

Note:
Зачем?
Недостающий функционал (особенно во фреймворках).

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

```typescript
export class MathService {

    private logger = require('fancy-log');

    constructor() {
        this.logger.info('Service created');
    }

    sum(a: number, b: number) {
        this.logger.info('calculating sum for', a, b);
        return a + b;
    }
}
```

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
    private logger = require('fancy-log');
}
```

Note:
Найти такую такую конструкцию и сообщить ESLint-у что здесь проблема.

---

## Your code is not a string

---
![](http://www.plantuml.com/plantuml/img/JL1BQyCm3BuRz1zqR64DFOuSIal9JeEMjRSj1vEegI6nWwoqXRB_FgklnGTXVVeUifTHBClGjM1QEWXAG7RDKR1sJ9MuuC74ohQ4dRtW-toEPrVB4GoOoJhKD4KRyNvJJ3NMDubUx3wT5xo2mNI-jI5--_6htgLAKcMbIk-qTM1w48lOCr69izb26s5x8eu9o76rsuFvrPW3suvmsmwDyr4pRgXkyT2zN4imu-vfUylGqIWWonOlonoB4tc9O9w8Jl-D4k6B-i02PWIg-MGpI3_8DCUFm9sLz6hTRKc-Jh_y1m00)
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

---

<!-- 
Упрощенная схема работы выглядит следующим образом
Токены это объекты которые отражают какую-то конструкцию в коде
У объекта есть как минимум своqство type, которое указывает на тип
и loc (от слова location) - начало и конец блока
чтобы создать плагин нам надо придумать, ему название, написать логику нахождения плохого кода
нам нужно написать модуль, из модуля выставить объект rules, у которого свойства - идентификатор правила, а значение объект
объект в в котором должно быть функция create, в которую передается контекст,
мы должны возвратить объект ключи у которого - это типы токенов из AST дерева.
Декларативно: methods definition два раза
Как сделать fix?

-->
