#!/usr/bin/env node

// Author: Eduard Mocanu
// Description: driver.js (parent) is the primary driver file for communicating
// asynchronously with the virtual_instrument.js (child) virtual balance.
// Commands can be sent via running the main node driver.js. The driver
// sends a message to the child (virtual_instrument.js) which then randomly
// simulates a result.

console.log('\nWelcome to the LabForward CLI Driver');
console.log('This driver is used to communicate with Virtual Instruments');
console.log('Type [S] to read Stable Weight');
console.log('Type [help or h] to bring up the Help menu\n');

const childProcess = require('child_process');
const path = require('path');

var child = childProcess.fork("./virtual_instrument.js");

//CLI
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: '$ '
});

rl.prompt();

console.log('Driver online');

rl.on('line', (line) => {
  switch(line.trim()) {
    case 'S':
      rl.prompt();
      console.log('Sending Command: Send stable weight value');
      break;
    case 's':
      rl.prompt();
      console.log('Please enter in uppercase.');
      break;
    case 'help': case 'h':
      rl.prompt();
      console.log('--- Help menu ---');
      console.log('$ Valid commands include:\n- [S] = obtain stable weight.');
      console.log('- [help | h] = bring up this help menu');
      console.log('- [end | q | quit] = terminate the process.');
      console.log('- [I] = display device information.');
      break;
    case 'I':
      rl.prompt();
      break;
    case 'end': case 'q': case 'quit':
      rl.prompt();
      console.log('...Closing CLI...');
      close();
      break;
    default:
      rl.prompt();
      console.log('Please enter valid command.\n...Listening...');
      break;
  }
  sendData(line);
  rl.prompt();
});

rl.prompt();

rl.on('close', () => {
  console.log('...Closing CLI...');
  close();
});

function sendData (data) {
  child.send(data);
}

function close () {
  rl.close();
  child.kill();
  process.exit();
}

module.exports = rl;

child.on('exit', ()=>{
  child.kill();
  console.log('Child exit');
})

process.on('exit', (code) => {
  child.kill();
  rl.prompt();
  console.log(`About to exit with code: ${code}`);
});
