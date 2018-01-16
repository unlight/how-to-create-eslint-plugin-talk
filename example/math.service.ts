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
