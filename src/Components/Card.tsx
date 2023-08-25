import { useCallback, useEffect, useState } from "react";
import { Web3ReactHooks } from "@web3-react/core";

import { Network } from "@web3-react/network";
import { WalletConnect } from "@web3-react/walletconnect";
import { WalletConnect as WalletConnectV2 } from "@web3-react/walletconnect-v2";
import { Web3Provider } from "@ethersproject/providers";

import { Connector } from "../types/Connector";
import { getName } from "../utils";
import { CHAINS, getAddChainParameters } from "../chains";

interface Props {
  connector: Connector;
  activeChainId: ReturnType<Web3ReactHooks["useChainId"]>;
  chainIds?: number[];
  isActivating: ReturnType<Web3ReactHooks["useIsActivating"]>;
  isActive: ReturnType<Web3ReactHooks["useIsActive"]>;
  ENSNames: ReturnType<Web3ReactHooks["useENSNames"]>;
  provider: Web3Provider;
  accounts?: string[];
  setError: (error: Error | undefined) => void;
  imgURL: string;
}

export default function Card({
  connector,
  activeChainId,
  chainIds = Object.keys(CHAINS).map(Number),
  isActive,
  provider,
  accounts,
  setError,
  imgURL,
}: Props) {
  const [toAddress, setToAddress] = useState("");
  const [message, setMessage] = useState("");
  const [desiredChainId, setDesiredChainId] = useState(activeChainId);

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

  useEffect(() => {
    if (activeChainId && (!desiredChainId || desiredChainId === -1)) {
      setDesiredChainId(activeChainId);
    }
  }, [desiredChainId, activeChainId]);

  const handleSwitchChain = useCallback(
    async (chainId: number) => {
      setDesiredChainId(chainId);

      try {
        if (
          chainId === activeChainId ||
          (chainId === -1 && activeChainId !== undefined)
        ) {
          setError(undefined);
          return;
        }

        if (chainId === -1) {
          await connector.activate();
        } else if (
          connector instanceof WalletConnectV2 ||
          connector instanceof WalletConnect ||
          connector instanceof Network
        ) {
          await connector.activate(chainId);
        } else {
          await connector.activate(getAddChainParameters(chainId));
        }

        setError(undefined);
      } catch (error: any) {
        setError(error);
      }
    },
    [connector, activeChainId, setError]
  );

  const handleSend = async () => {
    const transactionRequest = {
      to: toAddress,
      value: "0x38D7EA4C68000", //0.001 eth
    };
    const signer = provider.getSigner();

    signer
      .sendTransaction(transactionRequest)
      .then((transactionResponse) => {
        setMessage("TX HASH: " + transactionResponse.hash);
      })
      .catch((error: Error) => {
        setMessage("Error: " + error.message);
      });
  };

  return (
    <>
      {isActive ? (
        <>
          <div className="flex items-center gap-x-2">
            <label>Select a Chain: </label>
            <select
              value={activeChainId}
              onChange={(e) => {
                handleSwitchChain(Number(e.target.value));
              }}
              className="p-1 border"
            >
              <option hidden disabled>
                Select Chain
              </option>
              <option value={-1}>Default</option>
              {chainIds?.map((chainId: number) => (
                <option key={chainId} value={chainId}>
                  {CHAINS[chainId]?.name ?? chainId}
                </option>
              ))}
            </select>
          </div>
          {accounts && (
            <div>
              <label>From: </label>
              <span>{accounts[0]}</span>
            </div>
          )}
          <div className="flex gap-x-2">
            <label>To: </label>
            <input
              type="text"
              value={toAddress}
              onChange={(e) => setToAddress(e.target.value)}
              className="border w-96"
            />
          </div>
          <div>
            <span>{message}</span>
          </div>
          <div className="flex gap-x-8">
            <button
              onClick={() => handleSend()}
              className="p-2 border w-40 hover:bg-blue-300"
            >
              <span>Send</span>
            </button>
            <button
              onClick={() => handleDeactivate()}
              className="p-2 border w-40 hover:bg-blue-300"
            >
              <span>Disconnect</span>
            </button>
          </div>
        </>
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
