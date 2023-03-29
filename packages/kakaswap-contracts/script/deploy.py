import asyncio

from script.constants import DEVNET, OWNER, RPC
from script.utils import deploy, dump, fund_address, invoke


async def main():
    if RPC == DEVNET:
        await fund_address(OWNER, 10)

    deploy("Zeni")
    tx = invoke("Zeni", "mint", OWNER, int(1e18))

    weth = deploy("WETH")
    multicall = deploy("Multicall")
    factory = deploy("Factory", OWNER)
    pair_class_hash = factory.functions.INIT_CODE_HASH().call().hex()
    print(f"Pair class hash is {pair_class_hash}")
    input(
        "Check that this class hash is the same as the one in UniswapV2Library.pairFor"
    )
    router = deploy("Router", factory.address, weth.address)

    dump()


if __name__ == "__main__":
    asyncio.run(main())
