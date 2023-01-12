'use strict';
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
});

process.stdout.cork();

const hasDuplicates = (array) => new Set(array).size !== array.length;

const getIndexForFirstMarker = (line) => {
  let charBucket = [];
  
  for (let index in line) {
    if (charBucket.length >= 4) {
      charBucket = charBucket.slice(1, charBucket.length);
    }
    charBucket.push(line[index])
    if (charBucket.length === 4) {
      if (!hasDuplicates(charBucket)) return parseInt(index)+1;
    }
  }
  return -1;
};

rl.on('line', (line) => {
  const indexForFirstMarker = getIndexForFirstMarker(line);
  console.log(indexForFirstMarker);
});

rl.on('close', () => {
  process.stdout.end();
});