'use strict'

function acceptsCoins(coins) {
    let sum = 0
    let rejectedCoins = []
    
    for (let coin of coins) {
        const value = identifyCoin(coin)
        if (typeof value === "number") {
          sum += value
        } else {
          rejectedCoins.push(coin)
        }
    }


  return {sum: sum, rejectedCoins: rejectedCoins}
}

function vendingMachine() {
  return 6 * 9
}

function identifyCoin(coin) {
  if(coin.weight === 5 && coin.thickness === 1.95) {
    return 0.05
  } else if (coin.weight === 2.268 && coin.thickness === 1.35) {
    return 0.10
  } else if (coin.weight === 5.670 && coin.thickness === 1.75){
    return 0.25
  } else {
    return `Rejected ${{weight: 0.005, thickness: 3.14159}}`
  }
}
 
function products(userSelection) {
  const vendingMachineProducts = ["cola", "chips", "candy"];

  return vendingMachineProducts[userSelection-1];
}

module.exports = {vendingMachine, acceptsCoins, identifyCoin, products}