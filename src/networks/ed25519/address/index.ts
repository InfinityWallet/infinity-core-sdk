import nacl from 'tweetnacl';
import { mnemonicToSeedSync, validateMnemonic } from '../../../core/bip39';
import { derivePath } from '../../../core/ed25519';

import {
    CoinNotSupported,
    DerivationTypeNotSupported,
    DerivePathError,
    InvalidMnemonic,
    InvalidSeed,
} from '../../../errors/networks';
import {
    AddressResult,
    GenerateAddressParams,
    PublicKeyEd25519Params,
} from '../../types';
import { extractPath } from '../../../utils';
import { Keypair } from 'stellar-sdk';
import {
    GetKeyPairParams,
    GetPrivateKeyParams,
    GetPublicKeyParams,
    SeedParams,
} from './types';
import { isValidPath } from '../../utils/secp256k1';
import { SupportedNetworks } from '../general';
import { CoinIds, Protocol } from '../../registry';
import {
    getKeyPairKusama,
    getPublicKSMAddress,
    getPublicKeyKusama,
    getSecretAddressKusama,
} from './ksm';
import {
    getKeyPairPolkadot,
    getPublicKeyPolkadot,
    getPublicPolkadotAddress,
    getSecretAddressPolkadot,
} from './dot';
import {
    getKeyPairTezos,
    getPublicKeyTezos,
    getPublicTezosAddress,
    getSecretAddressTezos,
    getTezosPublicKeyHash,
} from './tezos';
import {
    getKeyPairSolana,
    getPublicKeySolana,
    getPublicSolanaAddress,
    getSecretAddressSolana,
} from './solana';
import {
    getKeyPairXRP,
    getPublicKeyXRP,
    getPublicXRPAddress,
    getSecretAddressXRP,
} from './xrp';
import {
    getKeyPairStellar,
    getPublicKeyStellar,
    getPublicStellarAddress,
    getSecretAddressStellar,
} from './stellar';
import { mnemonicToMiniSecret } from '@polkadot/util-crypto';
import { DerivationName } from '../../constants';

/**
 * Retrieves the seed from the given mnemonic.
 *
 * @param {RootNodeParams} mnemonic - The mnemonic to generate the seed from.
 * @return {Buffer} The generated seed.
 */
export const getSeed = ({ mnemonic, derivation }: SeedParams): Buffer => {
    if (!validateMnemonic(mnemonic)) throw new Error(InvalidMnemonic);
    if (
        derivation == DerivationName.DOT_STANDARD ||
        derivation == DerivationName.KSM_STANDARD
    ) {
        return mnemonicToMiniSecret(mnemonic) as Buffer;
    } else {
        return mnemonicToSeedSync(mnemonic);
    }
};

/**
 * Retrieves the secret key based on the provided seed and path.
 *
 * @param {PublicKeyEd25519Params} params - An object containing the seed and path.
 * @param {Buffer} params.seed - The seed.
 * @param {string} params.path - The derivation path.
 * @param {number} params.walletAccount - The wallet account.
 * @throws {Error} Throws an error if the path is not valid or the seed is not a buffer.
 * @return {Uint8Array | Buffer} Returns the secret key as a Uint8Array or Buffer.
 */
export const getSecretKey = ({
    seed,
    path,
    walletAccount,
}: PublicKeyEd25519Params): Uint8Array | Buffer => {
    path = path.replace('ACCOUNT', walletAccount + '');
    if (!isValidPath(path)) throw new Error(DerivePathError);
    if (!Buffer.isBuffer(seed)) throw new Error(InvalidSeed);
    const keySecret = derivePath(path, seed.toString('hex'));
    const coin = extractPath(path)[1].number;
    if (coin == CoinIds.STELLAR) {
        const keyPairSecret = Keypair.fromRawEd25519Seed(keySecret.key);
        return Buffer.concat([
            keyPairSecret.rawSecretKey(),
            keyPairSecret.rawPublicKey(),
        ]);
    } else if (coin == CoinIds.KSM || coin == CoinIds.DOT) {
        return mnemonicToMiniSecret(seed.toString('hex'));
    }

    const keyPair = nacl.sign.keyPair.fromSeed(keySecret.key);
    return keyPair.secretKey;
};

/**
 * Returns the secret address for a given secret key and coin ID.
 *
 * @param {Object} params - An object containing the secret key and coin ID.
 * @param {Buffer} params.secretKey - The secret key.
 * @param {CoinIds} params.bipIdCoin - The coin ID.
 * @throws {Error} Throws an error if the coin ID is not supported.
 * @return {string} The secret address.
 */

export const getSecretAddress = ({
    secretKey,
    bipIdCoin,
}: {
    secretKey: Buffer;
    bipIdCoin: CoinIds;
}): string => {
    if (SupportedNetworks.find(a => a == bipIdCoin) == undefined)
        throw new Error(CoinNotSupported);
    switch (bipIdCoin) {
        case CoinIds.XRP:
            return getSecretAddressXRP({ secretKey });
        case CoinIds.KSM:
            return getSecretAddressKusama({ secretKey });
        case CoinIds.STELLAR:
            return getSecretAddressStellar({ secretKey });
        case CoinIds.SOLANA:
            return getSecretAddressSolana({ secretKey });
        case CoinIds.DOT:
            return getSecretAddressPolkadot({ secretKey });
        case CoinIds.TEZOS:
            return getSecretAddressTezos({ secretKey });
        default:
            throw new Error(DerivationTypeNotSupported);
    }
};

/**
 * Generates a key pair based on the provided path and seed.
 *
 * @param {GetKeyPairParams} params - An object containing the path and seed.
 * @param {string} params.path - The derivation path.
 * @param {Buffer} params.seed - The seed.
 * @param {number} params.walletAccount - The wallet account ID.
 * @throws {Error} Throws an error if the path is not valid or the coin is not supported.
 * @return {any} Returns the generated key pair.
 */
export const getKeyPair = ({
    path,
    seed,
    walletAccount,
    derivationName,
    bipIdCoin,
}: GetKeyPairParams): any => {
    switch (bipIdCoin) {
        case CoinIds.XRP:
            return getKeyPairXRP({ path, seed, walletAccount, derivationName });
        case CoinIds.STELLAR:
            return getKeyPairStellar({
                path,
                seed,
                walletAccount,
                derivationName,
            });
        case CoinIds.TEZOS:
            return getKeyPairTezos({
                path,
                seed,
                walletAccount,
                derivationName,
            });
        case CoinIds.DOT:
            return getKeyPairPolkadot({
                path,
                seed,
                walletAccount,
                derivationName,
            });
        case CoinIds.KSM:
            return getKeyPairKusama({
                path,
                seed,
                walletAccount,
                derivationName,
            });
        case CoinIds.SOLANA:
            return getKeyPairSolana({
                path,
                seed,
                walletAccount,
                derivationName,
            });
        default:
            throw new Error(DerivationTypeNotSupported);
    }
};

/**
 * Returns the public key from the given key pair. If the coin ID is not supported, an error is thrown.
 * If the coin ID is TEZOS, the public key is hashed using blake2b with a digest length of 20.
 * If the coin ID is 148, the raw public key is returned. Otherwise, the public key is returned as is.
 *
 * @param {GetPublicKeyParams} params - An object containing the key pair and the coin ID.
 * @param {KeyPair} params.keyPair - The key pair from which to extract the public key.
 * @param {CoinIds} params.bipIdCoin - The coin ID used to determine how to extract the public key.
 * @throws {Error} Throws an error if the coin ID is not supported.
 * @return {Buffer | Uint8Array} The extracted public key.
 */
export const getPublicKey = ({ keyPair, bipIdCoin }: GetPublicKeyParams) => {
    if (SupportedNetworks.find(a => a == bipIdCoin) == undefined)
        throw new Error(CoinNotSupported);
    switch (bipIdCoin) {
        case CoinIds.XRP:
            return getPublicKeyXRP({ keyPair });
        case CoinIds.STELLAR:
            return getPublicKeyStellar({ keyPair });
        case CoinIds.TEZOS:
            return getPublicKeyTezos({ keyPair });
        case CoinIds.DOT:
            return getPublicKeyPolkadot({ keyPair: keyPair.keyPair });
        case CoinIds.KSM:
            return getPublicKeyKusama({ keyPair: keyPair.keyPair });
        case CoinIds.SOLANA:
            return getPublicKeySolana({ keyPair });
        default:
            throw new Error(DerivationTypeNotSupported);
    }
};

/**
 * Returns the private key from the key pair if available, otherwise returns the raw secret key.
 *
 * @param {GetPrivateKeyParams} keyPair - The key pair object.
 * @return {Uint8Array | Buffer} The private key or raw secret key.
 */
export const getPrivateKey = ({ keyPair, bipIdCoin }: GetPrivateKeyParams) => {
    if (bipIdCoin == CoinIds.STELLAR) {
        return keyPair.rawSecretKey();
    }
    return keyPair?.secretKey ?? keyPair?.privateKey ?? keyPair.rawSecretKey();
};

export const getPublicAddress = ({
    publicKey,
    bipIdCoin,
}: {
    publicKey: any;
    bipIdCoin: CoinIds;
}) => {
    if (SupportedNetworks.find(a => a == bipIdCoin) == undefined)
        throw new Error(CoinNotSupported);
    switch (bipIdCoin) {
        case CoinIds.XRP:
            return getPublicXRPAddress({ publicKey });
        case CoinIds.STELLAR:
            return getPublicStellarAddress({ publicKey });
        case CoinIds.TEZOS:
            return getPublicTezosAddress({ publicKey });
        case CoinIds.DOT:
            return getPublicPolkadotAddress({ publicKey });
        case CoinIds.KSM:
            return getPublicKSMAddress({ publicKey });
        case CoinIds.SOLANA:
            return getPublicSolanaAddress({ publicKey });
        default:
            throw new Error(DerivationTypeNotSupported);
    }
};

/**
 * Generates addresses based on derivation and mnemonic.
 *
 * @param {GenerateAddressParams} derivation - The derivation parameters.
 * @param {number} params.walletAccount - The wallet account ID.
 * @return {AddressResult} The generated address result.
 */
export const generateAddresses = ({
    derivation,
    mnemonic,
    walletAccount,
}: GenerateAddressParams): AddressResult => {
    if (!isValidPath(derivation.path.replace('ACCOUNT', walletAccount + '')))
        throw new Error(DerivationTypeNotSupported);
    const path = extractPath(
        derivation.path.replace('ACCOUNT', walletAccount + ''),
    );
    if (SupportedNetworks.find(a => a == path[1].number) == undefined)
        throw new Error(CoinNotSupported);
    const seed = getSeed({
        mnemonic,
        derivation: derivation.name,
        walletAccount,
    });
    const newAddress = {} as AddressResult;
    const keyPair = getKeyPair({
        path: derivation.path,
        seed,
        walletAccount,
        derivationName: derivation.name,
    });
    newAddress.protocol = path[0].number as Protocol;
    newAddress.derivationName = derivation.name;

    newAddress.publicKey = getPublicKey({ keyPair, bipIdCoin: path[1].number });
    newAddress.privateKey = getPrivateKey({
        keyPair,
        bipIdCoin: path[1].number,
    });
    newAddress.privateAddress = getSecretAddress({
        secretKey: newAddress.privateKey,
        bipIdCoin: path[1].number,
    });
    newAddress.publicAddress = getPublicAddress({
        publicKey: newAddress.publicKey,
        bipIdCoin: path[1].number,
    });
    if (path[1].number == CoinIds.TEZOS) {
        newAddress.account = getTezosPublicKeyHash({ keyPair });
    }
    return newAddress;
};

export { getTezosPublicKeyHash } from './tezos';
