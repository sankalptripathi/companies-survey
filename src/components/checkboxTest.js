const sum = require('./sum');

test('passes all checked cases', () => {
  expect(sum(1, 2)).toBe(3);
});