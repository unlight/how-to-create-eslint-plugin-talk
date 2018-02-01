import { MathService } from './math.service';

const app = new MathService();
const result = app.sum(1, 2);

console.log('result', result); // eslint-disable-line no-console
