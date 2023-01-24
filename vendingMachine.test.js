'use strict'

const {vendingMachine, acceptsCoins, identifyCoin} = require('./vendingMachine');

describe('accepts valid coins', () => {
  it('should expect a valid nickel coin', () => {
    let nickel = {weight: 5, thickness: 1.95}
    expect(acceptsCoins([nickel])).toEqual(0.05);
  })
  it('should update current amount', () => {
    let coins = [{weight: 5, thickness: 1.95}, {weight: 2.268, thickness: 1.35}, {weight: 5.670, thickness: 1.75}]
    expect(acceptsCoins(coins)).toEqual(0.40)
  })
  it('should reject other coins', () => {
    let coins = [{weight: 0.005, thickness: 3.14159}]
    expect(acceptsCoins(coins)).toEqual(`Rejected ${{weight: 0.005, thickness: 3.14159}}`)
  })
})

describe('identify coin', () => {
  it('should accept a nickel', () => {
    let nickel = {weight: 5, thickness: 1.95}
    expect(identifyCoin(nickel)).toEqual(0.05);
  })
  it('should accept a dime', () => {
    let dime = {weight: 2.268, thickness: 1.35}
    expect(identifyCoin(dime)).toEqual(0.10);
  })
  it('should accept a quarter', () => {
    let quarter = {weight: 5.670, thickness: 1.75}
    expect(identifyCoin(quarter)).toEqual(0.25);
  })
})