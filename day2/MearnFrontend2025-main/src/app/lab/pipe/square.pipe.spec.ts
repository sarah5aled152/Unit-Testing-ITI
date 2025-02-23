import { SquarePipeForLab } from './square.pipe';

describe('1-square pipe (class only) testing:', () => {
  let pipe: SquarePipeForLab;

  beforeEach(() => {
    pipe = new SquarePipeForLab();
  });

  it('expect to return 16 when passing 4', () => {
    const result = pipe.transform(4);
    expect(result).toBe(16);
  });

  it("expect to return 9 when passing '3'", () => {
    const result = pipe.transform('3');
    expect(result).toBe(9);
  });

  it("expect to return 'not a number' when passing wrong parameter", () => {
    // Test with truly invalid inputs
    expect(pipe.transform('abc')).toBe('not a number');
    expect(pipe.transform('!@#')).toBe('not a number');
    expect(pipe.transform('')).toBe('not a number');
  });
});
