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

const interpretValue = (coinStr) => {
  return parseFloat(coinStr.slice(1, coinStr.length));
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

  function insertCoin (coin) {
    if (coin === 'penny') {
      rejectedCoins.push('penny')
      return
    }

    let coinString = recognizeCoin(coin);
    let value = interpretValue(coinString);
    amount += value;
  }

  function display() {
    return formatValue(amount);
  }

  function coinReturn() {
    return rejectedCoins
  }

  return {
    insertCoin,
    display,
    coinReturn
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
