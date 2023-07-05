import json
import logging
import time

from scripts.constants import CHAIN_ID, DEPLOYMENTS_PATH, OUT_PATH, PRIVATE_KEY, RPC, W3, OWNER, DELAY_BETWEEN_TX
from web3 import Web3
from web3.middleware import geth_poa_middleware

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger()
deployments = {}


logger.info(f"Using CHAIN_ID {CHAIN_ID} with RPC {RPC}")

def deploy(contract_name: str, *args, **kwargs):
    logger.info(f"⏳ Deploying {contract_name}")
    artifacts = json.loads(
        (OUT_PATH / f"{contract_name}.sol" / f"{contract_name}.json").read_text()
    )
    contract = W3.eth.contract(
        abi=artifacts["abi"],
        bytecode=artifacts["bytecode"]["object"],
    )

    tx = contract.constructor(*args, **kwargs).build_transaction(
        {
            "from": OWNER.address,
            "nonce": W3.eth.get_transaction_count(OWNER.address),
        }
    )
    signed_tx = OWNER.sign_transaction(tx)
    tx_hash = W3.eth.send_raw_transaction(signed_tx.rawTransaction)

    logger.info("sleep start")
    time.sleep(DELAY_BETWEEN_TX)  
    logger.info("sleep end")
    
    tx_receipt = W3.eth.wait_for_transaction_receipt(tx_hash)

    contract_address = tx_receipt.contractAddress
    contract = W3.eth.contract(
        address=contract_address,
        abi=artifacts["abi"],
    )

    deployments[contract_name] = contract_address
    logger.info(f"✅ {contract_name} deployed at {contract_address}")
    return contract


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
    global W3

    # commented out because or rpc currently doesn't implement
    # `web3_clientVersion`
    # https://github.com/ethereum/web3.py/blob/02e426ab15d58c145cb4d86b9d72a1a90d185192/web3/providers/base.py#L113
    # if not w3.isConnected():
    #     raise ValueError(f"Cannot connect to RPC {RPC}")

    deployments = json.loads(DEPLOYMENTS_PATH.read_text()).get(str(CHAIN_ID))

    if deployments is None:
        raise ValueError(f"No deployments found for CHAIN_ID {CHAIN_ID}")

    abis = list(OUT_PATH.glob(f"*/{name}.json"))
    if len(abis) != 1:
        raise ValueError(f"Cannot locate a unique abi, got\n{abis}")

    abi = json.loads(abis[0].read_text())["abi"]
    return W3.eth.contract(address=deployments[name], abi=abi)


def invoke(contract_name: str, function_name: str, *args, **kwargs):
    logger.info(f"⏳ Invoking {contract_name}.{function_name}")

    contract = get_contract(contract_name)
    function = contract.get_function_by_name(function_name)
    transaction_hash = W3.eth.send_raw_transaction(
        OWNER.sign_transaction(
            function(*args, **kwargs).build_transaction(
                {"nonce": W3.eth.get_transaction_count(OWNER.address)}
            )
        ).rawTransaction
    )
    logger.info("sleep start")
    time.sleep(DELAY_BETWEEN_TX)  
    logger.info("sleep end")
  
    transaction_receipt = W3.eth.wait_for_transaction_receipt(transaction_hash)
    logger.info(f"✅ {function_name} tx hash {transaction_hash.hex()}")
    return transaction_receipt


def call(contract_name: str, function_name: str, *args, **kwargs):
    logger.info(f"⏳ Calling {contract_name}.{function_name}")
    contract = get_contract(contract_name)
    return contract.get_function_by_name(function_name)(*args, **kwargs).call()
