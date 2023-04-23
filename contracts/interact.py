import Electron

from algosdk.abi import ABIType
from algosdk.atomic_transaction_composer import TransactionWithSigner
from algosdk.transaction import PaymentTxn
from beaker import consts, sandbox
# from beaker.client.api_providers import AlgoNode, Network
from beaker.client import ApplicationClient


electronics_codec = ABIType.from_string(str(Electron.Electron().type_spec()))

accts = sandbox.get_accounts()
acct_1 = accts[0]
acct_2 = accts[1]
acct_3 = accts[2]

# client = AlgoNode(Network.TestNet).algod()
client = sandbox.get_algod_client()
app_client1 = ApplicationClient(client=client, app=Electron.app, signer=acct_1.signer)

# 1. CREATE APPLICATION
app_id, app_addr, txid = app_client1.create()
print(f"Created app with id {app_id} and address {app_addr} in transaction {txid}")

app_client1.fund(1 * consts.algo)

# 2. GET LENGTH OF ELECTRONICS
lengthOfElectronics = app_client1.call(Electron.get_electronics_length)
print(lengthOfElectronics.return_value)

# 3. ADD ELECTRONICS
app_client2 = app_client1.prepare(acct_2.signer)

id = 0
_boxName = id.to_bytes(8, 'big')
txn = PaymentTxn(sender=acct_2.address, receiver=app_addr, amt=3000, sp=app_client2.get_suggested_params())
pay_txn1 = TransactionWithSigner(txn, acct_2.signer)
app_client2.call(Electron.add_electronics, pay_txn=pay_txn1, name="PhHONE1", description="PHONE1 DESCRIPTION",
                 imageURL="", price=2 * consts.algo, boxes=[(app_client1.app_id, _boxName)])

id = 1
_boxName = id.to_bytes(8, 'big')
txn = PaymentTxn(sender=acct_2.address, receiver=app_addr, amt=3000, sp=app_client2.get_suggested_params())
pay_txn1 = TransactionWithSigner(txn, acct_2.signer)
app_client2.call(Electron.add_electronics, pay_txn=pay_txn1, name="PhHONE2", description="PHONE2 DESCRIPTION",
                 imageURL="", price=2 * consts.algo, boxes=[(app_client1.app_id, _boxName)])

print(f"Current app state: {app_client1.get_global_state()}")

# 4. GET ELECTRONICS
id = 0
_boxName = id.to_bytes(8, 'big')
elec = app_client2.call(Electron.read_electronics, id=0, boxes=[(app_client1.app_id, _boxName)])
abi_decoded = electronics_codec.decode(elec.raw_value)
print(f"Creator: {abi_decoded}")


app_client3 = app_client1.prepare(acct_3.signer)
# # 5. BUY ELECTRONICS
txn = PaymentTxn(sender=acct_3.address, receiver=abi_decoded[0], amt=abi_decoded[3] * 2,
                 sp=app_client3.get_suggested_params())
pay_txn1 = TransactionWithSigner(txn, acct_3.signer)

id = 0
_boxName = id.to_bytes(8, 'big')
app_client3.call(Electron.buy_electronics, pay_txn=pay_txn1, id=0, number=2, boxes=[(app_client1.app_id, _boxName)])

# get electronics
id = 0
_boxName = id.to_bytes(8, 'big')
elec = app_client2.call(Electron.read_electronics, id=0, boxes=[(app_client1.app_id, _boxName)])
abi_decoded = electronics_codec.decode(elec.raw_value)
print(f"Creator: {abi_decoded}")


elec1 = app_client2.call(Electron.get_electronics_length)
print(elec1.return_value)

for box in app_client1.get_box_names():
    electronics = electronics_codec.decode(app_client1.get_box_contents(box))
    print(electronics)

# LIKE
id = 0
_boxName = id.to_bytes(8, 'big')
app_client2.call(Electron.like, id=0, boxes=[(app_client1.app_id, _boxName)])

id = 1
_boxName = id.to_bytes(8, 'big')
app_client2.call(Electron.like, id=1, boxes=[(app_client1.app_id, _boxName)])

id = 0
_boxName = id.to_bytes(8, 'big')
app_client2.call(Electron.dislike, id=0, boxes=[(app_client1.app_id, _boxName)])

id = 1
_boxName = id.to_bytes(8, 'big')
app_client2.call(Electron.dislike, id=1, boxes=[(app_client1.app_id, _boxName)])

id = 0
_boxName = id.to_bytes(8, 'big')
app_client1.call(Electron.like, id=0, boxes=[(app_client1.app_id, _boxName)])

id = 0
_boxName = id.to_bytes(8, 'big')
app_client3.call(Electron.like, id=0, boxes=[(app_client1.app_id, _boxName)])

id = 1
_boxName = id.to_bytes(8, 'big')
app_client1.call(Electron.like, id=1, boxes=[(app_client1.app_id, _boxName)])

# DISLIKE
id = 0
_boxName = id.to_bytes(8, 'big')
app_client1.call(Electron.dislike, id=0, boxes=[(app_client1.app_id, _boxName)])

id = 0
_boxName = id.to_bytes(8, 'big')
app_client3.call(Electron.dislike, id=0, boxes=[(app_client1.app_id, _boxName)])

id = 1
_boxName = id.to_bytes(8, 'big')
app_client1.call(Electron.dislike, id=1, boxes=[(app_client1.app_id, _boxName)])

for box in app_client1.get_box_names():
    electronics = electronics_codec.decode(app_client1.get_box_contents(box))
    print(electronics)
