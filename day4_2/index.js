'use strict';
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
});

process.stdout.cork();

const getAssignmentPair = (line) => {
  const pair = line.split(',');
  return [pair[0], pair[1]];
};

const createDigitList = (assignment) => {
  const splitAssignment = assignment.split('-');
  const start = parseInt(splitAssignment[0]);
  const end = parseInt(splitAssignment[1]);
  let digitsList = [];
  for (let i=start; i<=end; i++) {
    digitsList.push(i);
  }
  return digitsList;
};

const isOverlap = (first, second) => {
  const firstAssignmentDigitList = createDigitList(first);
  const secondAssignmentDigitList = createDigitList(second);

  for (let digit of firstAssignmentDigitList) {
    if (secondAssignmentDigitList.includes(digit)) {
      return true;
    };
  }
  return false;
};

let overlapCount = 0;

rl.on('line', (line) => {
  const [firstAssignment, secondAssignment] = getAssignmentPair(line);
  if (isOverlap(firstAssignment, secondAssignment)) {
    overlapCount += 1;
  }
});

rl.on('close', () => {
  console.log(overlapCount);
  process.stdout.end();
});