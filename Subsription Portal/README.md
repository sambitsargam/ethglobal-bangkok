# Onchain Subscription Portal

This application allows small businesses to subscribe to access their Onchain Credit Score, with different subscription plans (Silver, Gold, Platinum), and offers a DeFi dashboard for lending/borrowing based on the score.

## Features:
- **Subscription Plans**: Silver (30 days), Gold (6 months), and Platinum (1 year).
- **OnchainKit Integration**: 
  - **Checkout** for crypto payments (USDC).
  - **Wallet** for wallet funding.
  - **Identity** for viewing Onchain Ens Details .
- **CDP SDK Integration**: 
  - Enables lending/borrowing based on Onchain Credit Score.
  - Programmatic on-chain interactions (collateral management, loan triggering).
  
## Used Technologies:
- **OnchainKit**: For checkout, wallet, and on-chain Identity.
- **CDP SDK**: For collateralized debt positions and DeFi functionality.

## Setup:
1. Clone the repository.
2. Install dependencies: `npm install`.
3. Set up environment variables.
4. Run: `npm run dev`.

