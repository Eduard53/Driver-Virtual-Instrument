#!/usr/bin/env node

// Author: Eduard Mocanu
// Description: virtual_instrument.js (child) is simulating a virtual balance
// that sends the data to the driver.js (parent) when requested. The stable
// weight value in this example is calculated by averaging a simulated number.
// The response from the virtual balance will also be randomized according to
// the documentation for the command.

const serialNumber = '0348-3829';
const manufacturer = 'LABFORWARD'
const model = 'LF-Balance';
const otherInfo = 'Max weight: 1000g  d:0.01g';

const fileSystem = require('fs')
var log = fileSystem.createWriteStream('./s_s_log.txt', {
  flags: 'a'
})

console.log('Device online');

process.on('message', (data) => {
    console.log(`Recieved: [0x${toHex(data)}] is "${data}"`);

  if (data == 'S') {
    console.log('$ Command recognized.');
    callRandomFunction();
  }

  if (data == 'I') {
    console.log('$ --- Device Information ---');
    deviceInfo();
  }
});

function callRandomFunction() {
    var random = Math.floor(Math.random()*4);
    switch(random){
    case 0:
        stableWeight();
        break;
    case 1:
        na();
        break;
    case 2:
        overload();
        break;
    case 3:
        underload();
        break;
    }
}

function toHex (input) {
  var dec = input.charCodeAt(0);
  var hex = dec.toString(16);
  return hex
}

function simulatedWeight() {
  var numbers = new Array(10)
  var sum = 0;
    for (var i = 0; i < numbers.length; i++) {
      numbers[i] = Math.random()*(120-80)+80;
      sum += numbers[i];
    }
  var average = (sum/numbers.length);
  return average.toFixed(2);
}

function newDateObj () {
    var dateObj = new Date();
    return dateObj;
}

function time() {
  var hour = newDateObj().getHours();
  var min = newDateObj().getMinutes();
  var sec = newDateObj().getSeconds();
  var time = (hour + ":" + min + ":" + sec);
  return time;
}

function date() {
  var day = newDateObj().getDate();
  var month = newDateObj().getMonth() + 1;
  var year = newDateObj().getFullYear();
  var date = (day + "/" + month + "/" + year);
  return date;
}

function stableWeight() {
  var weight = simulatedWeight();
  console.log(`$ S S    ${weight} g`);
  log.write(`Stable Weight is: ${weight} g at ${time()} on ${date()}\n`);
}

function na() {
  console.log('$ S I   (Command not executable)');
}

function overload() {
  console.log('$ S +   (Balance in overload range)');
}

function underload() {
  console.log('$ S -   (Balance in underload range)');
}

function deviceInfo () {
  console.log(`- Manufacturer: ${manufacturer}`);
  console.log(`- Model: ${model}`);
  console.log(`- S/N: ${serialNumber}`);
  console.log(`- Info: ${otherInfo}`);
}

module.exports = {
  toHex,
  simulatedWeight,
  newDateObj
}

process.on('exit', () => {
  console.log('$ Parent exit');
})
