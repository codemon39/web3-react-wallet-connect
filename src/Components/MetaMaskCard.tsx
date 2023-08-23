import { initializeConnector } from "@web3-react/core";
import { MetaMask } from "@web3-react/metamask";
import Card from "./Card";
import { useEffect } from "react";

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
}

export default function MetaMaskCard({ setError }: Props) {
  useEffect(() => {
    void connector.connectEagerly().catch(() => {
      console.debug("Failed to connect eagerly to metamask");
    });
  }, []);

  const chainId = useChainId();
  const accounts = useAccounts();
  const isActivating = useIsActivating();
  const isActive = useIsActive();
  const provider = useProvider();
  const ENSNames = useENSNames(provider);

  console.log({ metamask: isActive });

  return (
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
  );
}
