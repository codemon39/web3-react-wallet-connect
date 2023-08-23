import type { CoinbaseWallet } from "@web3-react/coinbase-wallet";
import type { MetaMask } from "@web3-react/metamask";
import type { Network } from "@web3-react/network";
import type { WalletConnect } from "@web3-react/walletconnect";
import type { WalletConnect as WalletConnectV2 } from "@web3-react/walletconnect-v2";

export type Connector =
  | MetaMask
  | WalletConnect
  | WalletConnectV2
  | CoinbaseWallet
  | Network;
