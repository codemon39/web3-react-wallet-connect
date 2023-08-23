import { CoinbaseWallet } from "@web3-react/coinbase-wallet";
import { initializeConnector } from "@web3-react/core";
import Card from "./Card";
import { URLS } from "../chains";

const [connector, hooks] = initializeConnector<CoinbaseWallet>(
  (actions) =>
    new CoinbaseWallet({
      actions,
      options: {
        url: URLS[1][0],
        appName: "web3-react",
      },
    })
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

export default function CoinbaseCard({ setError }: Props) {
  const chainId = useChainId();
  const accounts = useAccounts();
  const isActivating = useIsActivating();
  const isActive = useIsActive();
  const provider = useProvider();
  const ENSNames = useENSNames(provider);

  console.log({ coinbase: isActive });

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
      imgURL={`../cbw.png`}
    />
  );
}
