import json
import os

from dotenv import load_dotenv
from eth_utils import keccak

load_dotenv()

from script.utils import deploy_contract, dump

deploy_contract("src/Zeni.sol:Zeni")
weth = deploy_contract("src/WETH.sol:WETH9")

factory = deploy_contract("src/Factory.sol:Factory", os.environ["ADDRESS"])
pair_class_hash = keccak(
    bytes.fromhex(
        json.load(open("out/UniswapV2Pair.sol/UniswapV2Pair.json"))["bytecode"][
            "object"
        ][2:]
    )
).hex()
print(f"Pair class hash is {pair_class_hash}")
input("Check that this class hash is the same as the one in UniswapV2Library.pairFor")
deploy_contract("src/Router.sol:Router", factory, weth)

dump()
