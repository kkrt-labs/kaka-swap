import json
import os

from dotenv import load_dotenv
from eth_utils import keccak

load_dotenv()

from script.utils import deploy_contract, dump

deploy_contract(path="src/Multicall.sol:Multicall")
deploy_contract(path="src/Multicall2.sol:Multicall2")
deploy_contract("src/Tokens.sol:Zeni")
weth = deploy_contract("src/WETH.sol:WETH9")

factory = deploy_contract(
    "src/UniswapV2Factory.sol:UniswapV2Factory", os.environ["ADDRESS"]
)
pair_class_hash = keccak(
    bytes.fromhex(
        json.load(open("out/UniswapV2Pair.sol/UniswapV2Pair.json"))["bytecode"][
            "object"
        ][2:]
    )
).hex()
print(f"Pair class hash is {pair_class_hash}")
input("Check that this class_hash is the same as the one in UniswapV2Library.pairFor")

deploy_contract("src/UniswapV2Router01.sol:UniswapV2Router01", factory, weth)
deploy_contract("src/UniswapV2Router02.sol:UniswapV2Router02", factory, weth)

dump()
