pragma solidity >=0.5.0;

import {UniswapV2Factory, UniswapV2Pair} from "v2-core/UniswapV2Factory.sol";

contract Factory is UniswapV2Factory {
    bytes32 public constant INIT_CODE_HASH = keccak256(abi.encodePacked(type(UniswapV2Pair).creationCode));

    constructor(address _feeToSetter) public UniswapV2Factory(_feeToSetter) {}
}
