// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./TraderKev.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract KevRouter {
    using SafeMath for uint;

    TraderKev kev;
    uint tokenPerEth;

    event BuyTokens(address buyer, uint amount);

    constructor(address traderKev_, uint tokenPerEth_){
        kev = TraderKev(traderKev_);
        tokenPerEth = tokenPerEth_; // 100 tokens Kev for each 1 ETH
    }

    /**
     * @notice Allow a user buy KEV token using their ETH
     */
    function buyToken() public payable {
        require(msg.value > 0, "The amount of token not empty");

        uint amountToBuy = msg.value * tokenPerEth;

        // Checking Router's balance in TraderJoe contract
        uint routerBalance = kev.balanceOf(address(this));
        require(routerBalance >= amountToBuy, "Not liquidity to buy");

        // Send token Kev from Router to buyer
        bool success = kev.transfer(msg.sender, amountToBuy);
        require(success);

        emit BuyTokens(msg.sender, amountToBuy);
    }

    /**
     * @notice Allow a user sell their tokens and get ETH
     */
    function sellTokens(uint amount) public {
        require(amount > 0, "Would you like sell tokens?");

        // Check balance of user swapable
        uint userBalance = kev.balanceOf(msg.sender);
        require(userBalance >= amount, "User balance must great than amount");

        // Check liquidity in Router swapable
        // 100 KEV = 1 ETH
        // => amount * 1/100 ETH
        uint amountOfEthToTransfer = amount.div( tokenPerEth );
        require(amountOfEthToTransfer <= address(this).balance, "Liquidity empty");

        // Tranfer KEV token from sender to Router
        bool isSend = kev.transferFrom(msg.sender, address(this), amount);
        require(isSend, "Cannot send to Router");

        // Transfer ETH token from Router to sender
        (isSend, ) = msg.sender.call{value: amountOfEthToTransfer}("");
        require(isSend, "Cannot send to user");
    }

}