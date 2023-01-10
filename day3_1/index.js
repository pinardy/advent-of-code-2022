'use strict';
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
});

process.stdout.cork();

let prioritySum = 0;

const getSacks = (line) => {
  const firstSack = line.slice(0, line.length/2);
  const secondSack = line.slice(line.length/2);
  return [firstSack, secondSack];
};

const getCharMap = (sack) => {
  let charMap = {};
  for (let char of sack) {
    if (!charMap[char]) {
      charMap[char] = 1
    } else {
      charMap[char] += 1
    }
  }
  return charMap;
};

const findCommonCharacter = (firstSack, secondSack) => {
  const firstCharMap = getCharMap(firstSack);
  const secondCharMap = getCharMap(secondSack);
  for (let char in firstCharMap) {
    if (secondCharMap[char]) {
      return char;
    }
  }
  return null;
}

const getPriorityValue = (char) => {
  const priorityValues = "_abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  return priorityValues.indexOf(char);
};

rl.on('line', (line) => {
  const [firstSack, secondSack] = getSacks(line);
  const character = findCommonCharacter(firstSack, secondSack);
  const priority = getPriorityValue(character);
  prioritySum += priority;
});

rl.on('close', () => {
  console.log(prioritySum);
  process.stdout.end();
});