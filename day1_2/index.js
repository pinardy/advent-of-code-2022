'use strict';
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
});

process.stdout.cork();

let caloriesList = [];
let elfLoad = 0;

rl.on('line', (line) => {
  if (line === '') {
    caloriesList.push(elfLoad);
    elfLoad = 0;
  } else {
    elfLoad += +line;
  }
});

rl.on('close', () => {
  const sortedCalories = caloriesList.sort((a, b) => b - a)
  const totalCaloriesFromTopThree = sortedCalories[0] + sortedCalories[1] + sortedCalories[2];
  console.log('totalCaloriesFromTopThree: ', totalCaloriesFromTopThree);
  process.stdout.end();
});