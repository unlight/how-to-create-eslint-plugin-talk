export class EmailService {

    private logger = require('fancy-log');

    constructor() {
        this.logger.info('EmailService created');
    }

    sendFromFile(filepath: string) {
        this.logger.info('%s, sending...', filepath);
    }
}
