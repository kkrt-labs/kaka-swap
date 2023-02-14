pragma solidity >=0.5.0;

import {UniswapV2Router02} from "v2-periphery/UniswapV2Router02.sol";

contract Router is UniswapV2Router02 {
    constructor(address _factory, address _WETH) public UniswapV2Router02(_factory, _WETH) {}
}
