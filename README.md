# TDD Kata with Vending Machine in JavaScript

## Table of Contents
 - [Setup](#setup)
 - [Ensemble (mobbing) workflow](#ensemble-mobbing-workflow)
 - [TDDVendingMachine](#tddvendingmachine)
 
## Setup
Please do all of the technical setup before joining the session. This will allow us to minimize interruptions and focus on writing code. If you are stuck on something, reach out to the facilitators and we can help you offline.

### Github repo access
- [Set up SSH](https://docs.github.com/en/authentication/connecting-to-github-with-ssh) for connecting to Github
  - Verify it is working
- Ask one of the owners of this repo to invite you as a contributor with push access
  - Accept the invite

## Local project setup
- clone using SSH
- Use your favorite IDE
- `npm install`
- `npm test` to ensure that the test are working

### Install Mob.sh
Mob.sh takes most of the committing, pushing, and pulling and condenses it to one command. This allows the mob to flow smoothly from one driver to the next. It has timer, turn suggestion and audio check functionalities.  
- [Mob](https://github.com/remotemobprogramming/mob)
  - run `curl -sL install.mob.sh | sudo sh`
  - alternatively you can run `brew install remotemobprogramming/brew/mob`
  - run `mob moo` to check install and audio

## Ensemble (mobbing) workflow

### Mob commands
  - `mob start` Person opening the session runs this in the branch
    - It creates an ensemble branch off of the current working branch or does a checkout to the ensemble branch
  - `mob timer 5` sets a timer for number of minutes (5) until notification to switch
  - `mob next` when current driver turn is over (SAVE FIRST!)
    - Makes a commit and pushes to the ensemble branch
  - `mob start 5`next driver starts turn and timer for 5 minutes
  - `mob done` when session is complete run 
    - Makes a commit, squashes all commits, pushes, and then merges back to the original working branch

### After the mob
  - The person who runs `mob done` will need to do a commit and push on the original group branch. This makes sure that all of the ensemble's work is available to the next group.

# TDDVendingMachine
Vending Machine Kata
====================

In this exercise you will build the brains of a vending machine.  It will accept money, make change, maintain inventory, and dispense products.  All the things that you might expect a vending machine to accomplish.

The point of this kata is to provide a larger than trivial exercise that can be used to practice TDD.  A significant portion of the effort will be in determining what tests should be written and, more importantly, written next.

Features
========

Accept Coins
------------
  
_As a vendor_  
_I want a vending machine that accepts coins_  
_So that I can collect money from the customer_  

The vending machine will accept valid coins (nickels, dimes, and quarters) and reject invalid ones (pennies).  When a valid coin is inserted the amount of the coin will be added to the current amount and the display will be updated. When there are no coins inserted, the machine displays INSERT COIN.  Rejected coins are placed in the coin return.

NOTE: The temptation here will be to create Coin objects that know their value.  However, this is not how a real vending machine works.  Instead, it identifies coins by their weight and size and then assigns a value to what  was inserted.  You will need to do something similar.  This can be simulated using strings, constants, enums,  symbols, or something of that nature.

Select Product
--------------

_As a vendor_  
_I want customers to select products_  
_So that I can give them an incentive to put money in the machine_  

There are three products: cola for $1.00, chips for $0.50, and candy for $0.65.  When the respective button is pressed and enough money has been inserted, the product is dispensed and the machine displays THANK YOU.  If the display is checked again, it will display INSERT COIN and the current amount will be set to $0.00.  If there is not enough money inserted then the machine displays PRICE and the price of the item and subsequent checks of the display will display either INSERT COIN or the current amount as appropriate.

Make Change
-----------

_As a vendor_  
_I want customers to receive correct change_  
_So that they will use the vending machine again_  

When a product is selected that costs less than the amount of money in the machine, then the remaining amount is placed in the coin return.

Return Coins
------------

_As a customer_  
_I want to have my money returned_  
_So that I can change my mind about buying stuff from the vending machine_  

When the return coins button is pressed, the money the customer has placed in the machine is returned and the display shows INSERT COIN.

Sold Out
--------

_As a customer_  
_I want to be told when the item I have selected is not available_  
_So that I can select another item_  

When the item selected by the customer is out of stock, the machine displays SOLD OUT.  If the display is checked again, it will display the amount of money remaining in the machine or INSERT COIN if there is no money in the machine.

Exact Change Only
-----------------

_As a customer_  
_I want to be told when exact change is required_  
_So that I can determine if I can buy something with the money I have before inserting it_  

When the machine is not able to make change with the money in the machine for any of the items that it sells, it will display EXACT CHANGE ONLY instead of INSERT COIN.
