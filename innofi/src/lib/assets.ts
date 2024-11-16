import {
  arbitrumSepolia,
  baseSepolia,
  // mainnet,
  morphHolesky,
  scrollSepolia,
  // sepolia,
  zircuitTestnet,
} from "viem/chains";

import { Asset, ChainId } from "@/lib/types";

export const WBTC: Omit<Asset, "address"> = {
  name: "Wrapped Bitcoin",
  symbol: "WBTC",
  decimals: 18,
  oraclePriceIndex: 0,
};

export const WETH: Omit<Asset, "address"> = {
  name: "Wrapped Ethereum",
  symbol: "WETH",
  decimals: 18,
  oraclePriceIndex: 1,
};

export const USDC: Omit<Asset, "address"> = {
  name: "USD Coin",
  symbol: "USDC",
  decimals: 18,
  oraclePriceIndex: 2,
};

export const assets: Record<ChainId, Asset[]> = {
  [arbitrumSepolia.id]: [
    {
      ...WBTC,
      address: process.env.ARBITRUM_SEPOLIA_WBTC_ADDRESS!,
    },
    {
      ...WETH,
      address: process.env.ARBITRUM_SEPOLIA_WETH_ADDRESS!,
    },
    {
      ...USDC,
      address: process.env.ARBITRUM_SEPOLIA_USDC_ADDRESS!,
    },
  ],
  [baseSepolia.id]: [
    {
      ...WBTC,
      address: process.env.BASE_SEPOLIA_WBTC_ADDRESS!,
    },
    {
      ...WETH,
      address: process.env.BASE_SEPOLIA_WETH_ADDRESS!,
    },
    {
      ...USDC,
      address: process.env.BASE_SEPOLIA_USDC_ADDRESS!,
    },
  ],
  [scrollSepolia.id]: [
    {
      ...WBTC,
      address: process.env.SCROLL_SEPOLIA_WBTC_ADDRESS!,
    },
    {
      ...WETH,
      address: process.env.SCROLL_SEPOLIA_WETH_ADDRESS!,
    },
    {
      ...USDC,
      address: process.env.SCROLL_SEPOLIA_USDC_ADDRESS!,
    },
  ],
  [morphHolesky.id]: [
    {
      ...WBTC,
      address: process.env.MORPH_HOLESKY_WBTC_ADDRESS!,
    },
    {
      ...WETH,
      address: process.env.MORPH_HOLESKY_WETH_ADDRESS!,
    },
    {
      ...USDC,
      address: process.env.MORPH_HOLESKY_USDC_ADDRESS!,
    },
  ],
  [zircuitTestnet.id]: [
    {
      ...WBTC,
      address: process.env.ZIRCUIT_TESTNET_WBTC_ADDRESS!,
    },
    {
      ...WETH,
      address: process.env.ZIRCUIT_TESTNET_WETH_ADDRESS!,
    },
    {
      ...USDC,
      address: process.env.ZIRCUIT_TESTNET_USDC_ADDRESS!,
    },
  ],
};
