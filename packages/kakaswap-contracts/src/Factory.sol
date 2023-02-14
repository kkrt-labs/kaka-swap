pragma solidity >=0.5.0;

import {UniswapV2Factory} from "v2-core/UniswapV2Factory.sol";

contract Factory is UniswapV2Factory {
    constructor(address _feeToSetter) public UniswapV2Factory(_feeToSetter) {}
}
