import { BIP32Interface, Network } from '../core/bip32';
import { DerivationName, Encoding } from './constants';
import { Chains } from './evm';
import { CoinIds, Protocol, Coins, Curve } from './registry';
import { Keypair } from 'stellar-sdk';

export type GenerateAddressesParams = {
    mnemonic: string;
    idCoin: Coins;
    walletAccount: number;
};
export type GeneratePublicAddressParams = {
    publicAccountNode: BIP32Interface;
    change: number;
    index: number;
    network: Network;
    derivation: string;
};
export type GeneratePublicAddressesParams = {
    publicAccountNode: BIP32Interface;
    idCoin: Coins;
    change: number;
    index: number;
    derivation: string;
};
export type GeneratePublicAddressesCoinParams = {
    publicAccountNode: BIP32Interface;
    change?: number;
    index?: number;
    derivation: string;
};
export type AddressResult = {
    extendedPrivateAddress: string | undefined;
    extendedPublicAddress: string | undefined;
    privateKey: any;
    protocol: Protocol;
    privateAddress: string | undefined;
    publicKey: any;
    publicAddress: string | undefined;
    extendedNode: BIP32Interface | undefined;
    publicKeyHash?: string;
    account?: string;
    derivationName: string;
};
export type PublicAddressResult = {
    publicKey: any;
    publicAddress: string | undefined;
    account: string;
    derivationName: string;
};
export type RootNodeParams = {
    mnemonic: string;
    network?: Network;
    walletAccount?: number;
    derivation?: DerivationParams;
};
export type MasterKeyParams = {
    rootNode: BIP32Interface;
    bipIdCoin: CoinIds;
    protocol: Protocol;
    walletAccount: number;
};
export type MasterAddressParams = {
    privateAccountNode: BIP32Interface;
    coinId: Coins;
    protocol: Protocol;
};
export type MasterPublicAddressParams = {
    publicAccountNode: BIP32Interface;
    coinId: Coins;
    protocol: Protocol;
};
export type Keys = {
    key: Buffer;
    chainCode: Buffer;
};
export type PublicKeyEd25519Params = {
    seed: Buffer;
    path: string;
    walletAccount: number;
};
export type AddressParams = {
    privateAccountNode: BIP32Interface;
    change?: number;
    index?: number;
    network?: Network;
};
export type PublicAddressParams = {
    publicAccountNode: BIP32Interface;
    change?: number;
    index?: number;
    network?: Network;
};
export type RedemParams = {
    publicKey: Buffer;
    change?: number;
    index?: number;
    network?: Network;
};
export type GenerateAddressParams = {
    mnemonic: string;
    network?: Network;
    derivation: DerivationParams;
    walletAccount: number;
};
export type DerivationParams = {
    name: DerivationName;
    path: string;
    xpub?: Encoding;
    xprv?: Encoding;
    protocol: Protocol;
};
export type Derivation = {
    derivations: DerivationParams[];
    bip44: CoinIds;
    curve: Curve;
    network: Network;
    chain?: Chains;
    dust?: number;
    rpc: string[];
    apiKey?: string;
    apiUrl?: string;
    apiUrlSecundary?: string;
};
export type getPublicAddressED25519Params = {
    keyPair: any;
};
export type getPrivateAddressED25591Params = {
    privateKey: Buffer;
};
export type getPrivateAddressED25519Params = getPublicAddressED25519Params;
export type getPrivateMasterKeyParams = {
    protocol?: Protocol;
    rootNode: BIP32Interface;
    walletAccount: number;
};
export type GetSeedParams = {
    mnemonic: string;
    walletAccount: number;
    derivation: DerivationName;
};
export type getAccountParams = {
    keyPair: Keypair;
};
export type GetKeyPairParams = {
    seed: Buffer;
    walletAccount: number;
    derivationName: DerivationName;
};
export type getPublicMasterKeyParams = getPrivateMasterKeyParams;
export type getPublicMasterAddressParams = {
    protocol?: Protocol;
    publicAccountNode: BIP32Interface;
};
export type getPrivateMasterAddressParams = {
    protocol?: Protocol;
    change?: number;
    index?: number;
    privateAccountNode: BIP32Interface;
};

export type getPublicAddressParams = {
    change?: number;
    index?: number;
    publicAccountNode: BIP32Interface;
    protocol?: Protocol;
};
export type getPrivateAddressParams = {
    change?: number;
    index?: number;
    privateKey: Buffer;
};
