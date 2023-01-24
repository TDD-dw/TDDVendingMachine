"use strict";

class VendingMachine {
  constructor() {
    this.currentAmount = 0;
    this.display = "INSERT COINS";
    this.coinReturn = [];
  }

  insertCoin(coin) {
    if (coin === "nickel") this.currentAmount += 5;
    else if (coin === "dime") this.currentAmount += 10;
    else if (coin === "quarter") this.currentAmount += 25;
    else {
      this.coinReturn.push(coin);
      return this.coinReturn;
    }
    this.display = (this.currentAmount / 100).toFixed(2).toString();
  }
}

module.exports = VendingMachine;
