import { simulatePDA } from "./logic/pdaEngine";
import { examplePDA } from "./data/examplePDA";

function App() {
  const trace = simulatePDA(examplePDA, "aabb");

  return (
    <div>
      <h1>PDA Trace</h1>
      <ul>
        {trace.map((config, idx) => (
          <li key={idx}>
            {config.history} | State: {config.state} | Input: {config.input} | Stack: [{config.stack.join(',')}]
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
