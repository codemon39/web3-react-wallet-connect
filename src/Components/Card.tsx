import { Web3ReactHooks } from "@web3-react/core";
import { Connector } from "../types/Connector";
import { getName } from "../utils";

interface Props {
  connector: Connector;
  activeChainId: ReturnType<Web3ReactHooks["useChainId"]>;
  chainIds?: ReturnType<Web3ReactHooks["useChainId"]>[];
  isActivating: ReturnType<Web3ReactHooks["useIsActivating"]>;
  isActive: ReturnType<Web3ReactHooks["useIsActive"]>;
  ENSNames: ReturnType<Web3ReactHooks["useENSNames"]>;
  provider?: ReturnType<Web3ReactHooks["useProvider"]>;
  accounts?: string[];
  setError: (error: Error | undefined) => void;
  imgURL: string;
}

export default function Card({
  connector,
  // activeChainId,
  // chainIds,
  // isActivating,
  isActive,
  // ENSNames,
  // provider,
  // accounts,
  setError,
  imgURL,
}: Props) {
  const handleActivate = () => {
    connector
      .activate()
      .then(() => {
        setError(undefined);
      })
      .catch(setError);
  };

  const handleDeactivate = () => {
    connector?.deactivate ? connector.deactivate() : connector?.resetState();
  };

  return (
    <>
      {isActive ? (
        <button onClick={() => handleDeactivate()}>
          <span>Disconnect</span>
        </button>
      ) : (
        <button
          onClick={() => handleActivate()}
          className="flex justify-center items-center gap-x-2 p-2 border"
        >
          <img src={imgURL} width={25} height={25} />
          <span>{getName(connector)}</span>
        </button>
      )}
    </>
  );
}
