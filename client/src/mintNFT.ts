import { createWalletClient, http, encodeFunctionData } from 'viem';
import { polygonAmoy } from './chains';
import { CONTRACT_ADDRESS, CONTRACT_ABI } from './constants';

export async function mintNFT(userAddress: `0x${string}`, walletClient: any) {
  try {
    const data = encodeFunctionData({
      abi: CONTRACT_ABI,
      functionName: 'mint',
      args: [userAddress],
    });

    const txHash = await walletClient.sendTransaction({
      chain: polygonAmoy,
      account: userAddress,
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
