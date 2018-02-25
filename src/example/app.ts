import { MathService } from './math.service';

const app = new MathService();
const result = app.calcHypotenuse(3, 4);

console.log('result', result); // eslint-disable-line no-console
