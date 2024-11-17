// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SubscriptionService {

    // Owner of the contract (usually the service provider)
    address public owner;

    // Subscription cost in Wei (1 Ether = 10^18 Wei)
    uint256 public subscriptionCost;

    // Mapping of user address to subscription expiration time (in Unix timestamp)
    mapping(address => uint256) public subscriptions;

    // Event that gets emitted when a user subscribes or renews
    event Subscribed(address indexed user, uint256 expirationTime);

    // Constructor to set the subscription cost and the owner of the contract
    constructor(uint256 _subscriptionCost) {
        owner = msg.sender;
        subscriptionCost = _subscriptionCost;
    }

    // Modifier to restrict access to the owner of the contract
    modifier onlyOwner() {
        require(msg.sender == owner, "Not the contract owner");
        _;
    }

    // Function to allow a user to subscribe
    function subscribe() external payable {
        require(msg.value == subscriptionCost, "Incorrect payment amount");
        
        // Set the new subscription expiration time (1 month = 30 days in seconds)
        uint256 newExpirationTime = block.timestamp + 30 days;
        subscriptions[msg.sender] = newExpirationTime;

        emit Subscribed(msg.sender, newExpirationTime);
    }

    // Function to check if a user has an active subscription
    function isSubscribed(address user) external view returns (bool) {
        return subscriptions[user] > block.timestamp;
    }

    // Function to withdraw funds (only the owner can do this)
    function withdraw() external onlyOwner {
        payable(owner).transfer(address(this).balance);
    }

    // Function to set a new subscription cost (only the owner can do this)
    function setSubscriptionCost(uint256 newCost) external onlyOwner {
        subscriptionCost = newCost;
    }
}
