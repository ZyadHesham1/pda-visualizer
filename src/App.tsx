import React, { useState } from "react";
import "./index.css";
import { simulatePDA } from "./logic/pdaEngine";
import type { PDA } from "./logic/pda.types";
import PDAForm from "./components/pdaForm";

function App() {
  const [pda, setPDA] = useState<PDA | null>(null);
  const [inputString, setInputString] = useState("");
  const [trace, setTrace] = useState<any[]>([]);

  const handleSubmit = (submittedPDA: PDA) => {
    setPDA(submittedPDA);
    setTrace([]); // reset trace
  };

  const handleRun = () => {
    if (!pda || !inputString) return;
    const result = simulatePDA(pda, inputString);
    setTrace(result);
  };

  return (
    <div className="min-h-screen p-6 bg-gray-50 text-gray-900">
      <h1 className="text-2xl font-bold mb-6">PDA Visualizer</h1>

      <PDAForm onSubmit={handleSubmit} />

      {pda && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">Run Input</h2>
          <input
            type="text"
            className="p-2 border border-gray-300 rounded w-full max-w-md mb-2"
            placeholder="Enter input string (e.g. aabb)"
            value={inputString}
            onChange={(e) => setInputString(e.target.value)}
          />
          <button
            onClick={handleRun}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Run
          </button>
        </div>
      )}

      {trace.length > 0 && (
        <div className="mt-8">
          <h3 className="text-lg font-bold mb-2">Trace Table</h3>
          <table className="table-auto w-full border border-gray-300 text-sm text-left">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-2 py-1 border">Step</th>
                <th className="px-2 py-1 border">State</th>
                <th className="px-2 py-1 border">Input</th>
                <th className="px-2 py-1 border">Stack</th>
                <th className="px-2 py-1 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {trace.map((step, index) => (
                <tr key={index}>
                  <td className="px-2 py-1 border">{index}</td>
                  <td className="px-2 py-1 border">{step.state}</td>
                  <td className="px-2 py-1 border">{step.input}</td>
                  <td className="px-2 py-1 border">{step.stack.join("")}</td>
                  <td className="px-2 py-1 border">{step.history}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default App;
