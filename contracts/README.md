# Cross-Chain Pool and Oracle System

This repository contains smart contracts that facilitate cross-chain interactions, oracle integrations, and a decentralized pool system. It is built using Solidity and relies on various frameworks and libraries for functionality.

## Overview

The project provides the following features:

1. **Cross-Chain Pools**: Contracts to manage decentralized source (`SrcPool`) and destination (`DstPool`) liquidity pools.
2. **Oracle Integrations**: Fetch and process data from multiple oracles like Pyth, Flare, and Chronicle.
3. **Factories**: Deployment and management of pool contracts through factory patterns for both source and destination pools.

## Contracts

### 1. **DstPool**
- Manages collateral deposits on the destination chain.
- Supports loan issuance and repayment using the LayerZero messaging protocol.

### 2. **SrcPool**
- Manages loans and collateral on the source chain.
- Uses randomness (e.g., `IEntropy`) to assign rewards for loan repayments.
- Connects with an oracle to fetch price data for collateral and debt calculations.

### 3. **Pool Factories**
- **`PoolDstFactory`**: Deploys and tracks `DstPool` instances.
- **`PoolSrcFactory`**: Deploys and manages `SrcPool` instances, including listing and ownership transfer features.

### 4. **Oracles**
- **PythOracle**: Integrates with the Pyth Network for price feeds.
- **FlareOracle**: Fetches data from the Flare Network.
- **ChronicleOracle**: Provides price feeds from the Chronicle oracle.
- **Oracle**: A custom contract to aggregate and validate price data from multiple sources.

#### Interact with Contracts
Use the Hardhat console or scripts to interact with the deployed contracts.

### Features

1. **Collateral Management**: Lock collateral for loans and retrieve it upon repayment.
2. **Cross-Chain Messaging**: Utilize LayerZero for seamless cross-chain communication.
3. **Random Rewards**: Reward borrowers with random amounts for timely loan repayments.
4. **Price Validation**: Aggregate and validate price data from multiple oracle sources.

### Contract Details

- **DstPool.sol**: Manages destination chain operations.
- **SrcPool.sol**: Handles source chain loans and repayments.
- **PoolDstFactory.sol**: Deploys `DstPool` instances.
- **PoolSrcFactory.sol**: Manages `SrcPool` lifecycle and listing.
- **Oracle.sol**: Aggregates and validates prices.
- **PythOracle.sol**: Fetches data from the Pyth Network.
- **FlareOracle.sol**: Fetches data from the Flare Network.
- **ChronicleOracle.sol**: Integrates with the Chronicle oracle.

### Licensing

This project is licensed under the MIT License. See the `LICENSE` file for details.

