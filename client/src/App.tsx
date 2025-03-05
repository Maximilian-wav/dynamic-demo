import { useEffect } from 'react';
import axios from 'axios';
import { DynamicWidget, useDynamicContext, UserProfile } from "@dynamic-labs/sdk-react-core"; // ✅ Add UserProfile import
import { Address, WalletClient } from 'viem';
import { mintNFT } from './mintNFT';

// ✅ Fix: extend UserProfile instead of referencing user directly
type UserWithToken = UserProfile & { getToken?: () => Promise<string> };

export default function App() {
  const { primaryWallet, user } = useDynamicContext();
  const isAuthenticated = !!primaryWallet;

  useEffect(() => {
    const authenticateWithBackend = async () => {
      const userWithToken = user as UserWithToken;

      if (!userWithToken?.getToken) {
        console.log('ℹ️ No getToken method found. Skipping backend auth.');
        return;
      }

      try {
        const jwtToken = await userWithToken.getToken();
        await axios.post(
          'http://localhost:5000/api/auth',
          { token: jwtToken },
          { withCredentials: true }
        );
        console.log('✅ Successfully authenticated with backend');
      } catch (error) {
        console.error('❌ Backend authentication failed:', error);
      }
    };

    authenticateWithBackend();
  }, [user]);

  const handleMint = async () => {
    if (!primaryWallet) {
      alert('Please connect a wallet first!');
      return;
    }

    const userAddress = primaryWallet.address as Address;

    const walletClient = await (primaryWallet.connector as {
      getWalletClient?: () => Promise<WalletClient>;
    })?.getWalletClient?.();

    if (!walletClient) {
      alert('❌ Wallet client unavailable');
      return;
    }

    console.log('🎨 Minting NFT for address:', userAddress);

    try {
      const txHash = await mintNFT(userAddress, walletClient);
      alert(`✅ NFT Minted! Tx Hash: ${txHash}`);
    } catch (error) {
      console.error('❌ NFT minting failed:', error);
      alert('❌ NFT minting failed. Check console for details.');
    }
  };

  return (
    <div>
      <DynamicWidget />
      {isAuthenticated && (
        <button onClick={handleMint}>
          Mint NFT
        </button>
      )}
    </div>
  );
}
