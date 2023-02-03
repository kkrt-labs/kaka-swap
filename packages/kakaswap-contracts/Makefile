include .env

deploy:
	forge create --rpc-url ${CONSENSYS_ZK_GOERLI_RPC_URL} --private-key ${PRIVATE_KEY} src/Multicall.sol:Multicall
	forge create --rpc-url ${CONSENSYS_ZK_GOERLI_RPC_URL} --private-key ${PRIVATE_KEY} src/UniswapV2Factory.sol:UniswapV2Factory --constructor-args ${ADDRESS}
	forge create --rpc-url ${CONSENSYS_ZK_GOERLI_RPC_URL} --private-key ${PRIVATE_KEY} src/WETH.sol:WETH9
