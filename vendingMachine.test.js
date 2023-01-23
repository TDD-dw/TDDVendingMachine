'use strict'

const vendingMachine = require('./vendingMachine');

describe('vendingMachine', () => {
  it('to life, the universe and everything', () => {
    expect(vendingMachine()).toEqual(42);
  })
})