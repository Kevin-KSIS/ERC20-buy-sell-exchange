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
}
