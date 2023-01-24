"use strict";

const {vendingMachine, createVendingMachine} = require("./vendingMachine");

describe("vendingMachine", () => {
  // todo: refactor old tests to use new vending machine object
  it("detect no coins inserted", () => {
    expect(vendingMachine()).toEqual("Insert coin");
  });

  it("should display 5 cents when nickel is inserted", () => {
    expect(vendingMachine("nickel")).toEqual("$0.05");
  });

  it("should display 10 cents when dime is inserted", () => {
    expect(vendingMachine("dime")).toEqual("$0.10");
  });

  it("should display 25 cents when quarter is inserted", () => {
    expect(vendingMachine("quarter")).toEqual("$0.25");
  });

  it('should display "Insert coin" when penny is inserted', () => {
    expect(vendingMachine("penny")).toEqual("Insert coin");
  });

  it("Insert a quarter, a dime and a nickel and validate that it gives us 40Cents", () => {
    const vendingMachine = createVendingMachine();

    vendingMachine.insertCoin("quarter");
    vendingMachine.insertCoin("nickel");
    vendingMachine.insertCoin("dime");

    expect(vendingMachine.display()).toEqual("$0.40")
  });

  it('should put penny in coin return when inserted', () => {
    const vendingMachine = createVendingMachine();

    vendingMachine.insertCoin("penny");

    expect(vendingMachine.coinReturn()).toEqual(['penny'])
  })
});



