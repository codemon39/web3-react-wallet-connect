import { useState } from "react";
import MetaMaskCard from "./Components/MetaMaskCard";
import CoinbaseCard from "./Components/CoinbaseCard";

function App() {
  const [error, setError] = useState<Error | undefined>(undefined);

  return (
    <div className="flex flex-col justify-center items-center gap-y-4 w-full h-screen">
      <div className="flex flex-col gap-y-4">
        <MetaMaskCard setError={setError} />
        <CoinbaseCard setError={setError} />
      </div>
      {error && <p>{error.message}</p>}
    </div>
  );
}

export default App;
