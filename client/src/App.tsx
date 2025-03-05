import { useEffect, useState } from 'react';
import axios from 'axios';
import { DynamicWidget, useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { Address, WalletClient } from 'viem';
import { mintNFT } from './mintNFT';
import './App.css';

export default function App() {
  const { primaryWallet, user } = useDynamicContext();
  const isAuthenticated = !!primaryWallet;
  const [isMinting, setIsMinting] = useState(false);
  const [mintStatus, setMintStatus] = useState<string | null>(null);

  useEffect(() => {
    const authenticateWithBackend = async () => {
      const userWithToken = user as typeof user & { getToken?: () => Promise<string> };
      if (!userWithToken?.getToken) return;
      const jwtToken = await userWithToken.getToken();

      try {
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
    const walletClient = await (primaryWallet.connector as { getWalletClient?: () => Promise<WalletClient> })?.getWalletClient?.();
    if (!walletClient) return alert('❌ Wallet client unavailable');

    console.log('🎨 Minting NFT for address:', userAddress);

    setIsMinting(true);
    setMintStatus(null);

    try {
      const txHash = await mintNFT(userAddress, walletClient);
      setMintStatus(`✅ Success! Tx Hash: ${txHash}`);
    } catch (error) {
      console.error('❌ Minting failed:', error);
      setMintStatus('❌ Minting failed.');
    } finally {
      setIsMinting(false);
    }
  };

  return (
    <div className="container">
      <header>
        <h1>Dynamic NFT Minting Demo</h1>
      </header>

      <div className="center-container">
        <DynamicWidget />
      </div>

      <div className="status-badges">
        <div className="badge">Network: Polygon Amoy</div>
        {primaryWallet && (
          <div className="badge">
            Connected: {`${primaryWallet.address.slice(0, 6)}...${primaryWallet.address.slice(-4)}`}
          </div>
        )}
        {mintStatus && <div className="badge">{mintStatus}</div>}
      </div>

      {isAuthenticated && (
        <>
          <button className="mint-btn" onClick={handleMint}>Mint NFT</button>
          {isMinting && <div className="loader"></div>}
        </>
      )}

      <footer className="footer">
        <p>
          <a href="https://docs.dynamic.xyz/" target="_blank">Dynamic Docs</a> |{' '}
          <a href="https://polygon.technology/" target="_blank">Polygon</a> |{' '}
          <a href="https://github.com/Maximilian-wav/dynamic-demo" target="_blank">GitHub Repo</a>
        </p>
        <p>Built with ❤️ by Maximilian Albekier</p>
      </footer>
    </div>
  );
}
