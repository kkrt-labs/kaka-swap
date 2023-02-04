import os
import shlex
import subprocess
from pathlib import Path

RPC = os.getenv("RPC_URL", os.environ["GOERLI_RPC_URL"])
CHAIN_ID = int(
    subprocess.run(
        shlex.split(f"cast chain-id --rpc-url {RPC}"),
        capture_output=True,
    ).stdout[:-1]
)
DEPLOYMENTS_PATH = Path("deployments.json")
