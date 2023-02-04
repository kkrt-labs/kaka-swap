import json
import logging
import os
import re
import shlex
import subprocess

from dotenv import load_dotenv

from script.constants import CHAIN_ID, DEPLOYMENTS_PATH, RPC

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
