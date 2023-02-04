pragma solidity >=0.5.0;

import {UniswapV2Router01 as Router01} from "v2-periphery/UniswapV2Router01.sol";
import {UniswapV2Router02 as Router02} from "v2-periphery/UniswapV2Router02.sol";

contract UniswapV2Router01 is Router01 {
    constructor(address _factory, address _WETH) public Router01(_factory, _WETH) {}
}

contract UniswapV2Router02 is Router02 {
    constructor(address _factory, address _WETH) public Router02(_factory, _WETH) {}
}
