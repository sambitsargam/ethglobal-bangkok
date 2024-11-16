# InnoFi - Cross-Chain Lending Platform

**InnoFi** is a decentralized cross-chain lending platform that allows users to borrow against collateral, including unpaid invoices for small businesses. With features like on-chain credit scores, multi-source price feeds, and rewards using on **Pyth Entropy**, InnoFi ensures secure, efficient, and transparent lending.


## Key Features

- **Cross-Chain Lending**:  
  InnoFi enables borrowing and lending across multiple blockchain networks, allowing users to deposit collateral on one chain and borrow funds from another, eliminating the need for bridging.

- **Flexible Collateral Options**:  
  Users can deposit various collateral types such as **USDC**, **WBTC**, **WETH**, or **unpaid invoices**, providing flexibility for both individual users and small businesses.

- **On-Chain Credit Scoring**:  
  InnoFi utilizes **BlocksOut Explorer**'s API to fetch real-time **on-chain credit scores**, ensuring fair and accurate loan eligibility assessments.

- **Real-Time Price Feeds**:  
  Reliable price feeds are sourced from **Pyth Network** and **Flare Network**'s **FTSO**, ensuring accurate asset valuations for collateral and loans across different chains.

- **Rewards Based on Pyth Entropy**:  
  **Pyth Entropy** is used to reward borrowers based on the **entropy** (level of unpredictability or variance) in asset prices. Borrowers who repay on time and engage with the platform in a manner that helps stabilize or reduce market volatility are rewarded.

- **Subscription for Credit Score Access**:  
  Users can access their **on-chain credit scores** for free up to three times. After that, they must subscribe through **Gnosis Pay** for unlimited access to their credit score and other premium features.


## How It Works

### **Creating a Lending Pool**
Liquidity providers can create lending pools by supplying collateral for specific debt tokens. When setting up a pool, they define the following parameters:
- Loan-to-value (LTV) ratio
- Annual percentage rate (APR)
- Debt token (e.g., USDC, WBTC)

### **Collateral Deposit & Loan Issuance**
1. **Borrowers** deposit collateral (crypto or invoices) into the platform.
2. The **smart contract** locks the collateral and issues a loan on a different blockchain (cross-chain functionality).
3. **On-chain credit scores** fetched via **BlocksOut API** determine the borrower's loan eligibility.

### **Repayment & Rewards**
- Borrowers can repay their loans early. Upon repayment, the collateral is released.
- **Timely repayments** are rewarded with **Pyth Entropy**-based rewards:
  - The system uses **Pyth’s entropy** measure, which quantifies the unpredictability of asset prices, to determine how borrowers contribute to price stability. Users who engage in low-entropy behavior (i.e., acting in ways that reduce market volatility or helping maintain price predictability) receive rewards.
  - Rewards can include **lower interest rates**, **loyalty tokens**, or **other incentives**.

### **Cross-Chain Functionality**
- **LayerZero** enables cross-chain communication, ensuring smooth transactions between collateral deposits and loan disbursements, even when they occur on different blockchain networks.


## Reward System Powered by Pyth Entropy

InnoFi uses **Pyth Entropy** as a mechanism for rewarding responsible and strategic borrowing behavior. **Pyth Network**, which provides accurate and decentralized price feeds, also calculates **price entropy** across multiple assets. 

- **Entropy Calculation**: The **entropy** of an asset measures the unpredictability or randomness of its price. Low entropy corresponds to stable prices, while high entropy indicates high volatility.
  
- **Reward Logic**:
  - **Timely Repayment**: Borrowers who repay loans on time reduce market volatility by ensuring assets are efficiently used and repaid. These users are rewarded based on the entropy of their chosen collateral’s price data.
  - **Low Entropy Behavior**: Users who contribute to stabilizing asset prices (e.g., by choosing less volatile assets or repaying early) are rewarded with incentives.
  - **Incentive Types**: Users can receive **discounted interest rates**, **loyalty rewards**, or **platform tokens** for contributing to the platform's stability.

This reward system encourages borrowers to engage with the platform responsibly, fostering a sustainable and less volatile lending ecosystem.


## Functionality and Contract Overview

InnoFi's core functionality is governed by smart contracts. Key functions can be explored in the **`contracts/`** folder:

- `createPool()`: Creates a new lending pool with parameters like LTV, APR, and debt token.
- `depositCollateral()`: Allows users to deposit collateral (e.g., crypto or invoices).
- `issueLoan()`: Issues a loan based on the collateral and the borrower’s credit score.
- `repayLoan()`: Allows the borrower to repay the loan and unlock collateral.
- `checkCreditScore()`: Fetches the borrower’s credit score using **BlocksOut Explorer API**.
- `calculateEntropy()`: Calculates the price entropy for collateral assets, which is used to reward low-entropy behavior.
- `distributeRewards()`: Distributes rewards based on timely repayments and entropy calculations.


## Technologies Used

- **LayerZero**: Cross-chain communication for seamless transactions across blockchain networks.
- **BlocksOut Explorer API**: For fetching on-chain credit scores.
- **Pyth Network**: Provides real-time price feeds and entropy calculations for asset stability.
- **Flare Network’s FTSO & Chronicle Protocol**: For decentralized price data aggregation.
- **Gnosis Pay**: To handle subscription-based payments for unlimited credit score checks.
- **OnchainKit (Coinbase Developer Platform)**: For building the platform’s smart contracts and decentralized application.

## Contributing

Contributions are welcome! Fork this repository, create a new branch, and submit a pull request with your changes. Please ensure your contributions are well-tested and follow the project’s coding standards.


## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

