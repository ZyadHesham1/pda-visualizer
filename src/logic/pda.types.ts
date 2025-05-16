export type Symbol = string;

export type Transition = {
  from: string;
  to: string;
  input: Symbol | 'ε';
  pop: Symbol | 'ε';
  push: Symbol[]; // top of stack is the LAST element
};

export type PDA = {
  states: string[];
  inputAlphabet: Symbol[];
  stackAlphabet: Symbol[];
  transitions: Transition[];
  startState: string;
  acceptStates: string[];
};

export type Configuration = {
  state: string;
  input: string; // remaining input
  stack: Symbol[];
  history: string; // description of the move taken
};
