"use strict";

const { createVendingMachine } = require("./vendingMachine");

const NICKEL = { diameter: 21.21, weight: 5 };
const DIME = { diameter: 17.91, weight: 2.268 };
const QUARTER = { diameter: 24.26, weight: 5.67 };
const INVALID_COIN = { diameter: 100, weight: 100 };

describe("vendingMachine", () => {
  it('should display "Insert coin" when no coins inserted', () => {
    const vendingMachine = createVendingMachine();
    expect(vendingMachine.display()).toEqual("Insert coin");
  });

  it("should display 5 cents when nickel is inserted", () => {
    const vendingMachine = createVendingMachine();
    vendingMachine.insertCoin(NICKEL);
    expect(vendingMachine.display()).toEqual("$0.05");
  });

  it("should display 10 cents when dime is inserted", () => {
    const vendingMachine = createVendingMachine();
    vendingMachine.insertCoin(DIME);
    expect(vendingMachine.display()).toEqual("$0.10");
  });

  it("should display 25 cents when quarter is inserted", () => {
    const vendingMachine = createVendingMachine();
    vendingMachine.insertCoin(QUARTER);
    expect(vendingMachine.display()).toEqual("$0.25");
  });

  it("should not add to amount when invalid coin is inserted", () => {
    const vendingMachine = createVendingMachine();
    vendingMachine.insertCoin(QUARTER);
    vendingMachine.insertCoin(INVALID_COIN);
    expect(vendingMachine.display()).toEqual("$0.25");
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

  describe("selectProduct", () => {
    it("should dispense a cola when cola button is pressed & sufficient funds have been inserted", () => {
      const vendingMachine = createVendingMachine();
      vendingMachine.insertCoin(QUARTER);
      vendingMachine.insertCoin(QUARTER);
      vendingMachine.insertCoin(QUARTER);
      vendingMachine.insertCoin(QUARTER);

      vendingMachine.pressButton("1");
      expect(vendingMachine.dispenser()).toEqual(["cola"]);
    });

    it("should not dispense a cola when cola button is pressed & insufficient funds have been inserted", () => {
      const vendingMachine = createVendingMachine();
      vendingMachine.insertCoin(QUARTER);
      vendingMachine.insertCoin(QUARTER);
      vendingMachine.insertCoin(QUARTER);

      vendingMachine.pressButton("1");
      expect(vendingMachine.dispenser()).toEqual([]);
    });

    it("should display 'THANK YOU' after dispensing product", () => {
      const vendingMachine = createVendingMachine();
      vendingMachine.insertCoin(QUARTER);
      vendingMachine.insertCoin(QUARTER);
      vendingMachine.insertCoin(QUARTER);
      vendingMachine.insertCoin(QUARTER);

      vendingMachine.pressButton("1");
      expect(vendingMachine.display()).toEqual("THANK YOU");
    });

    it("should display 'Insert coin' after dispensing product & displaying thank you", () => {
      const vendingMachine = createVendingMachine();
      vendingMachine.insertCoin(QUARTER);
      vendingMachine.insertCoin(QUARTER);
      vendingMachine.insertCoin(QUARTER);
      vendingMachine.insertCoin(QUARTER);
      vendingMachine.pressButton("1");

      vendingMachine.display();
      const secondDisplayOutput = vendingMachine.display();

      expect(secondDisplayOutput).toEqual("Insert coin");
    });

    it("should reset current amount to $0.00", () => {
      const vendingMachine = createVendingMachine();
      vendingMachine.insertCoin(QUARTER);
      vendingMachine.insertCoin(QUARTER);
      vendingMachine.insertCoin(QUARTER);
      vendingMachine.insertCoin(QUARTER);
      vendingMachine.pressButton("1");

      vendingMachine.display();
      vendingMachine.display();

      expect(vendingMachine.getAmount()).toEqual(0);
    });

    it("should display PRICE and item price if insufficient funds", () => {
      const vendingMachine = createVendingMachine();
      vendingMachine.insertCoin(QUARTER);
      vendingMachine.insertCoin(QUARTER);
      vendingMachine.insertCoin(QUARTER);
      vendingMachine.pressButton("1");

      expect(vendingMachine.display()).toEqual("PRICE $1.00");
    });

    it("should display amount after displaying item price due to insufficient funds", () => {
      const vendingMachine = createVendingMachine();
      vendingMachine.insertCoin(QUARTER);
      vendingMachine.insertCoin(QUARTER);
      vendingMachine.insertCoin(QUARTER);
      vendingMachine.pressButton("1");

      vendingMachine.display();
      const secondDisplayOutput = vendingMachine.display();

      expect(secondDisplayOutput).toEqual("$0.75");
    });

    it("should display 'Insert coin' after displaying item price due to insufficient funds", () => {
      const vendingMachine = createVendingMachine();
      vendingMachine.pressButton("1");

      vendingMachine.display();
      const secondDisplayOutput = vendingMachine.display();

      expect(secondDisplayOutput).toEqual("Insert coin");
    });

    it("should be able to purchase chips", () => {
      const vendingMachine = createVendingMachine();
      vendingMachine.insertCoin(QUARTER);
      vendingMachine.insertCoin(QUARTER);

      vendingMachine.pressButton("2");

      expect(vendingMachine.dispenser()).toEqual(["chips"]);
    });

    it("should be able to purchase candy", () => {
      const vendingMachine = createVendingMachine();
      vendingMachine.insertCoin(QUARTER);
      vendingMachine.insertCoin(QUARTER);
      vendingMachine.insertCoin(DIME);
      vendingMachine.insertCoin(NICKEL);

      vendingMachine.pressButton("3");

      expect(vendingMachine.dispenser()).toEqual(["candy"]);
    });

    it("should return change when funds exceed purchase price", () => {
      const vendingMachine = createVendingMachine();
      vendingMachine.insertCoin(QUARTER);
      vendingMachine.insertCoin(QUARTER);
      vendingMachine.insertCoin(QUARTER);
      vendingMachine.insertCoin(QUARTER);
      vendingMachine.insertCoin(QUARTER);

      vendingMachine.pressButton("1");

      expect(vendingMachine.coinReturn()).toEqual([QUARTER]);
    });

     it("should calculate and return change when funds exceed purchase price", () => {
      const vendingMachine = createVendingMachine();
      vendingMachine.insertCoin(QUARTER);
      vendingMachine.insertCoin(QUARTER);
      vendingMachine.insertCoin(QUARTER);
      vendingMachine.insertCoin(QUARTER);
      vendingMachine.insertCoin(QUARTER);
       vendingMachine.insertCoin(QUARTER);
       vendingMachine.insertCoin(DIME);
       vendingMachine.insertCoin(NICKEL);

      vendingMachine.pressButton("1");

      expect(vendingMachine.coinReturn()).toEqual([QUARTER, QUARTER, DIME, NICKEL]);
    });

  });

  describe("detectCoin", () => {
    it("should detect nickel", () => {
      const vendingMachine = createVendingMachine();
      const coin = NICKEL;

      expect(vendingMachine.detectCoin(coin)).toEqual({
        name: "nickel",
        value: 0.05,
      });
    });

    it("should detect dime", () => {
      const vendingMachine = createVendingMachine();
      const coin = DIME;

      expect(vendingMachine.detectCoin(coin)).toEqual({
        name: "dime",
        value: 0.1,
      });
    });

    it("should detect quarter", () => {
      const vendingMachine = createVendingMachine();
      const coin = QUARTER;

      expect(vendingMachine.detectCoin(coin)).toEqual({
        name: "quarter",
        value: 0.25,
      });
    });

    it("should detect invalid coin", () => {
      const vendingMachine = createVendingMachine();
      const coin = INVALID_COIN;

      expect(vendingMachine.detectCoin(coin)).toEqual({
        name: "invalid",
        value: 0,
      });
    });
  });
});
