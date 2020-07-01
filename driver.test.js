const rl = require ('./driver.js');

test('reads line', () => {
  const line = rl.on('line', (line) => {})
  expect(line).toBeDefined();
});
