import os
import shlex
import subprocess
from pathlib import Path

import toml
from dotenv import load_dotenv
from web3 import Web3
from web3.middleware import geth_poa_middleware

load_dotenv()

DEVNET = "http://127.0.0.1:8545"
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
W3 = Web3(Web3.HTTPProvider(RPC, request_kwargs={"timeout": 180}))
W3.middleware_onion.inject(geth_poa_middleware, layer=0)
OWNER = W3.eth.account.from_key(PRIVATE_KEY)
# The seconds amount we take between a transaction and looking up the transaction hash
DELAY_BETWEEN_TX = 10
