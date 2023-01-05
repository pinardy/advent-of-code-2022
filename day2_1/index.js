'use strict';
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
});

process.stdout.cork();

const loseScenario = (opponentChoice, myChoice) => {
  return (
    opponentChoice === 'A' && myChoice === 'Z'
    || opponentChoice === 'B' && myChoice === 'X'
    || opponentChoice === 'C' && myChoice === 'Y'
  );
};

const drawScenario = (opponentChoice, myChoice) => {
  return (
    opponentChoice === 'A' && myChoice === 'X'
    || opponentChoice === 'B' && myChoice === 'Y'
    || opponentChoice === 'C' && myChoice === 'Z'
  );
};

const winScenario = (opponentChoice, myChoice) => {
  return (
    opponentChoice === 'A' && myChoice === 'Y'
    || opponentChoice === 'B' && myChoice === 'Z'
    || opponentChoice === 'C' && myChoice === 'X'
  );
};

const choiceScore = (choice) => {
  if (choice === 'X') return 1;
  if (choice === 'Y') return 2;
  if (choice === 'Z') return 3;
  return 0;
};

// A: Rock, B: Paper, C: Scissors
// X: Rock (1pt), Y: Paper (2pt), Z: Scissors (3pt)
// Lost: 0pt, Draw: 3pt, Win: 6pt
let totalScore = 0;

rl.on('line', (line) => {
  const [opponentChoice, myChoice] = line.split(' ');
  let score = 0;
  if (loseScenario(opponentChoice, myChoice)) score = 0;
  if (drawScenario(opponentChoice, myChoice)) score = 3;
  if (winScenario(opponentChoice, myChoice)) score = 6;

  totalScore += score + choiceScore(myChoice);
});

rl.on('close', () => {
  console.log('totalScore: ', totalScore);
  process.stdout.end();
});