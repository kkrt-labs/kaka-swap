import asyncio

from script.constants import OWNER
from script.utils import deploy, dump, invoke


async def main():
    factory = deploy("Factory", OWNER)
    pair_class_hash = factory.functions.INIT_CODE_HASH().call().hex()
    print(f"Pair class hash is {pair_class_hash}")
    input(
        "\n⚠ Check that this class hash is the same as the one in lib/v2-periphery/contracts/libraries/UniswapV2Library.pairFor"
        "\nIf yes, press enter to continue"
        "\nOtherwise, fix it, kill this process, forge build and run again"
    )

    deploy("Zeni")
    weth = deploy("WETH")
    deploy("Multicall")
    deploy("Router", factory.address, weth.address)
    dump()
    invoke("Zeni", "mint", OWNER, int(1e18))


if __name__ == "__main__":
    asyncio.run(main())
