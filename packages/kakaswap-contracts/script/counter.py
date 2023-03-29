import asyncio

from script.constants import DEVNET, OWNER, RPC
from script.utils import call, deploy, dump, fund_address, invoke


async def main():
    if RPC == DEVNET:
        await fund_address(OWNER, 10)

    deploy("Counter")
    dump()
    count = call("Counter", "count")
    assert count == 0
    invoke("Counter", "inc")
    count = call("Counter", "count")
    assert count == 1
    invoke("Counter", "dec")
    assert count == 0
    invoke("Counter", "inc")
    invoke("Counter", "reset")


if __name__ == "__main__":
    asyncio.run(main())
