"use strict";

const items = {
  1: {name: "cola", price: 1, quantity: 0},
  2: {name: "chips", price: 0.5, quantity: 2},
  3: {name: "candy", price: 0.65, quantity: 2},
};
const coins = {
  0.05: {diameter: 21.21, weight: 5},
  0.1: {diameter: 17.91, weight: 2.268},
  0.25: {diameter: 24.26, weight: 5.67},
};

function createVendingMachine() {
  let amount = 0;
  let rejectedCoins = [];
  let dispensedItems = [];
  let purchaseComplete = false;
  let insufficientFunds = false;

  function insertCoin(coin) {
    const coinType = detectCoin(coin);

    if (coinType.name === "invalid") {
      rejectedCoins.push(coin);
      return;
    }

    amount += coinType.value;
  }

  function display() {
    if (insufficientFunds) {
      insufficientFunds = false;
      return "PRICE $1.00";
    }

    if (dispensedItems.length > 0) {
      if (purchaseComplete) {
        purchaseComplete = false;
        return "THANK YOU";
      } else {
        return "Insert coin";
      }
    }

    if (amount === 0) {
      return "Insert coin";
    }

    return formatValue(amount);
  }

  function coinReturn() {
    return rejectedCoins;
  }

  function detectCoin(coin) {
    if (coin.diameter === 21.21 && coin.weight === 5) {
      return {name: "nickel", value: 0.05};
    } else if (coin.diameter === 17.91 && coin.weight === 2.268) {
      return {name: "dime", value: 0.1};
    } else if (coin.diameter === 24.26 && coin.weight === 5.67) {
      return {name: "quarter", value: 0.25};
    } else {
      return {name: "invalid", value: 0};
    }
  }

  function pressButton(input) {
    if (input === 'R') {
      makeChange();
    } else {
      makePurchase(items[input]);
    }
  }

  function makePurchase(item) {
    if (amount >= item.price && item.quantity > 0) {
      purchaseComplete = true;
      amount -= item.price;
      dispensedItems.push(item.name);
      makeChange();
    } else if (amount >= item.price && item.quantity <= 0) {

    } else {
      insufficientFunds = true;
    }
  }

  function makeChange() {
    calculateCoins(0.25);
    calculateCoins(0.10);
    calculateCoins(0.05);
  }

  function calculateCoins(coinValue) {
    const numberOfCoins = Math.floor(amount / coinValue);
    amount -= numberOfCoins * coinValue;
    for (let i = 1; i <= numberOfCoins; i++) {
      rejectedCoins.push(coins[coinValue]);
    }
  }

  function dispenser() {
    return dispensedItems;
  }

  function getAmount() {
    return amount;
  }

  return {
    insertCoin,
    display,
    coinReturn,
    detectCoin,
    pressButton,
    dispenser,
    getAmount,
  };
}

function formatValue(amount) {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  return formatter.format(amount);
}

module.exports = {createVendingMachine};
