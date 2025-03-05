import { encodeFunctionData, WalletClient } from 'viem';
import { polygonAmoy } from './chains';
import { CONTRACT_ADDRESS, CONTRACT_ABI } from './constants';

export async function mintNFT(
  userAddress: `0x${string}`,
  walletClient: WalletClient
) {
  try {
    const data = encodeFunctionData({
      abi: CONTRACT_ABI,
      functionName: 'mint',
      args: [userAddress],
    });

    const txHash = await walletClient.sendTransaction({
      account: userAddress,
      chain: polygonAmoy,
      to: CONTRACT_ADDRESS,
      data,
    });

    console.log('✅ NFT Minted! Transaction hash:', txHash);
    return txHash;
  } catch (error) {
    console.error('❌ Minting failed:', error);
    throw error;
  }
}