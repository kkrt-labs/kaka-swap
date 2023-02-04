import os

from dotenv import load_dotenv

from script.utils import deploy_contract, dump

load_dotenv()


deploy_contract(path="src/Multicall.sol:Multicall")
weth = deploy_contract("src/WETH.sol:WETH9")
factory = deploy_contract(
    "src/UniswapV2Factory.sol:UniswapV2Factory", os.environ["ADDRESS"]
)
deploy_contract("src/UniswapV2Router01.sol:UniswapV2Router01", factory, weth)
deploy_contract("src/Tokens.sol:Zeni")

dump()
