"use strict";

function createVendingMachine() {
  let amount = 0;
  let rejectedCoins = [];
  let dispensedItems = [];

  function insertCoin(coin) {
    const coinType = detectCoin(coin);

    if (coinType.name === "invalid") {
      rejectedCoins.push(coin);
      return;
    }

    amount += coinType.value;
  }

  function display() {
    if (dispensedItems.length > 0) {
      return "THANK YOU";
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
      return { name: "nickel", value: 0.05 };
    } else if (coin.diameter === 17.91 && coin.weight === 2.268) {
      return { name: "dime", value: 0.1 };
    } else if (coin.diameter === 24.26 && coin.weight === 5.67) {
      return { name: "quarter", value: 0.25 };
    } else {
      return { name: "invalid", value: 0 };
    }
  }

  function pressButton(input) {
    if (amount === 1) {
      dispensedItems.push("cola");
    }
  }

  function dispenser() {
    return dispensedItems;
  }

  return {
    insertCoin,
    display,
    coinReturn,
    detectCoin,
    pressButton,
    dispenser,
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
