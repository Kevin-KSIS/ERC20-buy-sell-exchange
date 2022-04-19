//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Staking is Ownable {
    constructor() {}

    // Security
    using SafeMath for uint;

    // Ex 1: For user staking
    // + Payable modifier
    mapping(address => uint) public balances;
    event Staked(address indexed staker, uint amount);

    function stake() public payable {
        balances[msg.sender] = balances[msg.sender].add(msg.value);
        emit Staked(msg.sender, msg.value);
    }

    // Ex 2: Conditions to withdraw
    // + least 30s and 1 ether to withdraw
    uint public deadline = block.timestamp + 30 seconds;

    modifier deadlineReached {
        uint time = timeleft();
        console.log("[backend] time remain: ", time);
        require(time == 0, "Deadline is not reached yet");
        _;
    }

    function timeleft() public view returns (uint) {
        if (block.timestamp >= deadline) {
            return 0;
        }
        return deadline - block.timestamp;
    }

    uint public threshold = 1 ether;
    modifier thresholdReached() {
        console.log("[backend] balance of ", msg.sender, " is ", balances[msg.sender]);
        require (balances[msg.sender] >= threshold, "Your balance not enough to withdraw");
        _;
    }

    /** @notice Allow users to withdraw their balance from the contract 
     * only if deadline and balance threshold reached  
     */
    function withdraw() public deadlineReached thresholdReached {
        uint userBalance = balances[msg.sender];
        balances[msg.sender] = 0;

        // Send balance back to the user
        (bool sent, ) = msg.sender.call{value: userBalance}("");
        require(sent, "Failed to send user's balance back to the user");
    }
}
