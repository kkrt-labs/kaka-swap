from web3 import Web3
from web3.eth import Account

from script.constants import PRIVATE_KEY, RPC
from script.utils import get_contract

w3 = Web3(Web3.HTTPProvider(RPC))

zeni = get_contract("Zeni")
account = Account.privateKeyToAccount(PRIVATE_KEY)

tx = zeni.functions.mint(account.address, int(1e18)).buildTransaction(
    {"nonce": w3.eth.getTransactionCount(account.address)}
)
signed_tx = account.sign_transaction(tx)
transaction_hash = w3.eth.sendRawTransaction(signed_tx.rawTransaction)
transaction_receipt = w3.eth.waitForTransactionReceipt(transaction_hash)
