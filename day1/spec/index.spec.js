const { capitalizeTextFirstChar, createArray, random } = require("../index");

describe("Test capitalizeTextFirstChar Function", () => {
  it("test that the function returns a string type", () => {
    expect(typeof capitalizeTextFirstChar("hello world")).toBe("string");
  });

  it("test that the function capitalizes first character of each word", () => {
    expect(capitalizeTextFirstChar("i'm ahmed ali")).toBe("I'm Ahmed Ali");
  });

  it("test if function throws error when parameter is not string", () => {
    expect(() => capitalizeTextFirstChar(12)).toThrow(
      TypeError("parameters should be string")
    );
  });
});

describe("Test createArray Function", () => {
  it("test that the return value is of type array", () => {
    expect(createArray(3)).toEqual(jasmine.any(Array));
  });

  it("test array of length 2 includes 1", () => {
    const result = createArray(2);
    expect(result.length).toBe(2); 
    expect(result).toContain(1);
  });

  it("test array of length 3 does not include 3", () => {
    const result = createArray(3);
    expect(result.length).toBe(3); 
    expect(result).not.toContain(3);
  });
});

describe("Test random Function", () => {
  it("test that the return value is a number", () => {
    expect(typeof random(1, 10)).toBe("number");
  });

  it("test random number is within specified range", () => {
    const result = random(5, 7);
    expect(result).toBeGreaterThanOrEqual(5);
    expect(result).toBeLessThanOrEqual(7);
  });

  it("test function returns NaN with one parameter", () => {
    expect(random(5)).toBeNaN();
  });
});
