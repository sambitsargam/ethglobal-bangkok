import { getAddress } from 'viem';
import { SAFE_ABI } from './abi-safe';
import { createPublicClient, http } from 'viem';
import { gnosis } from 'viem/chains';

const publicClient = createPublicClient({
  chain: gnosis,
  transport: http(),
});

const DELAY_MOD_MASTERCOPY = '0xd54895b1121a2ee3f37b502f507631fa1331bed6';

const SENTINEL_ADDRESS = '0x0000000000000000000000000000000000000001';

export function isGenericProxy(bytecode) {
  if (bytecode.length !== 92) return false;
  return (
    bytecode.startsWith('0x363d3d373d3d3d363d73') &&
    bytecode.endsWith('5af43d82803e903d91602b57fd5bf3')
  );
}

export function getGenericProxyMastercopy(bytecode) {
  if (!isGenericProxy(bytecode)) return null;
  return '0x' + bytecode.substring(22, 22 + 40);
}

export function isDelayModule(bytecode) {
  return (
    getAddress(getGenericProxyMastercopy(bytecode)) ===
    getAddress(DELAY_MOD_MASTERCOPY)
  );
}

export async function getDelayModule(address) {
  const [moduleAddresses] = await publicClient.readContract({
    abi: SAFE_ABI,
    address,
    functionName: 'getModulesPaginated',
    args: [SENTINEL_ADDRESS, 10],
  });

  const modules = await Promise.all(
    moduleAddresses.map(async (address) => ({
      address,
      bytecode: await publicClient.getBytecode({
        address,
      }),
    }))
  );

  const delayMod = modules.find((module) =>
    isDelayModule(module.bytecode)
  )?.address;

  return delayMod;
}
