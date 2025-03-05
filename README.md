# 🧩 Dynamic Demo — NFT Minting, Account Abstraction, and JWT Authentication

## Overview

This demo showcases a full integration of the [Dynamic Labs SDK](https://docs.dynamic.xyz/) within a React app, designed to help evaluate Dynamic's features while addressing common concerns from teams new to Web3:

- ✅ Mint NFTs using Dynamic’s embedded wallet.
- ✅ Explain and support account abstraction (with gas fee handling).
- ✅ Implement secure, cookie-based JWT authentication.
- ✅ Pass and verify Dynamic tokens with a backend.
- ✅ Run entirely in a local development environment.

This project is also designed with **PHP developers in mind**, with clear, simple code and documentation.

---

## 🚀 Features

| Feature                  | Status  | Description                                                             |
|--------------------------|---------|-------------------------------------------------------------------------|
| NFT Minting             | ✅ Done | Mint NFTs on **Polygon Amoy Testnet** using Dynamic's embedded wallet.  |
| Account Abstraction     | ✅ Done | Explanation and setup via Dynamic with EIP-4337 benefits.               |
| JWT Authentication      | ✅ Done | Secure authentication with `user.getToken()` to a local backend.        |
| Token Verification      | ✅ Done | Backend verifies JWT from Dynamic using the public key.                 |
| Local Development Setup | ✅ Done | Fully functional local testing environment.                             |

---

## 🛠️ Tech Stack

- **Frontend:** React (Vite), TypeScript, Viem, Dynamic Labs SDK, Axios
- **Backend:** Express (Node.js) for JWT verification
- **Blockchain:** Polygon Amoy Testnet

---

## 🏗️ Project Structure

dynamic-demo/ ├── client/ # Frontend React app │ ├── src/ │ │ ├── App.tsx │ │ ├── mintNFT.ts │ │ ├── chains.ts │ │ ├── constants.ts │ │ └── ... ├── server/ # Backend API (Express) │ ├── index.js ├── package.json └── README.md


---

## ⚡ Local Setup Instructions

### 1. Clone the repo
```bash
git clone https://github.com/Maximilian-wav/dynamic-demo.git
cd dynamic-demo

~~~

### 2. Install dependencies

# Frontend
cd client
npm install

# Backend
cd ../server
npm install

~~~~
###3. Start local servers 

# Start backend (port 5000)
cd server
npm run dev

# Start frontend (port 5173)
cd ../client
npm run dev

~~~

🔑 Authentication Flow

User logs in via Dynamic.
Dynamic issues a JWT using user.getToken().
Frontend sends the JWT to the backend (POST /api/auth).
Backend verifies the JWT and establishes a session (cookie-based).
✅ You’re authenticated!

~~~

🎨 NFT Minting Flow

Network: Polygon Amoy Testnet (Chain ID 80002)
Contract: Replace CONTRACT_ADDRESS in /client/src/constants.ts.
ABI: Replace CONTRACT_ABI with your contract's ABI.
How it works:
Connect wallet via Dynamic.
Authenticate with backend (JWT verification).
Click the "Mint NFT" button.
Transaction is signed and sent using Viem + Dynamic's wallet client.
✅ NFT minted!
⚠️ Note: Ensure your wallet has enough testnet MATIC to cover gas fees.

~~~

🧠 Account Abstraction (EIP-4337)

Dynamic supports account abstraction via smart contract wallets, enabling:

🆓 Gasless transactions (paid by sponsor).
🛠️ Transaction bundling (batch multiple actions).
🔑 Session keys (temporary delegated permissions).
🔄 Recovery options (e.g., social recovery).
With Dynamic, these features can enhance UX by hiding complex blockchain operations from users who may not be familiar with gas, private keys, or wallets.

~~~

🧑‍💻 For PHP Developers (React/JS Newcomers)

This demo is built to be beginner-friendly:

Dynamic handles wallet connections and user sessions.
Viem manages blockchain calls (minting NFTs).
Axios sends HTTP requests to the backend.
Express handles JWT verification and sessions.
The code is clean, commented, and modular to make it easy to follow.

~~~

✅ Next Steps

 Test NFT minting with funded wallets.
 Deploy to staging/production.
 (Optional) Set up a custom domain for cookie-based authentication in production via Dynamic’s hostname feature.
 Style the frontend for a production-ready look.

 ~~~

 🙌 Credits

Built with ❤️ by Maximilian Albekier
Powered by Dynamic Labs

~~~

📝 License

This project is for demonstration purposes only and provided "as-is."

