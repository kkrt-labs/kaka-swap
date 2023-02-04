pragma solidity >=0.5.0;

import {ERC20} from "solmate/tokens/ERC20.sol";

contract Zeni is ERC20 {
    constructor() ERC20("Zeni", "ZN", 18) {}

    function mint(address to, uint256 amount) external {
        _mint(to, amount);
    }

    function burn(address from, uint256 amount) external {
        _burn(from, amount);
    }
}
