const {toHex, simulatedWeight, newDateObj} = require ('./virtual_instrument.js');

test('to hex', () => {
  expect(toHex('S')).toBe('53');
});

test('simulated weight', () => {
  expect(simulatedWeight()).toBeDefined();
});

test('date object', () => {
  expect(newDateObj()).toBeDefined();
});
