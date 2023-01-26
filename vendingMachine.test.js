"use strict";
const VendingMachine = require("./vendingMachine");

describe("vendingMachine", () => {
  let vendingMachine;
  beforeEach(() => {
    vendingMachine = new VendingMachine();
  });
  describe("accept coins", () => {
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

    it("should track current amount", () => {
      vendingMachine.insertCoin("nickel");
      expect(vendingMachine.display).toEqual("0.05");
      vendingMachine.insertCoin("dime");
      expect(vendingMachine.display).toEqual("0.15");
    });

    it("should track coins and toss penny", () => {
      vendingMachine.insertCoin("nickel");
      vendingMachine.insertCoin("penny");
      vendingMachine.insertCoin("quarter");

      expect(vendingMachine.display).toEqual("0.30");
      expect(vendingMachine.coinReturn).toEqual(["penny"]);
    });
  });

  describe("Select Product", () => {
    it("select cola", () => {
      vendingMachine.insertCoin("quarter");
      vendingMachine.insertCoin("quarter");
      vendingMachine.insertCoin("quarter");
      vendingMachine.insertCoin("quarter");
      vendingMachine.select("cola");
      expect(vendingMachine.display).toEqual("THANK YOU");
      expect(vendingMachine.productReturn).toEqual(["cola"]);
      expect(vendingMachine.currentAmount).toEqual(0);
    });

    it("select chips", () => {
      vendingMachine.insertCoin("quarter");
      vendingMachine.insertCoin("quarter");
      vendingMachine.select("chips");
      expect(vendingMachine.display).toEqual("THANK YOU");
      expect(vendingMachine.productReturn).toEqual(["chips"]);
      expect(vendingMachine.currentAmount).toEqual(0);
    });

    it("select candy", () => {
      vendingMachine.insertCoin("quarter");
      vendingMachine.insertCoin("quarter");
      vendingMachine.insertCoin("quarter");
      vendingMachine.select("candy");
      expect(vendingMachine.display).toEqual("THANK YOU");
      expect(vendingMachine.productReturn).toEqual(["candy"]);
      expect(vendingMachine.currentAmount).toEqual(10);
    });

    it("display resets after dispensing product", () => {
      vendingMachine.insertCoin("nickel");
      vendingMachine.insertCoin("dime");
      vendingMachine.insertCoin("quarter");
      vendingMachine.insertCoin("quarter");
      vendingMachine.select("candy");
      expect(vendingMachine.display).toEqual("THANK YOU");
      expect(vendingMachine.productReturn).toEqual(["candy"]);
      expect(vendingMachine.currentAmount).toEqual(0);
    });

  });
});
