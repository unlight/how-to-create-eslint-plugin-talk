import * as logger from 'fancy-log';

export class EmailService {

    constructor() {
        logger.info('EmailService created');
    }

    sendFromFile(filepath: string) {
        logger.info('%s, sending...', filepath);
    }
}
