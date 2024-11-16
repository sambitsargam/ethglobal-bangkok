import {
  arbitrumSepolia,
  baseSepolia,
  // mainnet,
  morphHolesky,
  scrollSepolia,
  // sepolia,
  zircuitTestnet,
} from "viem/chains";

import { ChainId } from "@/lib/types";

export const POOL_SRC_FACTORY_ADDRESS: Record<ChainId, `0x${string}`> = {
  [arbitrumSepolia.id]: process.env.ARBITRUM_SEPOLIA_SRC_FACTORY_ADDRESS as `0x${string}`,
  [baseSepolia.id]: process.env.BASE_SEPOLIA_SRC_FACTORY_ADDRESS as `0x${string}`,
  [scrollSepolia.id]: process.env.SCROLL_SEPOLIA_SRC_FACTORY_ADDRESS as `0x${string}`,
  [morphHolesky.id]: process.env.MORPH_HOLESKY_SRC_FACTORY_ADDRESS as `0x${string}`,
  [zircuitTestnet.id]: process.env.ZIRCUIT_TESTNET_SRC_FACTORY_ADDRESS as `0x${string}`,
};

export const POOL_DST_FACTORY_ADDRESS: Record<ChainId, `0x${string}`> = {
  [arbitrumSepolia.id]: process.env.ARBITRUM_SEPOLIA_DST_FACTORY_ADDRESS as `0x${string}`,
  [baseSepolia.id]: process.env.BASE_SEPOLIA_DST_FACTORY_ADDRESS as `0x${string}`,
  [scrollSepolia.id]: process.env.SCROLL_SEPOLIA_DST_FACTORY_ADDRESS as `0x${string}`,
  [morphHolesky.id]: process.env.MORPH_HOLESKY_DST_FACTORY_ADDRESS as `0x${string}`,
  [zircuitTestnet.id]: process.env.ZIRCUIT_TESTNET_DST_FACTORY_ADDRESS as `0x${string}`,
};

export const ORACLE_ADDRESS: Record<ChainId, `0x${string}`> = {
  [arbitrumSepolia.id]: process.env.ARBITRUM_SEPOLIA_ORACLE_ADDRESS as `0x${string}`,
  [baseSepolia.id]: process.env.BASE_SEPOLIA_ORACLE_ADDRESS as `0x${string}`,
  [scrollSepolia.id]: process.env.SCROLL_SEPOLIA_ORACLE_ADDRESS as `0x${string}`,
  [morphHolesky.id]: process.env.MORPH_HOLESKY_ORACLE_ADDRESS as `0x${string}`,
  [zircuitTestnet.id]: process.env.ZIRCUIT_TESTNET_ORACLE_ADDRESS as `0x${string}`,
};
