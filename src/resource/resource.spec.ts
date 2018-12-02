/* eslint-disable */
import { divide, substract, sum } from './resource';

describe('math', () => {
    it('use divide', () => {
        expect(divide(6, 3)).toEqual(2);
    });

    it('use substract', () => {
        expect(substract(6, 3)).toEqual(3);
    });

    it('use divide', () => {
        expect(sum(6, 3)).toEqual(9);
    });
  });
