import { Logger } from './fancy-log';

export class MathService {

    private logger = new Logger();

    constructor() {
        this.logger.info('Service created');
    }

    sum(a: number, b: number) {
        this.logger.info('calculating sum for', a, b);
        const result = a + b; // +0 for fixer demo
        return result;
    }
}
