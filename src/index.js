import algosdk from "algosdk";

// All functions are written here

// Create the application

export const createApp = async (appClient) => {
  // setLoading(true);
  console.log(appClient)
  const { appId, appAddress, txId } = await appClient.create();
  console.log(appId)
  console.log(appAddress)
  console.log(txId)
  setAppId(appId);
  alert(`Created app: ${appId}`);
  // setLoading(false);
}

export const addElectronics = async (algodClient, appClient, activeAccount, appId, _name, _description, _imageURL, _price) => {

   let seed = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
      from: activeAccount?.address ? activeAccount.address : "",
      suggestedParams: await algodClient.getTransactionParams().do(),
      to: algosdk.getApplicationAddress(appId),
      amount: BigInt(3000)
  })

  // Get the length of box equivalent to id
  let _length = 0;
  for(let boxes in await appClient.getApplicationBoxNames()) {
    console.log(boxes)
    _length++;
  }
  console.log(_length)

  const boxName = _length;
  const result = await appClient.add_electronics({ pay_txn: seed, name: _name, description: _description, imageURL: _imageURL, price: BigInt(_price) * 1000000n}, {
    boxes: [{
      appIndex: appId,
      name: algosdk.bigIntToBytes(Number(boxName), 8)
    }]
  });
  console.log(result);
}

export const getElectronics = async (appClient) => {

  const electronics = [];
  for(let boxName in await appClient.getApplicationBoxNames()) {
    console.log(boxName)
    const idx = algosdk.bigIntToBytes(Number(boxName), 8);
    const result = await appClient.getApplicationBox(idx)
    const resultCodec = algosdk.ABIType.from('(address,string,string,string,uint64,uint64,uint64,uint64)')
    const electron = resultCodec.decode(result)

    let electronicsItem = {
      id: boxName,
      owner: electron[0],
      name: electron[1],
      description: electron[2],
      imageURL: electron[3],
      price: Number(electron[4]),
      sold: Number(electron[5]),
      likes: Number(electron[6]),
      dislikes: Number(electron[7]),
    }
    electronics.push(electronicsItem)
  }
  console.log(electronics)
  return electronics;
  

}

export const likeElectronics = async (appClient, appId, _id) => {
  const result = await appClient.like({ id: BigInt(_id)}, {
    boxes: [{
      appIndex: appId,
      name: algosdk.bigIntToBytes(Number(_id), 8)
    }]
  });
  console.log(result);
}

export const dislikeElectronics = async (appClient, appId, _id) => {
  const result = await appClient.dislike({ id: BigInt(_id)}, {
    boxes: [{
      appIndex: appId,
      name: algosdk.bigIntToBytes(Number(_id), 8)
    }]
  });
  console.log(result);
}

export const buyElectronics = async (algodClient, appClient, activeAccount, owner, appId, _id, _number, _price) => {

  let txn = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
    from: activeAccount?.address ? activeAccount.address : "",
    suggestedParams: await algodClient.getTransactionParams().do(),
    to: owner,
    amount: BigInt(_number) * BigInt(_price)
  })

  const result = await appClient.buy_electronics({ pay_txn: txn, id: BigInt(_id), number: BigInt(_number)}, {
    boxes: [{
      appIndex: appId,
      name: algosdk.bigIntToBytes(Number(_id), 8)
    }]
  });
  console.log(result);
}