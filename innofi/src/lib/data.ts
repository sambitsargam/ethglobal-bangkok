import { arbitrumSepolia } from "viem/chains";
import { assets } from "@/lib/assets";
import { Loan, Pool } from "@/lib/types";

// Utility function to get the current timestamp in seconds
const getCurrentTimestamp = (): BigInt => BigInt(Math.round(Date.now() / 1000));

// Utility function to create a pool
const createPool = (
  chainId: number,
  assetIndex: number,
  collateralAssetIndex: number,
  apr: number,
  amount: BigInt,
  ltv: BigInt
): Pool => ({
  chainId,
  asset: assets[chainId][assetIndex],
  amount,
  owner: process.env.DEFAULT_POOL_OWNER!,
  address: process.env.DEFAULT_POOL_ADDRESS!,
  apr: BigInt(apr),
  expireDate: getCurrentTimestamp() + BigInt(60 * 60 * 24 * 30), // 30 days from now
  dstPoolAddress: process.env.DEFAULT_DST_POOL_ADDRESS!,
  collateralChainId: chainId,
  collateralAsset: assets[chainId][collateralAssetIndex],
  ltv,
});

// Utility function to create a loan
const createLoan = (amount: BigInt, collateralAmount: BigInt, pool: Pool): Loan => ({
  amount,
  collateralAmount,
  startDate: BigInt(Date.now()),
  owner: process.env.DEFAULT_LOAN_OWNER!,
  pool,
});

export const pools: Pool[] = [
  createPool(arbitrumSepolia.id, 0, 1, 1, BigInt(1000000000000000000), BigInt(5)),
  createPool(arbitrumSepolia.id, 0, 1, 2, BigInt(1000000000000000000), BigInt(5)),
  createPool(arbitrumSepolia.id, 0, 1, 2, BigInt(1000000000000000000), BigInt(5)),
  createPool(arbitrumSepolia.id, 0, 1, 2, BigInt(1000000000000000000), BigInt(5)),
  createPool(arbitrumSepolia.id, 0, 1, 2, BigInt(1000000000000000000), BigInt(5)),
];

export const loans: Loan[] = [
  createLoan(BigInt(1000000000000000000), BigInt(800000), pools[0]),
  createLoan(BigInt(1000000000000000000), BigInt(800000), pools[0]),
  createLoan(BigInt(1000000000000000000), BigInt(800000), pools[0]),
  createLoan(BigInt(1000000000000000000), BigInt(800000), pools[0]),
  createLoan(BigInt(1000000000000000000), BigInt(800000), pools[0]),
];
