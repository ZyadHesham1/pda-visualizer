// src/components/PDAForm.tsx
import React, { useState } from "react";
import type { PDA, Transition } from "../logic/pda.types";
import Button from "./button";

type PDAFormProps = {
  onSubmit: (pda: PDA) => void;
  onClearTransitions?: () => void;
};

const PDAForm: React.FC<PDAFormProps> = ({ onSubmit, onClearTransitions }) => {
  const [states, setStates] = useState("");
  const [inputAlphabet, setInputAlphabet] = useState("");
  const [stackAlphabet, setStackAlphabet] = useState("");
  const [startState, setStartState] = useState("");
  const [acceptStates, setAcceptStates] = useState("");
  const [transitions, setTransitions] = useState<Transition[]>([]);

  const [newTransition, setNewTransition] = useState<Transition>({
    from: "",
    to: "",
    input: "",
    pop: "",
    push: []
  });

  // Accept empty input as ε for transition fields, but allow displaying ε in the field
  const handleTransitionField = (field: keyof Transition, value: string) => {
    setNewTransition({
      ...newTransition,
      [field]: value,
    });
  };

  // Clear all transitions in the form only
  const handleClearTransitionsLocal = () => {
    setTransitions([]);
    if (onClearTransitions) onClearTransitions();
  };

  // When adding a transition, treat empty string as ε
  const handleAddTransition = () => {
    setTransitions([
      ...transitions,
      {
        ...newTransition,
        from: newTransition.from === "" ? "ε" : newTransition.from,
        to: newTransition.to === "" ? "ε" : newTransition.to,
        input: newTransition.input === "" ? "ε" : newTransition.input,
        pop: newTransition.pop === "" ? "ε" : newTransition.pop,
        push:
          newTransition.push.length === 0 ||
          (newTransition.push.length === 1 && newTransition.push[0] === "")
            ? ["ε"]
            : newTransition.push.map((s) => (s === "" ? "ε" : s)),
      },
    ]);
    setNewTransition({ from: "", to: "", input: "", pop: "", push: [] });
  };

  const handleSubmit = () => {
    const pda: PDA = {
      states: states.split(",").map(s => s.trim()),
      inputAlphabet: inputAlphabet.split(",").map(s => s.trim()),
      stackAlphabet: stackAlphabet.split(",").map(s => s.trim()),
      startState: startState.trim(),
      acceptStates: acceptStates.split(",").map(s => s.trim()),
      transitions
    };
    onSubmit(pda);
  };

  return (
    <div className="p-4 border rounded-lg bg-white shadow-md space-y-4">
      <h2 className="text-lg font-bold">Define PDA</h2>
      
      <input
        className="input"
        placeholder="States (e.g. q0,q1,q2)"
        value={states}
        onChange={(e) => setStates(e.target.value)}
      />
      <input
        className="input"
        placeholder="Input Alphabet (e.g. a,b)"
        value={inputAlphabet}
        onChange={(e) => setInputAlphabet(e.target.value)}
      />
      <input
        className="input"
        placeholder="Stack Alphabet (e.g. a,b,$)"
        value={stackAlphabet}
        onChange={(e) => setStackAlphabet(e.target.value)}
      />
      <input
        className="input"
        placeholder="Start State (e.g. q0)"
        value={startState}
        onChange={(e) => setStartState(e.target.value)}
      />
      <input
        className="input"
        placeholder="Accept States (e.g. q2)"
        value={acceptStates}
        onChange={(e) => setAcceptStates(e.target.value)}
      />

      <div className="mt-4">
        <h3 className="font-semibold">Add Transition</h3>
        <div className="grid grid-cols-5 gap-2">
          <input
            className="input"
            placeholder="From"
            value={newTransition.from}
            onChange={(e) => handleTransitionField("from", e.target.value)}
          />
          <input
            className="input"
            placeholder="To"
            value={newTransition.to}
            onChange={(e) => handleTransitionField("to", e.target.value)}
          />
          <input
            className="input"
            placeholder="Input"
            value={newTransition.input}
            onChange={(e) => handleTransitionField("input", e.target.value)}
          />
          <input
            className="input"
            placeholder="Pop"
            value={newTransition.pop}
            onChange={(e) => handleTransitionField("pop", e.target.value)}
          />
          <input
            className="input"
            placeholder="Push (comma separated)"
            value={newTransition.push.join(",")}
            onChange={(e) => {
              const val = e.target.value;
              setNewTransition({
                ...newTransition,
                push:
                  val === ""
                    ? []
                    : val.split(",").map((s) => s.trim()),
              });
            }}
          />
        </div>
        <div className="flex gap-2 mt-2">
          <Button onClick={handleAddTransition}>Add Transition</Button>
          <Button
            type="button"
            onClick={handleClearTransitionsLocal}
            className="bg-red-600 hover:bg-red-700"
          >
            Clear All Transitions
          </Button>
        </div>
      </div>

      <div>
        <h4 className="font-medium mt-4 mb-2">Current Transitions:</h4>
        <ul className="text-sm font-mono space-y-1 bg-gray-100 p-2 rounded max-h-40 overflow-y-auto">
          {transitions.map((t, i) => (
            <li key={i}>
              ({t.from}) --[{t.input}, {t.pop} &rarr; {t.push.join("")}]&rarr; ({t.to})
            </li>
          ))}
        </ul>
      </div>

      <div className="flex justify-end">
        <Button onClick={handleSubmit} className="mr-2">
          Submit PDA
        </Button>
      </div>
    </div>
  );
};

export default PDAForm;
