// @ts-nocheck 

import algosdk from "algosdk";
import { useState, useEffect } from "react";
import { clients } from "beaker-ts";
import { ElectronApp } from "./electronapp_client";
import { AppBar, Box, Toolbar } from "@mui/material";
import { useWalletUI, WalletUI } from '@algoscan/use-wallet-ui/dist/index.js';

import { createApp, addElectronics, getElectronics, likeElectronics, dislikeElectronics, buyElectronics } from "./index.js";



// If you just need a placeholder signer
const PlaceHolderSigner: algosdk.TransactionSigner = (
  _txnGroup: algosdk.Transaction[],
  _indexesToSign: number[],
): Promise<Uint8Array[]> => {
  return Promise.resolve([]);
};

// AnonClient can still allow reads for an app but no transactions
// can be signed
const AnonClient = (client: algosdk.Algodv2, appId: number): ElectronApp => {
  return new ElectronApp({
    // @ts-ignore
    client: client,
    signer: PlaceHolderSigner,
    sender: "",
    appId: appId,
  });
};

export default function App() {

  const [appId, setAppId] = useState<number>(195037289);
  // B75IU34UTN2RGWNCKTZCHGQT7IVTM5JHT3PBJLM5FFCZTUFA7KJCHVZVMU  (app address)
  

  // Setup config for client/network.
  const [apiProvider, setApiProvider] = useState(clients.APIProvider.AlgoNode);
  const [network, setNetwork] = useState(clients.Network.TestNet);
  // Init our algod client
  const algodClient = clients.getAlgodClient(apiProvider, network);

  const [modalStatus, setmodalStatus] = useState(false);

  const [electronics, setElectronics] = useState([]);
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [imageURL, setImageURL] = useState<string>("");
  const [price, setPrice] = useState<bigint>(0n);
  const [number, setNumber] = useState<bigint>(0n);


  // Set up user wallet from session
  const { activeAccount, signer } = useWalletUI();

  // Init our app client
  const [appClient, setAppClient] = useState<ElectronApp>(
    AnonClient(algodClient, appId)
  );

  // If the account info, client, or app id change
  // update our app client
  async function getElectronicsAction() {
    await getElectronics(appClient)
    .then((electronics) => {
      console.log(electronics)

      setElectronics(electronics)

    })
  }

  useEffect(() => {
    console.log(activeAccount, appId, algodClient)
    // Bad way to track connected status but...
    if (activeAccount === null && appClient.sender !== "") {
      setAppClient(AnonClient(algodClient, appId));
    } else if (
      activeAccount && activeAccount.address != appClient.sender
    ) {
      setAppClient(
        new ElectronApp({
          client: algodClient,
          signer: signer,
          sender: activeAccount.address,
          appId: appId,
        })
      );
    }
    getElectronicsAction()
  }, [activeAccount]);


  const createAppAction = async () => {
    await createApp(appClient)
  }

  const addElectronicsAction = async () => {
    await addElectronics(algodClient, appClient, activeAccount, appId, name, description, imageURL, price)
    .then(() => {
      // close modal
      setmodalStatus(false);

      // get electronics
      getElectronicsAction()
    })
    
  }

  const likeElectronicsAction = async (id) => {
    await likeElectronics(appClient, appId, id)
    .then(() => {
      // get electronics
      getElectronicsAction()
    })
  }

  const dislikeElectronicsAction = async (id) => {
    await dislikeElectronics(appClient, appId, id)
    .then(() => {
      // get electronics
      getElectronicsAction()
    })
  }

  const buyElectronicsAction = async (owner, id, _price) => {
    await buyElectronics(algodClient, appClient, activeAccount, owner, appId, id, number, _price)
    .then(() => {
      // get electronics
      getElectronicsAction()
    })
  }
  

  const toggleModal = () => modalStatus == false? setmodalStatus(true) : setmodalStatus(false);

  const modal = (
    <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
      
      <div className="relative p-8 bg-white w-full max-w-md m-auto flex-col flex ">
          <form className="space-y-6" action="#">
              <div>
                  <input type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Name" required onChange={(e) => {setName(e.target.value)}}/>
              </div>
              <div>
                  <input type="text" name="description" id="description" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Description" required onChange={(e) => {setDescription(e.target.value)}}/>
              </div>
              <div>
                  <input type="text" name="imageURL" id="imageURL" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Image URL" required onChange={(e) => {setImageURL(e.target.value)}}/>
              </div>
              <div>
                  <input type="text" name="price" id="price" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Price" required onChange={(e) => {setPrice(e.target.value as unknown as bigint)}}/>
              </div>

              <button type="submit" className="modal w-1/2 text-white bg-black hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={(e) => {
                  e.preventDefault()
                  addElectronicsAction()
              }}>Submit</button>

              <button type="button" onClick={() => {
                modalStatus == false? setmodalStatus(true) : setmodalStatus(false)
              }} className="modal w-1/2 text-black bg-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Close modal
              </button>

              
          </form>
      </div>
  </div>
  );

 
  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar variant="regular" className="bg-black">
        <h1 className="brand-name text-white">ELECTRON</h1>
          <Box sx={{ flexGrow: 1 }} />
          <Box>
            <WalletUI openState={false} primary='black' textColor='#FF0000' />
          </Box>
        </Toolbar>
      </AppBar>
      
      {/* Hero Section */}

      <div className="hero-section bg-black m-10 text-white p-20">
        <p className="hero-text">
          Buy and Sell your electronics in <span>electron</span> decentralized marketplace
        </p>
      </div>

      {/* Add electronics button */}
      <div className="add-electronics m-10 flex justify-center">
        <button type="button" onClick={() => toggleModal()}>Add Electronics</button>
      </div>

      {/* Toggle Modal */}
      {!!modalStatus && modal}

      {/* Electronics marketplace */}
      <div className="electronics-marketplace m-10 p-20">
      <div className="grid grid-cols-3 gap-4 mx-10">

        {!!electronics && electronics.map((electron) => (
          <div className="electronics-item shadow-md p-10">
            <img src={`${electron.imageURL}`} class="h-auto max-w-full" />
            <h2 className="electronics-item-name pb-5"><u>{electron.name}</u></h2>
            <h2 className="electronics-item-description pb-8">{electron.description}</h2>

            <div className="sld pb-3">PRICE: {algosdk.microalgosToAlgos(electron.price)} Algo</div>
            <div className="flex justify-between">
              <div>
                <p className="sld pb-2">{electron.sold}</p>
                <p className="sld">Sold</p>
              </div>
              <div>
              <p className="sld pb-2">{electron.likes}</p>
              <p className="sld">Likes</p>
              </div>
              <div>
              <p className="sld pb-2">{electron.dislikes}</p>
              <p className="sld">Dislikes</p>
              </div>
            </div>
            <div className="flex justify-between">
            <button type="submit" className="like w-1/2 mt-5 text-white bg-black focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={() => likeElectronicsAction(electron.id)}>
              Like
            </button>
            <button type="submit" className="dislike w-1/2 mt-5 text-white bg-black  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={() => dislikeElectronicsAction(electron.id)}>Dislike</button>
            </div>
            <div className="flex justify-between">
            <input type="number" className="border-2 p-2 mt-5" placeholder="How many items"
            onChange={(e) => {setNumber(e.target.value as unknown as bigint)}}
            />
            <button type="submit" className="buy w-full mt-5 text-black bg-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={(e) => {
                buyElectronicsAction(electron.owner, electron.id, electron.price)
              }}>Buy</button>
            </div>
          </div>
        ))}
      </div> 
        

      </div>

      {/* Footer */}
      <div className="footer bg-black text-white m-10 p-10 flex justify-between">
        <h1 className="brand-name">ELECTRON</h1>
        <div className="footer-text">
          <h1>NEW TO ELECTRON?</h1>
          <p>Subscribe to our newsletter to get updates on our latest offers!</p>
        </div>
        <div>
        <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Enter Email Address"/>
        </div>
      </div>

      
    </div>
  );
}
