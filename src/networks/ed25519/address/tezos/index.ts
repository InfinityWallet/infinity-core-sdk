import nacl from 'tweetnacl';
import { b58cencode } from '../../../../core/base/base58';
import { derivePath } from '../../../../core/ed25519';
import { CoinNotSupported, DerivationTypeNotSupported } from '../../../../errors';
import { extractPath } from '../../../../utils';
import { CoinIds } from '../../../registry';
import { isValidPath } from '../../../utils/secp256k1';
import { Prefix, prefix } from '../../../utils/tezos';
import { SupportedNetworks } from '../../general';
import { GetKeyPairParams, GetPrivateKeyParams } from '../types';
import { blake2b } from '@noble/hashes/blake2b';

/**
 * Returns the Tezos public address corresponding to the given public key.
 *
 * @param {object} params - The parameters for generating the public address.
 * @param {Uint8Array} params.publicKey - The public key for which the address is generated.
 * @return {string} The Tezos public address.
 */
export const getPublicTezosAddress = ({
    publicKey,
}: {
    publicKey: Uint8Array;
}): string => {
    return b58cencode(publicKey, prefix[Prefix.TZ1]);
};

/**
 * Returns the base58-encoded Tezos public key hash of the given key pair.
 *
 * @param {GetTezosPublicKeyParams} params - An object containing the key pair.
 * @param {Keypair} params.keyPair - The key pair to generate the public key hash from.
 * @return {string} The base58-encoded Tezos public key hash.
 */
export const getTezosPublicKeyHash = ({ keyPair }: { keyPair: any}) => {
    return b58cencode(keyPair.publicKey, prefix[Prefix.EDPK]);
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
export const getKeyPairTezos = ({
    path,
    seed,
    walletAccount,
}: GetKeyPairParams): any => {
    path = path.replace('ACCOUNT', walletAccount + '');
    if (!isValidPath(path)) throw new Error(DerivationTypeNotSupported);
    const coin = extractPath(path)[1].number;
    if(coin != CoinIds.TEZOS) throw new Error(DerivationTypeNotSupported);
    if (SupportedNetworks.find(a => a == coin) == undefined)
        throw new Error(CoinNotSupported);
    const keySecret = derivePath(path, seed.toString('hex'));
    return nacl.sign.keyPair.fromSeed(keySecret.key);
};

/**
 * Returns the public key from the given key pair. If the coin ID is not supported, an error is thrown.
 *
 * @param {KeyPair} params.keyPair - The key pair from which to extract the public key.
 * @throws {Error} Throws an error if the coin ID is not supported.
 * @return {Buffer | Uint8Array} The extracted public key.
 */
export const getPublicKeyTezos = ({ keyPair }: {keyPair:any})  => {
    return blake2b(keyPair.publicKey, { dkLen: 20 });
};


/**
 * Returns the secret address for a given secret key and coin ID.
 *
 * @param {Object} params - An object containing the secret key and coin ID.
 * @param {Buffer} params.secretKey - The secret key.
 * @throws {Error} Throws an error if the coin ID is not supported.
 * @return {string} The secret address.
 */

export const getSecretAddressTezos = ({
    secretKey,
}: {
    secretKey: Buffer;
}): string => {
    return b58cencode(secretKey, prefix[Prefix.EDSK]);
};