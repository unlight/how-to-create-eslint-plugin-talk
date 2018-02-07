import { Creature } from './creature';

export class AnimalClass extends Creature {

    eatImpl() {
        console.log('eating...');
    }

    sleep() {
        console.log('sleeping...');
    }
}
