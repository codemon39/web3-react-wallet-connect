import { useEffect } from "react";
import { initializeConnector } from "@web3-react/core";
import { MetaMask } from "@web3-react/metamask";
import { Web3Provider } from "@ethersproject/providers";
import Card from "./Card";

const [connector, hooks] = initializeConnector<MetaMask>(
  (actions) => new MetaMask({ actions })
);

const {
  useChainId,
  useAccounts,
  useIsActivating,
  useIsActive,
  useProvider,
  useENSNames,
} = hooks;

interface Props {
  setError: (error: Error | undefined) => void;
  isConnected: boolean;
  setIsConnected: (isConnected: boolean) => void;
}

export default function MetaMaskCard({
  setError,
  isConnected,
  setIsConnected,
}: Props) {
  useEffect(() => {
    void connector.connectEagerly().catch(() => {
      console.debug("Failed to connect to metamask");
    });
  }, []);

  const chainId = useChainId();
  const accounts = useAccounts();
  const isActivating = useIsActivating();
  const isActive = useIsActive();
  const provider = useProvider() as Web3Provider;
  const ENSNames = useENSNames(provider);

  useEffect(() => {
    setIsConnected(isActive);
  }, [isActive]);

  return (
    <>
      {isConnected == isActive && (
        <Card
          connector={connector}
          activeChainId={chainId}
          isActivating={isActivating}
          isActive={isActive}
          ENSNames={ENSNames}
          provider={provider}
          accounts={accounts}
          setError={setError}
          imgURL={`../mm.png`}
        />
      )}
    </>
  );
}
