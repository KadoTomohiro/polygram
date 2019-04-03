import {MathUtils} from './math-utils';

describe('MathUtils', () => {
  it('should create an instance', () => {
    expect(MathUtils).toBeTruthy();
  });

  it('', () => {
    expect(MathUtils.baseConvert(0, 2, 1)).toEqual([0]);
    expect(MathUtils.baseConvert(1, 2, 2)).toEqual([0, 1]);
    expect(MathUtils.baseConvert(0, 2, 3)).toEqual([0, 0, 0]);
  });
});
