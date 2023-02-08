import json
import logging
import os
import re
import shlex
import subprocess

from dotenv import load_dotenv
from web3 import Web3

from script.constants import CHAIN_ID, DEPLOYMENTS_PATH, OUT_PATH, RPC

load_dotenv()
logging.basicConfig(level=logging.INFO)

logger = logging.getLogger()

deployments = {}


logger.info(f"Using CHAIN_ID {CHAIN_ID} with RPC {RPC}")


def deploy_contract(path: str, *args):
    contract_name = path.split(":")[-1]
    logger.info(f"⏳ Deploying {contract_name}")
    res = subprocess.run(
        shlex.split(
            f"forge create "
            + f"--rpc-url {RPC} "
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
        raise ValueError(f"Cannot deploy {path}: {res.stderr}")

    deployments[contract_name] = address[1].strip()
    logger.info(f"✅ {contract_name} deployed at {address[1].strip()}")
    return address[1].strip()


def dump():
    previous_deployments = {}
    if DEPLOYMENTS_PATH.is_file():
        previous_deployments = json.loads(DEPLOYMENTS_PATH.read_text())
    _deployments = {
        **previous_deployments.get(str(CHAIN_ID), {}),
        **deployments,
    }
    json.dump(
        {
            **previous_deployments,
            str(CHAIN_ID): _deployments,
        },
        open(DEPLOYMENTS_PATH, "w"),
        indent=2,
    )
    logger.info(f"✅ Deployments saved at {DEPLOYMENTS_PATH}")


def get_contract(name):
    w3 = Web3(Web3.HTTPProvider(RPC))

    if not w3.isConnected():
        raise ValueError(f"Cannot connect to RPC {RPC}")

    deployments = json.loads(DEPLOYMENTS_PATH.read_text()).get(str(CHAIN_ID))

    if deployments is None:
        raise ValueError(f"No deployments found for CHAIN_ID {CHAIN_ID}")

    abis = list(OUT_PATH.glob(f"*/{name}.json"))
    if len(abis) != 1:
        raise ValueError(f"Cannot locate a unique abi, got\n{abis}")

    abi = json.loads(abis[0].read_text())["abi"]
    return w3.eth.contract(address=deployments[name], abi=abi)
