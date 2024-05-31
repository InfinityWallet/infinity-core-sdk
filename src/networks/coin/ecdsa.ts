import { BIP32Interface } from 'bitcoinjs-lib';
import { Coins, Curve } from '../registry';

import {
    AddressResult,
    getPrivateAddressParams,
    getPrivateMasterKeyParams,
    getPublicAddressParams,
    getPublicMasterKeyParams,
} from '../types';
import { getPrivateMasterKey, getRootNode } from '../utils/secp256k1';

import {
    DerivationTypeNotSupported,
    InvalidAddress,
    NotImplemented,
} from '../../errors';
import {
    getBCPublicAddress,
    getFIOPublicAddress,
    getHarmonyPublicAddress,
    getOKXPublicAddress,
    getPrivateAddress,
    getXDCPublicAddress,
    getPublicAddress,
    getFIOAccount,
} from '../evm/address/index';
import { isValidAddress } from '../utils/evm';
import { isValidAddress as isValidAddressFIO } from '../utils/fio';

import { generateAddresses } from '../generate_address';
import Base from './base';
import config from '../config';
import { DerivationName } from '../constants';

class ECDSACoin extends Base {
    curve = Curve.ECDSA;
    /**
     * Returns an array of strings representing the supported methods of the class.
     *
     * @return {string[]} An array of strings containing the supported methods.
     */
    supportedMethods(): string[] {
        return [
            'getRootNode',
            'getPrivateMasterKey',
            'getPublicMasterKey',
            'getPrivateAddress',
            'getPublicAddress',
            'isValidAddress',
            'generateAddresses',
            'getAccount',
        ];
    }
    /**
     * Retrieves the root node of the BIP32 hierarchical deterministic (HD) tree
     * using the provided mnemonic and network information.
     *
     * @param {string} mnemonic - The mnemonic phrase used to generate the seed for the HD tree.
     * @return {BIP32Interface} The root node of the BIP32 HD tree.
     */
    getRootNode(mnemonic: string): BIP32Interface {
        return getRootNode({ mnemonic, network: config[this.idCoin].network });
    }
    /**
     * Retrieves the private master key using the provided root node.
     *
     * @param {getPrivateMasterKeyParams} params - The parameters for generating the private master key.
     * @param {BIP32Interface} params.rootNode - The root node for key derivation.
     * @return {BIP32Interface} The private master key.
     */
    getPrivateMasterKey({
        rootNode,
        walletAccount,
    }: getPrivateMasterKeyParams): BIP32Interface {
        return getPrivateMasterKey({
            bipIdCoin: this.bipIdCoin,
            protocol: 44,
            rootNode,
            walletAccount,
        });
    }

    /**
     * Retrieves the public master key based on the specified root node.
     *
     * @param {getPublicMasterKeyParams} rootNode - The root node for key derivation.
     * @return {BIP32Interface} The public master key.
     */
    getPublicMasterKey({
        rootNode,
        walletAccount,
    }: getPublicMasterKeyParams): BIP32Interface {
        return getPrivateMasterKey({
            bipIdCoin: this.bipIdCoin,
            protocol: 44,
            rootNode,
            walletAccount,
        }).neutered();
    }

    /**
     * Retrieves the private address associated with the given private account node.
     *
     * @param {getPrivateAddressParams} privateAccountNode - The private account node.
     * @return {string} The private address.
     */
    getPrivateAddress({ privateKey }: getPrivateAddressParams): string {
        return getPrivateAddress({ privateKey });
    }

    /**
     * Retrieves the public address based on the derivation type.
     *
     * @param {getPublicAddressParams} publicAccountNode - The public account node used to generate the public address.
     * @return {string | undefined} The public address based on the specified derivation type.
     */
    getPublicAddress({
        publicAccountNode,
    }: getPublicAddressParams): string | undefined {
        const derivation = config[this.idCoin].derivations[0];
        switch (derivation.name) {
            case DerivationName.LEGACY:
                return getPublicAddress({
                    publicAccountNode,
                });
            case DerivationName.BNB:
                return getBCPublicAddress({
                    publicAccountNode,
                });
            case DerivationName.HARMONY:
                return getHarmonyPublicAddress({
                    publicAccountNode,
                });
            case DerivationName.XDC:
                return getXDCPublicAddress({
                    publicAccountNode,
                });
            case DerivationName.OKX:
                return getOKXPublicAddress({
                    publicAccountNode,
                });
            case DerivationName.FIO:
                return getFIOPublicAddress({
                    publicAccountNode,
                });
            default:
                throw new Error(DerivationTypeNotSupported);
        }
    }
    /**
     * Validates the given address based on the coin type.
     *
     * @param {string} address - The address to be validated.
     * @return {boolean} Returns true if the address is valid, false otherwise.
     */
    isValidAddress(address: string): boolean {
        return this.idCoin == Coins.FIO
            ? isValidAddressFIO(address)
            : isValidAddress(address);
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
    /**
     * Retrieves the account associated with the given public address.
     *
     * @param {string} publicAddress - The public address to retrieve the account for.
     * @return {string} The account associated with the public address.
     * @throws {Error} If the public address is invalid or if the coin type is not supported.
     */
    getAccount(publicAddress: string): string {
        if (!isValidAddress(publicAddress)) {
            throw new Error(InvalidAddress);
        }
        if (this.idCoin == Coins.FIO) {
            return getFIOAccount(publicAddress);
        } else {
            throw new Error(NotImplemented);
        }
    }
    generatePublicAddresses(_props: any) {
        throw new Error(NotImplemented);
    }
    getPrivateMasterAddress(_props: any) {
        throw new Error(NotImplemented);
    }
    getPublicMasterAddress(_props: any) {
        throw new Error(NotImplemented);
    }
    isValidExtendedKey = (_props: any): boolean => {
        throw new Error(NotImplemented);
    };
    getSeed(_props: any) {
        throw new Error(NotImplemented);
    }
    getKeyPair(_props: any) {
        throw new Error(NotImplemented);
    }
    importMaster(_props: any) {
        throw new Error(NotImplemented);
    }
}

export default ECDSACoin;
