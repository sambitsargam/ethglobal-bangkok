// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {OApp, MessagingFee, Origin} from "@layerzerolabs/lz-evm-oapp-v2/contracts/oapp/OApp.sol";
import {MessagingReceipt} from "@layerzerolabs/lz-evm-oapp-v2/contracts/oapp/OAppSender.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {IOracle} from "./interfaces/oracles/IOracle.sol";
import {IEntropy} from "@pythnetwork/entropy-sdk-solidity/IEntropy.sol";
import {IEntropyConsumer} from "@pythnetwork/entropy-sdk-solidity/IEntropyConsumer.sol";

contract SrcPool is OApp, Ownable, IEntropyConsumer {
    uint16 public constant SEND = 1;

    struct PoolMetadata {
        uint32 dstChainId;
        address dstPoolAddress;
        address poolOwner;
        uint256 poolBalance;
        address poolToken; // USDC token
        address oracleAddress;
        uint256[] oraclePricesIndex;
        address collateralToken;
        uint256 ltv;
        uint256 apr;
        uint256 expiry;
    }

    PoolMetadata public poolMetadata;

    struct Loan {
        uint256 amount;
        uint256 collateral;
        uint256 startTime;
        address borrower;
    }

    mapping(address => Loan) public loans;

    IEntropy public entropy; // Randomness provider contract

    event RewardAssigned(address indexed borrower, uint256 reward);

    constructor(
        address _endpoint,
        address _delegate,
        uint32 _dstChainId,
        address _dstPoolAddress,
        address _poolToken, // USDC token address
        address _oracleAddress,
        uint256[] memory _oraclePricesIndex,
        address _collateralToken,
        uint256 _ltv,
        uint256 _apr,
        uint256 _expiry,
        address _entropyAddress
    ) OApp(_endpoint, _delegate) Ownable(_delegate) {
        poolMetadata.dstChainId = _dstChainId;
        poolMetadata.dstPoolAddress = _dstPoolAddress;
        poolMetadata.poolOwner = _delegate;
        poolMetadata.poolToken = _poolToken; // USDC
        poolMetadata.oracleAddress = _oracleAddress;
        poolMetadata.oraclePricesIndex = _oraclePricesIndex;
        poolMetadata.collateralToken = _collateralToken;
        poolMetadata.ltv = _ltv;
        poolMetadata.apr = _apr;
        poolMetadata.expiry = _expiry;

        poolMetadata.poolBalance = 0;

        entropy = IEntropy(_entropyAddress); // Initialize entropy provider
    }

    function repayLoan(bytes calldata _extraSendOptions) external payable returns (MessagingReceipt memory receipt) {
        require(loans[msg.sender].amount > 0, "Pool: no loan to repay");
        require(block.timestamp <= poolMetadata.expiry, "Pool: loan expired");
        require(
            IERC20(poolMetadata.poolToken).balanceOf(msg.sender) >= getRepaymentAmount(msg.sender),
            "Pool: insufficient balance"
        );

        uint256 totalRepayment = getRepaymentAmount(msg.sender);
        poolMetadata.poolBalance += totalRepayment;

        bytes memory options = combineOptions(
            poolMetadata.dstChainId,
            SEND,
            _extraSendOptions
        );

        require(
            IERC20(poolMetadata.poolToken).transferFrom(
                msg.sender,
                address(this),
                totalRepayment
            ),
            "Pool: transfer failed"
        );
        delete loans[msg.sender];

        // Generate randomness for reward
        bytes32 userSeed = keccak256(abi.encodePacked(msg.sender, block.timestamp));
        uint256 fee = entropy.getFee(entropy.getDefaultProvider());

        entropy.requestWithCallback{value: fee}(
            entropy.getDefaultProvider(),
            userSeed
        );

        bytes memory payload = abi.encode(msg.sender);
        MessagingFee memory feeEstimate = _quote(
            poolMetadata.dstChainId,
            payload,
            options,
            false
        );
        receipt = _lzSend(
            poolMetadata.dstChainId,
            payload,
            options,
            feeEstimate,
            payable(msg.sender)
        );
    }

    function entropyCallback(
        uint64 sequenceNumber,
        address provider,
        bytes32 randomNumber
    ) internal override {
        require(msg.sender == address(entropy), "Unauthorized entropy callback");

        uint256 reward = (uint256(randomNumber) % 5) + 1; // Random number between 1 and 5 USDC
        require(
            IERC20(poolMetadata.poolToken).balanceOf(address(this)) >= reward * 10**6,
            "Pool: insufficient reward balance"
        );

        // Transfer the reward to the user
        require(
            IERC20(poolMetadata.poolToken).transfer(msg.sender, reward * 10**6),
            "Pool: reward transfer failed"
        );

        emit RewardAssigned(msg.sender, reward);
    }

    function getRepaymentAmount(address _sender) public view returns (uint256) {
        Loan storage loan = loans[_sender];
        require(loan.amount > 0, "Pool: no loan to repay");

        uint256 interest = (loan.amount *
            poolMetadata.apr *
            (block.timestamp - loan.startTime)) / (10000 * 365 days);

        return loan.amount + interest;
    }

    function getLoanAmount(
        uint256 collateral
    ) public view returns (uint256 loanAmount) {
        uint256 poolPrice = IOracle(poolMetadata.oracleAddress).getPrice(
            poolMetadata.oraclePricesIndex[0]
        );
        uint256 debtPrice = IOracle(poolMetadata.oracleAddress).getPrice(
            poolMetadata.oraclePricesIndex[1]
        );

        loanAmount =
            (collateral * debtPrice * poolMetadata.ltv) /
            (poolPrice * 10000);
    }

    function _lzReceive(
        Origin calldata /*_origin*/,
        bytes32 /*_guid*/,
        bytes calldata payload,
        address /*_executor*/,
        bytes calldata /*_extraData*/
    ) internal override {
        (address borrower, uint256 collateral) = abi.decode(
            payload,
            (address, uint256)
        );

        uint256 loanAmount = getLoanAmount(collateral);

        require(
            poolMetadata.poolBalance >= loanAmount,
            "Pool: insufficient balance"
        );
        loans[borrower] = Loan(
            loanAmount,
            collateral,
            block.timestamp,
            borrower
        );
        poolMetadata.poolBalance -= loanAmount;

        IERC20(poolMetadata.poolToken).approve(address(this), loanAmount);
        IERC20(poolMetadata.poolToken).transfer(borrower, loanAmount);
    }

    function getPoolMetadata() external view returns (PoolMetadata memory) {
        return poolMetadata;
    }

    function getEntropy() internal view override returns (address) {
        return address(entropy);
    }
}
