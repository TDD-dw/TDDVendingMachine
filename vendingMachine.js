"use strict";

const items = {
  1: { name: "cola", price: 1, quantity: 0 },
  2: { name: "chips", price: 0.5 },
  3: { name: "candy", price: 0.65 },
};

const coins = {
  0.05: { name: "nickel", diameter: 21.21, weight: 5 },
  0.1: { name: "dime", diameter: 17.91, weight: 2.268 },
  0.25: { name: "quarter", diameter: 24.26, weight: 5.67 },
};

function createVendingMachine() {
  let amount = 0;
  let inputCoins = [];
  let rejectedCoins = [];
  let dispensedItems = [];
  let purchaseComplete = false;
  let insufficientFunds = false;
  let requestedInput = null;

  function insertCoin(coin) {
    const coinType = detectCoin(coin);

    if (coinType.name === "invalid") {
      rejectedCoins.push(coin);
      return;
    }

    amount += coinType.value;
  }

  function display() {
    console.log('requestedInput', requestedInput)
    if (insufficientFunds) {
      insufficientFunds = false;
      return `PRICE ${formatValue(items[requestedInput].price)}`;
    }
    if (requestedInput === 'R') {
      return 'Insert coin'
    }

    if (requestedInput && items[requestedInput].quantity === 0) {
      return "Sold out";
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
    const coinType = Object.entries(coins).find(([key, coinObject]) => {
      return (
        coin.diameter === coinObject.diameter &&
        coin.weight === coinObject.weight
      );
    });

    if (coinType) {
      inputCoins.push(coinType[1]);
      return { name: coinType[1].name, value: Number(coinType[0]) };
    } else {
      return { name: "invalid", value: 0 };
    }
  }

  function pressButton(input) {
    if (input === "R") {
      rejectedCoins.push(...inputCoins);
      inputCoins = [];
      amount = 0;
      return;
    }
    requestedInput = input;
    makePurchase(items[input]);
  }

  function makePurchase(item) {
    if (amount >= item.price) {
      purchaseComplete = true;
      amount -= item.price;
      dispensedItems.push(item.name);
      makeChange();
    } else {
      insufficientFunds = true;
    }
  }

  function makeChange() {
    calculateCoins(0.25);
    calculateCoins(0.1);
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

module.exports = { createVendingMachine };
