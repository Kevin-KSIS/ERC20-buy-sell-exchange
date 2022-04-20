pragma solidity ^0.8.0;

// OpenZeppelin docs: https://docs.openzeppelin.com/contracts/4.x/erc20
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract TraderKev is ERC20 {
    address public owner;

    constructor(string memory _name, string memory _symbol, uint _totalSupply)
        ERC20(_name, _symbol) {
            
        owner = msg.sender;
        _mint(owner, _totalSupply);
    }
}