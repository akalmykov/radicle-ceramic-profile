import { DataModel } from '@glazed/datamodel'
import { DIDDataStore } from '.'
import CeramicClient from '@ceramicnetwork/http-client'

import WalletConnectProvider from '@walletconnect/web3-provider'
import { ThreeIdConnect, EthereumAuthProvider } from '@3id/connect'
import Authereum from 'authereum'
import Fortmatic from 'fortmatic'
import Web3Modal from 'web3modal'

import { DID } from 'dids'
import ThreeIdResolver from '@ceramicnetwork/3id-did-resolver'
import KeyDidResolver from 'key-did-resolver'
import type { ResolverRegistry } from 'did-resolver'


declare global {
  interface Window {
    ceramic?: CeramicClient,
    dataStore?: DIDDataStore,
  }
}

const API_URL = "http://185.251.89.229:7007"
const ceramic = new CeramicClient(API_URL)
window.ceramic = ceramic

export type SafeOrgProfile = {
    name: string
    description: string
    url: string
    image: {
      original: {
        src: string;
        mimeType: string;
        width: number;
        height: number;
      }
    }
}
  


// @ts-ignore
export const threeID = new ThreeIdConnect()

export const web3Modal = new Web3Modal({
  network: 'mainnet',
  cacheProvider: true,
  providerOptions: {
    walletconnect: {
      package: WalletConnectProvider,
      options: {
        infuraId: 'e87f83fb85bf4aa09bdf6605ebe144b7',
      },
    },
    fortmatic: {
      package: Fortmatic,
      options: {
        key: 'pk_live_EC842EEAC7F08995',
      },
    },
    authereum: {
      package: Authereum,
      options: {},
    },
  },
})


import { writable } from 'svelte/store';
import { info, NotificationParams } from '../notification';
export const ceramicAuthorized = writable(false)

export async function ceramicAuth() {
  const ethProvider = await web3Modal.connect()
  const addresses = await ethProvider.enable()
  await threeID.connect(new EthereumAuthProvider(ethProvider, addresses[0]))

  const keyDidResolver = KeyDidResolver.getResolver()
  const threeIdResolver = ThreeIdResolver.getResolver(ceramic)


  const resolverRegistry: ResolverRegistry = {
    ...threeIdResolver,
    ...keyDidResolver,
  }
  const did = new DID({
    provider: threeID.getDidProvider(),
    resolver: resolverRegistry,
  })
  let result = await did.authenticate()
  info({ message: result })
  await ceramic.setDID(did) 
  ceramicAuthorized.set(true)

  
  

}

const publishedModel = {
  schemas: {
  basicProfileSchema: 'ceramic://k3y52l7qbv1frxt706gqfzmq6cbqdkptzk8uudaryhlkf6ly9vx21hqu4r6k1jqio',
},
definitions: {
  basicProfile: 'ceramic://kjzl6cwe1jw145cjbeko9kil8g9bxszjhyde21ob8epxuxkaon1izyqsu8wgcic',
},
tiles: {},
}


const model = new DataModel({ ceramic, model: publishedModel })
const dataStore = new DIDDataStore({ ceramic, model })

export async function saveProfile(profile: SafeOrgProfile) {
  await dataStore.set("basicProfile", profile)
}


export async function getProfile(ownerAddress:string) : Promise<SafeOrgProfile>  {

  const did = "did:safe:eip155:4:"+ownerAddress.toLowerCase()
  console.log(did)

  dataStore.didId = did
  window.dataStore = dataStore

  const basicProfile = await dataStore.get('basicProfile')

  if (!basicProfile) {
    let defaultOrgProfile : SafeOrgProfile =  {
      name: "",
      description: "",
      url: "",
      image: {
        original: {
          src: "ipfs://QmUzatQV61D6ZprTzXu8xgtkY8sGATP3pZRV2vHoKG4fDt",
          mimeType: "image/svg",
          width: 1,
          height:1,
    
        }
      }
    }
    
    return defaultOrgProfile
  } else {

    const orgProfile : SafeOrgProfile =  {
      name: basicProfile.name,
      description: basicProfile.description,
      url: basicProfile.url,
      image: {
        original: {
          src: basicProfile?.image?.original?.src,
          mimeType: basicProfile?.image?.original?.mimeType,
          width: basicProfile?.image?.original?.width,
          height: basicProfile?.image?.original?.height,
            
        }
      }
    }
    // console.log(orgProfile)
    return orgProfile 

  }

  

    
}

