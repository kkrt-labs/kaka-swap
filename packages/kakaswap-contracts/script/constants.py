import os
import shlex
import subprocess
from pathlib import Path

import toml
from dotenv import load_dotenv
from web3 import Web3

load_dotenv()

DEVNET = "http://127.0.0.1:8000"
RPC = os.getenv("RPC_URL", DEVNET)
CHAIN_ID = int(
    subprocess.run(
        shlex.split(f"cast chain-id --rpc-url {RPC}"),
        capture_output=True,
    ).stdout[:-1],
    10,
)
DEPLOYMENTS_PATH = Path("deployments.json")
OUT_PATH = Path(toml.load(open("foundry.toml"))["profile"]["default"]["out"])
PRIVATE_KEY = os.environ["PRIVATE_KEY"]
OWNER = Web3.toChecksumAddress(os.environ["ADDRESS"])
