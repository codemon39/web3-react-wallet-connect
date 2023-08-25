import { useState } from "react";
import MetaMaskCard from "./Components/MetaMaskCard";
import CoinbaseCard from "./Components/CoinbaseCard";

function App() {
  const [error, setError] = useState<Error | undefined>(undefined);
  const [isConnected, setIsConnected] = useState(false);

  return (
    <div className="flex flex-col justify-center items-center gap-y-4 w-full h-screen">
      <div className="flex flex-col justify-center items-center gap-y-4">
        <MetaMaskCard
          setError={setError}
          isConnected={isConnected}
          setIsConnected={setIsConnected}
        />
        <CoinbaseCard
          setError={setError}
          isConnected={isConnected}
          setIsConnected={setIsConnected}
        />
      </div>
      {error && <p>{error.message}</p>}
    </div>
  );
}

export default App;
