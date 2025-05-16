import type { PDA } from "../pda.types";


export const examplePDA: PDA = {
  states: ['q0', 'q1', 'q2', 'q3'],
  inputAlphabet: ['a', 'b'],
  stackAlphabet: ['a', 'b', '$'],
  startState: 'q0',
  acceptStates: ['q3'],
  transitions: [
    // Initial ε-transition to push $
    { from: 'q0', to: 'q1', input: 'ε', pop: 'ε', push: ['$'] },

    // Push 'a' on stack for each 'a' in input
    { from: 'q1', to: 'q1', input: 'a', pop: 'ε', push: ['a'] },

    // Start consuming b's by popping matching a's
    { from: 'q1', to: 'q2', input: 'b', pop: 'a', push: [] },

    // Continue consuming b's
    { from: 'q2', to: 'q2', input: 'b', pop: 'a', push: [] },

    // Accept if stack is down to $
    { from: 'q2', to: 'q3', input: 'ε', pop: '$', push: [] },
  ]
};
