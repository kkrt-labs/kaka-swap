import json
import os
import re
import shlex
import subprocess

from dotenv import load_dotenv

load_dotenv()

deployments = {}


def deploy_contract(path: str, *args):
    res = subprocess.run(
        shlex.split(
            f"forge create "
            + f"--rpc-url {os.environ['CONSENSYS_ZK_GOERLI_RPC_URL']} "
            + f"--private-key {os.environ['PRIVATE_KEY']} "
            + f"{path} "
            + (f"--constructor-args {' '.join(args)}" if args else ""),
        ),
        capture_output=True,
    )
    address = re.search(
        r"Deployed to:(.*)Transaction hash",
        str(res.stdout).replace("\\n", ""),
        re.IGNORECASE,
    )

    if address is None:
        raise ValueError(f"Cannot deploy {path}")

    deployments[path.split(":")[-1].replace(".sol", "")] = address[1].strip()
    return address[1].strip()


deploy_contract(path="src/Multicall.sol:Multicall")
weth = deploy_contract("src/WETH.sol:WETH9")
factory = deploy_contract(
    "src/UniswapV2Factory.sol:UniswapV2Factory", os.environ["ADDRESS"]
)
deploy_contract("src/UniswapV2Router01.sol:UniswapV2Router01", factory, weth)

chain_id = int(
    subprocess.run(
        shlex.split(
            f"cast chain-id --rpc-url {os.environ['CONSENSYS_ZK_GOERLI_RPC_URL']}"
        ),
        capture_output=True,
    ).stdout[:-1]
)

json.dump(
    {
        "rpc": os.environ["CONSENSYS_ZK_GOERLI_RPC_URL"],
        "chain_id": chain_id,
        "deployments": deployments,
    },
    open("deployments.json", "w"),
    indent=2,
)
