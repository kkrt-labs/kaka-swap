import json
import logging

from web3 import Web3
from web3.middleware import geth_poa_middleware

from script.constants import CHAIN_ID, DEPLOYMENTS_PATH, OUT_PATH, PRIVATE_KEY, RPC

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger()
deployments = {}


logger.info(f"Using CHAIN_ID {CHAIN_ID} with RPC {RPC}")

w3 = Web3(Web3.HTTPProvider(RPC))
w3.middleware_onion.inject(geth_poa_middleware, layer=0)

account = w3.eth.account.from_key(PRIVATE_KEY)


def deploy_contract(contract_name: str, *args, **kwargs):
    logger.info(f"⏳ Deploying {contract_name}")
    artifacts = json.loads(
        (OUT_PATH / f"{contract_name}.sol" / f"{contract_name}.json").read_text()
    )
    contract = w3.eth.contract(
        abi=artifacts["abi"],
        bytecode=artifacts["bytecode"]["object"],
    )
    tx = contract.constructor(*args, **kwargs).build_transaction(
        {"from": account.address, "nonce": w3.eth.getTransactionCount(account.address)}
    )
    signed_tx = account.sign_transaction(tx)
    tx_hash = w3.eth.sendRawTransaction(signed_tx.rawTransaction)
    tx_receipt = w3.eth.waitForTransactionReceipt(tx_hash)
    contract_address = tx_receipt.contractAddress
    contract = w3.eth.contract(
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


def invoke_contract(contract, function_name, *args, **kwargs):
    logger.info(f"⏳ Invoking {function_name}")
    function = contract.get_function_by_name(function_name)
    transaction_hash = w3.eth.sendRawTransaction(
        account.sign_transaction(
            function(*args, **kwargs).buildTransaction(
                {"nonce": w3.eth.getTransactionCount(account.address)}
            )
        ).rawTransaction
    )
    transaction_receipt = w3.eth.waitForTransactionReceipt(transaction_hash)
    logger.info(f"✅ {function_name} tx hash {transaction_hash.hex()}")
    return transaction_receipt
