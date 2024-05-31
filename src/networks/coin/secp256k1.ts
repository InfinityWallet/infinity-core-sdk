import { BIP32Interface, Network } from 'bitcoinjs-lib';
import { Curve, Protocol } from '../registry';

import {
    AddressResult,
    GeneratePublicAddressesCoinParams,
    PublicAddressResult,
    getPrivateAddressParams,
    getPrivateMasterAddressParams,
    getPrivateMasterKeyParams,
    getPublicAddressParams,
    getPublicMasterAddressParams,
    getPublicMasterKeyParams,
} from '../types';
import {
    getPrivateMasterKey,
    getRootNode,
    getPublicMasterAddress,
    getPrivateMasterAddress,
} from '../utils/secp256k1';
import {
    getPublicAddressP2PKH,
    getPublicAddressP2WPKHP2S,
    getPublicAddressSegwit,
    importMaster,
} from '../utxo';
import { NotImplemented, ProtocolNotSupported } from '../../errors';
import { getPrivateAddress } from '../evm/address/index';
import { isValidAddress, isValidExtendedKey } from '../utils/utxo';
import {
    generateAddresses,
    generatePublicAddresses,
} from '../generate_address';
import Base from './base';
import config from '../config';

class SECP256K1Coin extends Base {
    curve = Curve.SECP256K1;
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
            'getPrivateMasterAddress',
            'getPublicMasterAddress',
            'getPrivateAddress',
            'getPublicAddress',
            'isValidAddress',
            'isValidExtendedKey',
            'generateAddresses',
            'generatePublicAddresses',
        ];
    }
    /**
     * Retrieves the root node of the BIP32 hierarchy for the given mnemonic and network.
     *
     * @param {string} mnemonic - The mnemonic phrase used to generate the root node.
     * @return {BIP32Interface} The root node of the BIP32 hierarchy.
     */

    getRootNode(mnemonic: string): BIP32Interface {
        return getRootNode({ mnemonic, network: config[this.idCoin].network });
    }

    /**
     * Retrieves the private master key based on the specified protocol and root node.
     *
     * @param {getPrivateMasterKeyParams} protocol - The protocol number. Default is 44.
     * @param {BIP32Interface} rootNode - The root node for key derivation.
     * @return {BIP32Interface} The private master key.
     */
    getPrivateMasterKey({
        protocol = 44,
        rootNode,
        walletAccount,
    }: getPrivateMasterKeyParams): BIP32Interface {
        return getPrivateMasterKey({
            bipIdCoin: this.bipIdCoin,
            protocol,
            rootNode,
            walletAccount,
        });
    }

    /**
     * Retrieves the public master key based on the specified protocol and root node.
     *
     * @param {number} protocol - The protocol number. Default is 44.
     * @param {BIP32Interface} rootNode - The root node for key derivation.
     * @return {BIP32Interface} The public master key.
     */
    getPublicMasterKey({
        protocol = 44,
        rootNode,
        walletAccount,
    }: getPublicMasterKeyParams): BIP32Interface {
        return getPrivateMasterKey({
            bipIdCoin: this.bipIdCoin,
            protocol,
            rootNode,
            walletAccount,
        }).neutered();
    }

    /**
     * Retrieves the private master address based on the specified private account node and protocol.
     *
     * @param {getPrivateMasterAddressParams} privateAccountNode - The private account node.
     * @param {number} [protocol=44] - The protocol number. Default is 44.
     * @return {string} The private master address.
     */

    getPrivateMasterAddress({
        privateAccountNode,
        protocol = 44,
    }: getPrivateMasterAddressParams): string {
        return getPrivateMasterAddress({
            privateAccountNode,
            coinId: this.idCoin,
            protocol,
        });
    }

    /**
     * Returns the public master address for a given public account node and protocol.
     *
     * @param {getPublicMasterAddressParams} publicAccountNode - The public account node.
     * @param {number} [protocol=44] - The protocol number. Default is 44.
     * @return {string} The public master address.
     */

    getPublicMasterAddress({
        publicAccountNode,
        protocol = 44,
    }: getPublicMasterAddressParams): string {
        return getPublicMasterAddress({
            publicAccountNode,
            coinId: this.idCoin,
            protocol,
        });
    }

    /**
     * Retrieves the private address associated with the given private account node, change, and index.
     *
     * @param {Buffer} privateKey - The private account node.
     */
    getPrivateAddress({ privateKey }: getPrivateAddressParams): string {
        return getPrivateAddress({ privateKey });
    }

    /**
     * Retrieves the public address associated with the given public account node, change, index, and protocol.
     *
     * @param {getPublicAddressParams} options - The options for retrieving the public address.
     * @param {BIP32Interface} options.publicAccountNode - The public account node.
     * @param {number} [options.change=0] - The change derivation.
     * @param {number} [options.index=0] - The index derivation.
     * @param {Protocol} options.protocol - The protocol to use for address generation.
     * @return {string | undefined} The public address, or undefined if the protocol is not supported.
     * @throws {Error} If the protocol is not supported.
     */
    getPublicAddress({
        change = 0,
        index = 0,
        publicAccountNode,
        protocol,
    }: getPublicAddressParams): string | undefined {
        const network = config[this.idCoin].network;
        switch (protocol) {
            case Protocol.SEGWIT:
                return getPublicAddressSegwit({
                    publicAccountNode,
                    change,
                    index,
                    network,
                });
            case Protocol.WRAPPED_SEGWIT:
                return getPublicAddressP2WPKHP2S({
                    publicAccountNode,
                    change,
                    index,
                    network,
                });
            case Protocol.LEGACY:
                return getPublicAddressP2PKH({
                    publicAccountNode,
                    change,
                    index,
                    network,
                });
            default:
                throw new Error(ProtocolNotSupported);
        }
    }
    /**
     * Validates the given address by checking it against the network configuration.
     *
     * @param {string} address - The address to be validated.
     * @return {boolean} Returns true if the address is valid, false otherwise.
     */

    isValidAddress(address: string): boolean {
        return isValidAddress(address, config[this.idCoin].network as Network);
    }
    /**
     * Validates the given extended key address by checking it against the network configuration.
     *
     * @param {string} address - The extended key address to be validated.
     * @return {boolean} Returns true if the extended key address is valid, false otherwise.
     */
    isValidExtendedKey(address: string): boolean {
        return isValidExtendedKey(
            address,
            config[this.idCoin].network as Network,
        );
    }
    /**
     * Generates addresses based on the provided mnemonic.
     *
     * @param {string} mnemonic - The mnemonic used to generate the addresses.
     * @return {AddressResult[]} An array of generated addresses.
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
     * Imports the private master address and returns the BIP32Interface.
     *
     * @param {string} privateMasterAddress - The private master address to import.
     * @return {BIP32Interface} The imported BIP32Interface.
     */
    importMaster(privateMasterAddress: string): BIP32Interface {
        return importMaster(
            privateMasterAddress,
            config[this.idCoin].network as Network,
        );
    }
    /**
     * Generates public addresses based on the given parameters.
     *
     * @param {GeneratePublicAddressesCoinParams} options - The options for generating public addresses.
     * @param {number} [options.change=0] - The change value.
     * @param {number} [options.index=0] - The index value.
     * @param {BIP32Interface} options.publicAccountNode - The public account node.
     * @param {DerivationName} options.derivation - The derivation type.
     * @return {PublicAddressResult} The generated public addresses.
     */
    generatePublicAddresses({
        change = 0,
        index = 0,
        publicAccountNode,
        derivation,
    }: GeneratePublicAddressesCoinParams): PublicAddressResult {
        return generatePublicAddresses({
            change,
            index,
            publicAccountNode,
            idCoin: this.idCoin,
            derivation,
        });
    }
    getSeed(_props: any) {
        throw new Error(NotImplemented);
    }
    getKeyPair(_props: any) {
        throw new Error(NotImplemented);
    }
    getAccount(): string {
        throw new Error(NotImplemented);
    }
}

export default SECP256K1Coin;
