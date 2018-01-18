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

---

## Your code is not a string


---
<!-- 
Токены это объекты которые отражают какую-то конструкцию в коде
У объекта есть как минимум одной своство type, которое указывает на тип
-->
