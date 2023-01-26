"use strict";

class VendingMachine {
  constructor() {
    this.currentAmount = 0;
    this.display = "INSERT COINS";
    this.coinReturn = [];
    this.productReturn = [];
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

  select(product) {
    let priceOfProduct = 0;
    if (product === "candy") priceOfProduct = 65;
    else if (product === "cola") priceOfProduct = 100;
    else if (product === "chips") priceOfProduct = 50;
    
    this.display = "THANK YOU";
    this.productReturn.push(product);
    this.currentAmount -= priceOfProduct;
  }
}

module.exports = VendingMachine;
