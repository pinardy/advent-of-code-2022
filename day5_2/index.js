'use strict';
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
});

process.stdout.cork();

let inputs = [];

const processInput = (inputs) => {
  const indexOfSeparator = inputs.indexOf('');
  const blocksInput = inputs.slice(0, indexOfSeparator);
  const instructions = inputs.slice(indexOfSeparator + 1);
  return [blocksInput, instructions];
};

const processBlocksInput = (input) => {
  const blocks = input.slice(0, input.length-1);
  let stacksMap = {};

  for (const line of blocks) {
    for (let i=0; i<line.length; i++) {
      if (line[i] === '[') {
        if (!stacksMap[i/4+1]) {
          stacksMap[i/4+1] = [line[i+1]];
        } else {
          stacksMap[i/4+1].unshift(line[i+1]);
        }
      }
    }
  }
  return stacksMap
};

const executeInstructions = (instructions, stacksMap) => {
  let finalStacks = stacksMap;
  for (const instruction of instructions) {
    const instructionArray = instruction.split(' ');
    const amountToMove = parseInt(instructionArray[1]);
    const source = instructionArray[3];
    const target = instructionArray[5];

    const toMove = finalStacks[source].splice(finalStacks[source].length-amountToMove, finalStacks[source].length);
    finalStacks[target] = finalStacks[target].concat(toMove);
  }
  return finalStacks;
};

const getTopCrates = (stacks) => {
  let result = '';
  for (let stack of Object.values(stacks)) {
    result += stack[stack.length-1];
  }
  return result;
};

rl.on('line', (line) => {
  inputs.push(line);
});

rl.on('close', () => {
  const [rawBlocksInput, instructions] = processInput(inputs);
  const stacksMap = processBlocksInput(rawBlocksInput);
  const finalStacks = executeInstructions(instructions, stacksMap);
  const result = getTopCrates(finalStacks);
  console.log(result);
  process.stdout.end();
});