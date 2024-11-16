# InnoFi - Cross-Chain Lending Platform

**InnoFi** is a decentralized cross-chain lending platform that allows users to borrow against collateral, including unpaid invoices for small businesses. With features like on-chain credit scores, multi-source price feeds, rewards based on **Pyth Entropy**, and secure user authentication, InnoFi ensures a seamless and transparent lending experience. Currently, InnoFi is available on multiple testnets, making it accessible for developers and early adopters.


## Key Features

- **Cross-Chain Lending**:  
  InnoFi enables borrowing and lending across multiple blockchain networks, allowing users to deposit collateral on one chain and borrow funds from another, removing the need for bridging and reducing transaction fees.

- **Flexible Collateral Options**:  
  Users can deposit a variety of collateral types such as **USDC**, **WBTC**, **WETH**, and even **unpaid invoices** from small businesses, offering flexibility for individual users and businesses alike.

- **On-Chain Credit Scoring**:  
  InnoFi fetches real-time **on-chain credit scores** through **BlocksOut Explorer**’s API to determine loan eligibility, ensuring a fair and decentralized credit system.

- **Real-Time Price Feeds**:  
  Multi-source price feeds are sourced from **Pyth Network** and **Flare Network’s FTSO**. **Chronicle Protocol** ensures that the data across different blockchains remains reliable and consistent, enabling accurate asset valuations for collateral and loans.

- **Rewards Based on Pyth Entropy**:  
  Borrowers are rewarded based on **Pyth Entropy**, which measures the unpredictability of asset prices. Low-entropy behavior, such as stable price assets or responsible borrowing, results in rewards like **discounted interest rates** and **loyalty tokens**.

- **Secure Login with World ID & Dynamic Social Login**:  
  **World ID** is used to verify that the user is a real person, ensuring a trustworthy and authentic lending environment. **Dynamic** is integrated for easy social login through platforms like **Google** and **Facebook**, allowing users to quickly access the platform with a familiar authentication process.

- **Subscription for Credit Score Access**:  
  Users can check their **on-chain credit score** up to three times for free. After that, a subscription through **Gnosis Pay** is required for unlimited score checks and premium features.


## How It Works

### **Creating a Lending Pool**
Liquidity providers can create lending pools by supplying collateral for specific debt tokens. When setting up a pool, they define the following parameters:
- Loan-to-value (LTV) ratio
- Annual percentage rate (APR)
- Debt token (e.g., USDC, WBTC)

### **Collateral Deposit & Loan Issuance**
1. **Borrowers** deposit collateral (crypto or invoices) into the platform.
2. The **smart contract** locks the collateral and issues a loan on the corresponding blockchain network.
3. **On-chain credit scores** fetched via **BlocksOut API** determine the eligibility for loans.

### **Repayment & Rewards**
- Borrowers can repay loans early, at which point their collateral is unlocked.
- **Timely repayments** result in **Pyth Entropy-based rewards**, which include:
  - Lower interest rates for future loans.
  - Loyalty tokens or platform incentives for responsible borrowing.
  - Stable price behavior, leading to lower volatility in the lending ecosystem.

### **Cross-Chain Communication**
- **LayerZero** facilitates seamless cross-chain communication for collateral deposits and loan disbursements between different blockchain networks.


## Reward System Powered by Pyth Entropy

InnoFi’s **Pyth Entropy**-based reward system encourages responsible borrowing behavior by rewarding users based on the volatility or stability of their collateral assets. **Pyth Network** calculates **price entropy** across different assets, with lower entropy correlating to more stable price behavior.

- **Entropy Calculation**: Measures the unpredictability of asset prices. Assets with lower entropy are considered more stable, while higher entropy indicates greater volatility.
- **Reward Logic**: Borrowers who engage with the platform in a manner that stabilizes or reduces market volatility are rewarded with incentives, such as **discounted interest rates** or **loyalty tokens**.


## Authentication & Social Login

### **World ID**
**World ID** ensures that users are verified as real individuals, helping to maintain a trustworthy and secure environment for all transactions on the platform.

### **Dynamic Social Login**
**Dynamic** is used to enable quick social logins, allowing users to sign in easily using their existing accounts from platforms like **Google**, **Facebook**, and others, providing a frictionless user experience.

## Supported Networks

InnoFi is available on the following testnets for developers and early users to test and explore the platform:
- **Flow Testnet**
- **Scroll Sepolia Testnet**
- **Base Sepolia Testnet**
- **Arbitrum Sepolia Testnet**
- **Morph Testnet**
- **Zircuit Testnet**

## Technologies Used

- **LayerZero**: Cross-chain communication for seamless transactions across blockchain networks.
- **BlocksOut Explorer API**: Fetches on-chain credit scores.
- **Pyth Network**: Provides real-time price feeds and entropy calculations for asset stability.
- **Flare Network’s FTSO & Chronicle Protocol**: Ensures reliable price data aggregation across different blockchains.
- **World ID**: Verifies user authenticity to ensure real person validation.
- **Dynamic**: Social login integration for quick user authentication.
- **Gnosis Pay**: Handles subscription payments for unlimited credit score checks.
- **OnchainKit (Coinbase Developer Platform)**: Tools for smart contract and dApp development.

## Contributing

Contributions are welcome! Fork this repository, create a new branch, and submit a pull request with your changes. Be sure to test your changes thoroughly and follow the project’s coding standards.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
