"use strict";

const recognizeCoin = (coin) => {
  if (coin === "nickel") {
    return "$0.05";
  } else if (coin === "dime") {
    return "$0.10";
  } else if (coin === "quarter") {
    return "$0.25";
  } else if (coin === "penny") {
    return "Insert coin";
  }
};

function vendingMachine(coin) {
  if (coin) {
    return recognizeCoin(coin);
  }
  return "Insert coin";
}

function createVendingMachine() {
  let amount = 0;
  let rejectedCoins = [];

  function insertCoin(coin) {
    const coinType = detectCoin(coin);

    if (coinType.name === "invalid") {
      rejectedCoins.push(coin);
      return;
    }

    amount += coinType.value;
  }

  function display() {
    return formatValue(amount);
  }

  function coinReturn() {
    return rejectedCoins;
  }

  function detectCoin(coin) {
    if (coin.diameter === 21.21 && coin.weight === 5) {
      return {name: "nickel", value: .05};
    } else if (coin.diameter === 17.91 && coin.weight === 2.268) {
      return {name: "dime", value: .1};
    } else if (coin.diameter === 24.26 && coin.weight === 5.67) {
      return {name: "quarter", value: .25};
    } else {
      return {name: "invalid", value: 0};
    }
  }

  return {
    insertCoin,
    display,
    coinReturn,
    detectCoin,
  };
}

function formatValue(amount) {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  return formatter.format(amount);
}

module.exports = { vendingMachine, createVendingMachine };
