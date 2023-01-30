"use strict";

const { vendingMachine, createVendingMachine } = require("./vendingMachine");

const NICKEL = { diameter: 21.21, weight: 5 };
const DIME = { diameter: 17.91, weight: 2.268 };
const QUARTER = { diameter: 24.26, weight: 5.67 };
const INVALID_COIN = { diameter: 100, weight: 100 };
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

    vendingMachine.insertCoin(QUARTER);
    vendingMachine.insertCoin(NICKEL);
    vendingMachine.insertCoin(DIME);

    expect(vendingMachine.display()).toEqual("$0.40");
  });

  it("should put penny in coin return when inserted", () => {
    const vendingMachine = createVendingMachine();

    vendingMachine.insertCoin(INVALID_COIN);

    expect(vendingMachine.coinReturn()).toEqual([INVALID_COIN]);
  });

  it("should identify nickel by weight and size", () => {
    const vendingMachine = createVendingMachine();
    const coin = NICKEL;


    vendingMachine.insertCoin(coin);

    expect(vendingMachine.display()).toEqual("$0.05");
  });

  describe("detectCoin", () => {
    it("should detect nickel", () => {
      const vendingMachine = createVendingMachine();
      const coin = NICKEL;

      expect(vendingMachine.detectCoin(coin)).toEqual({name: "nickel", value: .05});
    });

    it("should detect dime", () => {
      const vendingMachine = createVendingMachine();
      const coin = DIME;

      expect(vendingMachine.detectCoin(coin)).toEqual({name: "dime", value: .1});
    });

    it("should detect quarter", () => {
      const vendingMachine = createVendingMachine();
      const coin = QUARTER;

      expect(vendingMachine.detectCoin(coin)).toEqual({name: "quarter", value: .25});
    });

    it("should detect invalid coin", () => {
      const vendingMachine = createVendingMachine();
      const coin = INVALID_COIN;

      expect(vendingMachine.detectCoin(coin)).toEqual({name: "invalid", value: 0});
    });
  });
});
