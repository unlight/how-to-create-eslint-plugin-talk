import { Logger } from './fancy-log';

export class MathService {

    private logger = new Logger();

    constructor() {
        this.logger.info('Service created');
    }

    calcHypotenuse(a, b) {
        this.logger.info('calculating result', a, b);
        return Math.sqrt((a * a) + (b * b));
    }
}
