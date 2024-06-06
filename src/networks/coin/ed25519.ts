import { DerivationTypeNotSupported, NotImplemented } from '../../errors';
import {
    getKeyPair,
    getPublicKey,
    getSecretAddress,
    getSecretKey,
    getSeed,
} from '../ed25519';
import { Coins, Curve } from '../registry';
import {
    AddressResult,
    GetKeyPairParams,
    GetSeedParams,
    getAccountParams,
    getPrivateAddressED25591Params,
    getPublicAddressED25519Params,
} from '../types';
import Base from './base';
import config from '../config';
import { DerivationName } from '../constants';
import { isValidAddress as isValidAddressStellar } from '../utils/stellar';
import { isValidAddress as isValidAddressXRP } from '../utils/xrp';
import { isValidAddress as isValidAddressSolana } from '../utils/solana';
import { isValidAddress as isValidAddressTezos } from '../utils/tezos';
import { isValidAddress as isValidAddressDOT } from '../utils/dot';
import { isValidAddress as isValidAddressKSM } from '../utils/ksm';

import { generateAddresses } from '../generate_address';
import { getPublicStellarAddress } from '../ed25519/address/stellar';
import { getPublicXRPAddress } from '../ed25519/address/xrp';
import { getPublicSolanaAddress } from '../ed25519/address/solana';
import {
    getPublicTezosAddress,
    getTezosPublicKeyHash,
} from '../ed25519/address/tezos';
import { getPublicKSMAddress } from '../ed25519/address/ksm';
import { getPublicPolkadotAddress } from '../ed25519/address/dot';

class ED25519Coin extends Base {
    curve = Curve.ED25519;
    /**
     * Returns an array of supported methods for the current class.
     *
     * @return {string[]} An array of strings representing the supported methods.
     */
    supportedMethods(): string[] {
        return [
            'getPrivateAddress',
            'getPublicAddress',
            'isValidAddress',
            'getAccount',
            'getSeed',
            'getKeyPair',
            'generateAddresses',
            'getSecretKey',
        ];
    }
    /**
     * Retrieves the private address using the provided key pair.
     *
     * @param {Buffer} privateKey - The key pair object.
     * @return {string} The private address.
     */

    getPrivateAddress({ privateKey }: getPrivateAddressED25591Params) {
        return getSecretAddress({
            secretKey: privateKey,
            bipIdCoin: this.bipIdCoin,
        });
    }

    /**
     * Retrieves the public address based on the provided key pair.
     *
     * @param {getPublicAddressED25519Params} keyPair - The key pair object.
     * @return {string} The public address.
     * @throws {Error} If the derivation name is not supported.
     */
    getPublicAddress({ keyPair }: getPublicAddressED25519Params) {
        const publicKey = getPublicKey({ keyPair, bipIdCoin: this.bipIdCoin });
        const derivation = config[this.idCoin].derivations[0];
        switch (derivation.name) {
            case DerivationName.STELLAR:
                return getPublicStellarAddress({
                    publicKey,
                });

            case DerivationName.XRP:
                return getPublicXRPAddress({
                    publicKey,
                });

            case DerivationName.SOLANA:
                return getPublicSolanaAddress({
                    publicKey,
                });

            case DerivationName.TEZOS:
                return getPublicTezosAddress({
                    publicKey,
                });
            case DerivationName.KSM:
                return getPublicKSMAddress({
                    publicKey,
                });
            case DerivationName.DOT:
                return getPublicPolkadotAddress({
                    publicKey,
                });
            default:
                throw new Error(DerivationTypeNotSupported);
        }
    }
    /**
     * Validates the given address based on the derivation name.
     *
     * @param {string} address - The address to be validated.
     * @return {boolean} Returns true if the address is valid, false otherwise.
     * @throws {Error} Throws an error if the derivation name is not supported.
     */
    isValidAddress(address: string) {
        const derivation = config[this.idCoin].derivations[0];
        switch (derivation.name) {
            case DerivationName.STELLAR:
                return isValidAddressStellar(address);
            case DerivationName.XRP:
                return isValidAddressXRP(address);
            case DerivationName.SOLANA:
                return isValidAddressSolana(address);
            case DerivationName.TEZOS:
                return isValidAddressTezos(address);
            case DerivationName.KSM:
                return isValidAddressKSM(address);
            case DerivationName.DOT:
                return isValidAddressDOT(address);
            default:
                throw new Error(DerivationTypeNotSupported);
        }
    }
    /**
     * Retrieves the account associated with the given key pair.
     *
     * @param {getAccountParams} keyPair - The key pair used to retrieve the account.
     * @return {string} The public key hash of the account if the coin is Tezos, otherwise throws an error.
     * @throws {Error} If the coin is not Tezos.
     */
    getAccount({ keyPair }: getAccountParams): string {
        if (this.idCoin == Coins.TEZOS)
            return getTezosPublicKeyHash({
                keyPair,
            });
        throw new Error(NotImplemented);
    }
    /**
     * Retrieves the seed from the given mnemonic.
     *
     * @param {GetSeedParams} params - The parameters for retrieving the seed.
     * @param {string} params.mnemonic - The mnemonic to generate the seed from.
     * @return {Buffer} The generated seed.
     */
    getSeed({ mnemonic, walletAccount, derivation }: GetSeedParams) {
        return getSeed({ mnemonic, walletAccount, derivation });
    }
    /**
     * Retrieves a key pair using the given seed.
     *
     * @param {GetKeyPairParams} params - The parameters for retrieving the key pair.
     * @param {string} params.seed - The seed used to generate the key pair.
     * @return {Promise<KeyPair>} A promise that resolves to the generated key pair.
     */
    getKeyPair({ seed, walletAccount, derivationName }: GetKeyPairParams) {
        const path =
            config[this.idCoin].derivations.find(a => a.name == derivationName)
                ?.path + '';
        return getKeyPair({ path, seed, walletAccount, derivationName });
    }
    /**
     * Retrieves the secret key based on the provided seed.
     *
     * @param {GetKeyPairParams} seed - The seed used to generate the key pair.
     * @return {Buffer | Uint8Array} The secret key as a Buffer or Uint8Array.
     */
    getSecretKey({
        seed,
        walletAccount,
    }: GetKeyPairParams): Buffer | Uint8Array {
        const path = config[this.idCoin].derivations[0].path + '';
        return getSecretKey({ path, seed, walletAccount });
    }
    /**
     * Generates addresses based on the provided mnemonic.
     *
     * @param {string} mnemonic - The mnemonic used to generate the addresses.
     * @return {AddressResult[]} An array of AddressResult objects representing the generated addresses.
     */
    generateAddresses(
        mnemonic: string,
        walletAccount: number,
    ): AddressResult[] {
        return generateAddresses({
            mnemonic,
            idCoin: this.idCoin,
            walletAccount,
        });
    }
    isValidExtendedKey(_props: any) {
        throw new Error(NotImplemented);
    }
    generatePublicAddresses(_props: any) {
        throw new Error(NotImplemented);
    }
    getRootNode(_props: any) {
        throw new Error(NotImplemented);
    }
    getPrivateMasterKey(_props: any) {
        throw new Error(NotImplemented);
    }

    getPublicMasterKey(_props: any) {
        throw new Error(NotImplemented);
    }
    getPrivateMasterAddress(_props: any) {
        throw new Error(NotImplemented);
    }
    getPublicMasterAddress(_props: any) {
        throw new Error(NotImplemented);
    }
    importMaster(_props: any) {
        throw new Error(NotImplemented);
    }
}

export default ED25519Coin;
