'use strict';
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
});

process.stdout.cork();

// A: Rock, B: Paper, C: Scissors
// X: Lose, Y: Draw, Z: Win
// Rock (1pt), Paper (2pt), Scissors (3pt)
// Lost: 0pt, Draw: 3pt, Win: 6pt
let totalScore = 0;

rl.on('line', (line) => {
  const [opponentChoice, outcome] = line.split(' ');

  // Need to lose
  if (outcome === 'X') {
    if (opponentChoice === 'A') totalScore += 3 // scissors
    if (opponentChoice === 'B') totalScore += 1 // rock
    if (opponentChoice === 'C') totalScore += 2 // paper
  }
  
  // Need to draw
  if (outcome === 'Y') {
    if (opponentChoice === 'A') totalScore += 1+3 // rock
    if (opponentChoice === 'B') totalScore += 2+3 // paper
    if (opponentChoice === 'C') totalScore += 3+3 // scissors
  }

  // Need to win
  if (outcome === 'Z') {
    if (opponentChoice === 'A') totalScore += 2+6 // paper
    if (opponentChoice === 'B') totalScore += 3+6 // scissors
    if (opponentChoice === 'C') totalScore += 1+6 // rock
  }
});

rl.on('close', () => {
  console.log('totalScore: ', totalScore);
  process.stdout.end();
});