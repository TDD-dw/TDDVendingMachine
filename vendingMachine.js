"use strict";

const items = {
  '1': {name: 'cola', price: 1},
  '2': {name: 'chips', price: 0.50},
  '3': {name: 'candy', price: 0.65}
};
const coins = {
  0.05: {diameter: 21.21, weight: 5},
  0.10: {diameter: 17.91, weight: 2.268},
  0.25: {diameter: 24.26, weight: 5.67}
};

function createVendingMachine() {
  let amount = 0;
  let rejectedCoins = [];
  let dispensedItems = [];
  let purchaseComplete = false;
  let insufficientFunds = false;
  let i;

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
    makePurchase(items[input])
  }

  function makePurchase(item) {
    if (amount >= item.price) {
      purchaseComplete = true;
      amount -= item.price;
      dispensedItems.push(item.name);
      makeChange(amount);
      rejectedCoins.push({diameter: 24.26, weight: 5.67});
    } else {
      insufficientFunds = true;
    }
  }

  function makeChange(remainingAmount) {
    while (remainingAmount !== 0) {
      // todo: complete function for calculating change
      // check how many quarters, dimes, nickels fit in remaining amount
      if (remainingAmount / )
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
