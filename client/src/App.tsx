import { DynamicWidget, useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { Address } from 'viem';
import { mintNFT } from './mintNFT';

export default function App() {
  const { primaryWallet } = useDynamicContext();
  const isAuthenticated = !!primaryWallet;

  const handleMint = async () => {
    if (!primaryWallet) {
      alert('Please connect a wallet first!');
      return;
    }

    const userAddress = primaryWallet.address as Address;
    console.log('🎨 Minting NFT for address:', userAddress);

    try {
      const walletClient = await primaryWallet.connector.getWalletClient();

      const txHash = await mintNFT(userAddress, walletClient);
      alert(`✅ NFT Minted! Tx Hash: ${txHash}`);
    } catch (error) {
      alert('❌ Error minting NFT. See console for details.');
      console.error('Error minting NFT:', error);
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
