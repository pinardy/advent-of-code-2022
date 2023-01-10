'use strict';
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
});

process.stdout.cork();

let prioritySum = 0;
let sackList = [];

const getPriorityValue = (char) => {
  const priorityValues = "_abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  return priorityValues.indexOf(char);
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

const split = (array, n) => {
  let arr  = [...array];
  var res = [];
  while (arr.length) {
    res.push(arr.splice(0, n));
  }
  return res;
}

const findCommonCharacter = (sackGroup) => {
  const firstCharMap = getCharMap(sackGroup[0]);
  const secondCharMap = getCharMap(sackGroup[1]);
  const thirdCharMap = getCharMap(sackGroup[2]);
  for (let char in firstCharMap) {
    if (secondCharMap[char] && thirdCharMap[char]) {
      return char;
    }
  }
  return null;
}

rl.on('line', (line) => {
  sackList.push(line);
});

rl.on('close', () => {
  const allSackGroups = split(sackList, 3);

  for (let sackGroup of allSackGroups) {
    const character = findCommonCharacter(sackGroup);
    const priority = getPriorityValue(character);
    prioritySum += priority;
  }
  console.log(prioritySum);

  process.stdout.end();
});