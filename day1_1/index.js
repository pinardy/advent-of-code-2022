'use strict';
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
});

process.stdout.cork();

let largestCalories = 0;
let elfLoad = 0;

rl.on('line', (line) => {
  if (line === '') {
    if (elfLoad > largestCalories) largestCalories = elfLoad;
    elfLoad = 0;
  }
  elfLoad += +line;
});

rl.on('close', () => {
  console.log(largestCalories);
  process.stdout.end();
});