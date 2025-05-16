import type { PDA, Configuration } from "./pda.types";

// To serialize stack and state to avoid revisiting same config
function serializeConfig(state: string, input: string, stack: string[]): string {
  return `${state}|${input}|${stack.join(',')}`;
}

export function simulatePDA(pda: PDA, input: string): Configuration[] {
  const configs: Configuration[] = [];
  const visited = new Set<string>();

  function run(
    state: string,
    remainingInput: string,
    stack: string[],
    trace: Configuration[]
  ): boolean {
    const key = serializeConfig(state, remainingInput, stack);
    if (visited.has(key)) return false;
    visited.add(key);

    const top = stack.length > 0 ? stack[stack.length - 1] : 'ε';
    const currentSymbol = remainingInput.length > 0 ? remainingInput[0] : 'ε';

    const possibleTransitions = pda.transitions.filter(t => {
      const inputMatches = t.input === currentSymbol || t.input === 'ε';
      const popMatches =
        (t.pop === 'ε') || // ε means "no pop" (can always apply)
        (stack.length > 0 && t.pop === stack[stack.length - 1]);
      return t.from === state && inputMatches && popMatches;
    });

    for (const t of possibleTransitions) {
      const nextState = t.to;
      const nextStack = [...stack];

      let inputConsumed = t.input !== 'ε';
      let stackPopped = t.pop !== 'ε';

      // Pop if needed
      if (stackPopped) nextStack.pop();

      // Push in reverse order (top is last)
      for (let i = t.push.length - 1; i >= 0; i--) {
        if (t.push[i] !== 'ε') {
          nextStack.push(t.push[i]);
        }
      }

      const newInput = inputConsumed ? remainingInput.slice(1) : remainingInput;

      let actions: string[] = [];
      if (stackPopped) actions.push(`pop ${t.pop}`);
      if (t.push.some(x => x !== 'ε')) actions.push(`push ${t.push.filter(x => x !== 'ε').join(",")}`);
      if (inputConsumed) actions.push(`match ${t.input}`);

      const config: Configuration = {
        state: nextState,
        input: newInput,
        stack: [...nextStack],
        history: actions.join("; ") || "ε-move"
      };

      const newTrace = [...trace, config];

      const accepted = 
        (newInput === '' && pda.acceptStates.includes(nextState)) ||
        (newInput === '' && nextStack.length === 0);

      if (accepted) {
        configs.push(...newTrace);
        return true;
      }

      const success = run(nextState, newInput, nextStack, newTrace);
      if (success) return true;
    }

    return false;
  }

  // Start config
  const initialStack: string[] = []; // Start with an empty stack
  const initialConfig: Configuration = {
    state: pda.startState,
    input,
    stack: [...initialStack],
    history: 'Start'
  };

  const accepted = run(pda.startState, input, initialStack, [initialConfig]);

  if (!accepted) {
    configs.push({
      state: 'Rejected',
      input: '',
      stack: [],
      history: 'No accepting path found'
    });
  }

  return configs;
}
