from script.constants import OWNER
from script.utils import deploy_contract, dump, invoke_contract

zeni = deploy_contract("Zeni")
tx = invoke_contract(zeni, "mint", OWNER, int(1e18))

weth = deploy_contract("WETH")
multicall = deploy_contract("Multicall")
factory = deploy_contract("Factory", OWNER)
pair_class_hash = factory.functions.INIT_CODE_HASH().call().hex()
print(f"Pair class hash is {pair_class_hash}")
input("Check that this class hash is the same as the one in UniswapV2Library.pairFor")
router = deploy_contract("Router", factory.address, weth.address)

dump()
