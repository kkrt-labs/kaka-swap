import json
import logging
import os
import re
import shlex
import subprocess
from pathlib import Path

from dotenv import load_dotenv

load_dotenv()
logging.basicConfig(level=logging.INFO)

logger = logging.getLogger()

deployments = {}
RPC = os.environ["GOERLI_RPC_URL"]


def deploy_contract(path: str, *args):
    contract_name = path.split(":")[-1].replace(".sol", "")
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

    deployments[path.split(":")[-1].replace(".sol", "")] = address[1].strip()
    logger.info(f"✅ {contract_name} deployed at {address[1].strip()}")
    return address[1].strip()


chain_id = int(
    subprocess.run(
        shlex.split(f"cast chain-id --rpc-url {RPC}"),
        capture_output=True,
    ).stdout[:-1]
)


def dump():
    previous_deployments = {}
    if Path("deployments.json").is_file():
        previous_deployments = json.loads(Path("deployments.json").read_text()).get(
            str(chain_id), {}
        )
    _deployments = {
        **previous_deployments,
        **deployments,
    }
    json.dump(
        {
            str(chain_id): _deployments,
        },
        open("deployments.json", "w"),
        indent=2,
    )
    logger.info(f"✅ Deployments saved at deployments.json")
