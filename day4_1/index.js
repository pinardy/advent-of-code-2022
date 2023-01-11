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

const checkSubset = (parentArray, subsetArray) => subsetArray.every((el) => parentArray.includes(el));

const isCompleteOverlap = (first, second) => {
  const firstAssignmentDigitList = createDigitList(first);
  const secondAssignmentDigitList = createDigitList(second);

  if (firstAssignmentDigitList.length < secondAssignmentDigitList.length) {
    return checkSubset(secondAssignmentDigitList, firstAssignmentDigitList);
  } else {
    return checkSubset(firstAssignmentDigitList, secondAssignmentDigitList);
  }
};

let overlapCount = 0;

rl.on('line', (line) => {
  const [firstAssignment, secondAssignment] = getAssignmentPair(line);
  if (isCompleteOverlap(firstAssignment, secondAssignment)) {
    overlapCount += 1;
  }
});

rl.on('close', () => {
  console.log(overlapCount);
  process.stdout.end();
});