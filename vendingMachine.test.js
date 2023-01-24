"use strict";
const VendingMachine = require("./vendingMachine");

describe("vendingMachine", () => {
  describe("accept coins", () => {
    let vendingMachine;
    beforeEach(() => {
      vendingMachine = new VendingMachine();
    });
    it("vending machine accepts nickel", () => {
      vendingMachine.insertCoin("nickel");
      expect(vendingMachine.display).toEqual("0.05");
    });

    it("vending machine accepts dime", () => {
      vendingMachine.insertCoin("dime");
      expect(vendingMachine.display).toEqual("0.10");
    });

    it("vending machine accepts quarter", () => {
      vendingMachine.insertCoin("quarter");
      expect(vendingMachine.display).toEqual("0.25");
    });

    it("vending machine rejects pennies", () => {
      vendingMachine.insertCoin("penny");
      expect(vendingMachine.coinReturn).toEqual(["penny"]);
    });
    it("display should show insert coins", () => {
      expect(vendingMachine.display).toEqual("INSERT COINS");
    });

    // it("should track current amount", () => {
    //   expect(vendingMachine("nickel")).toEqual("0.05");
    //   expect(vendingMachine("dime")).toEqual("0.15");
    // });
  });
});
