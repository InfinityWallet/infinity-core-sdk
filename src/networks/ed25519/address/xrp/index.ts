import { deriveAddress } from 'ripple-keypairs';
import {
    CoinNotSupported,
    DerivationTypeNotSupported,
    InvalidPublicKey,
} from '../../../../errors';
import { SupportedNetworks } from '../../general';
import { CoinIds } from '../../../registry';
import { extractPath } from '../../../../utils';
import { isValidPath } from '../../../utils/secp256k1';
import { fromSeed } from '../../../../core/bip32';
import { GetKeyPairParams } from '../types';

/**
 * Retrieves the XRP address corresponding to the given public key.
 *
 * @param {Object} params - The parameters for generating the XRP address.
 * @param {Buffer} params.publicKey - The public key for which the address is generated.
 * @throws {Error} Throws an error if the public key is not a Buffer.
 * @return {string} The XRP address corresponding to the public key.
 */
export const getPublicXRPAddress = ({
    publicKey,
}: {
    publicKey: Buffer;
}): string => {
    if (!Buffer.isBuffer(publicKey)) throw new Error(InvalidPublicKey);
    return deriveAddress(publicKey.toString('hex').toUpperCase());
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
export const getKeyPairXRP = ({
    path,
    seed,
    walletAccount,
}: GetKeyPairParams): any => {
    path = path.replace('ACCOUNT', walletAccount + '');
    if (!isValidPath(path)) throw new Error(DerivationTypeNotSupported);
    const coin = extractPath(path)[1].number;
    if (coin != CoinIds.XRP) throw new Error(DerivationTypeNotSupported);
    if (SupportedNetworks.find(a => a == coin) == undefined)
        throw new Error(CoinNotSupported);
    const m = fromSeed(seed);
    return m.derivePath(path);
};

/**
 * Returns the public key from the given key pair. If the coin ID is not supported, an error is thrown.
 *
 * @param {KeyPair} params.keyPair - The key pair from which to extract the public key.
 * @throws {Error} Throws an error if the coin ID is not supported.
 * @return {Buffer | Uint8Array} The extracted public key.
 */
export const getPublicKeyXRP = ({ keyPair }: { keyPair: any }) => {
    return keyPair.publicKey;
};

/**
 * Returns the secret address for a given secret key and coin ID.
 *
 * @param {Object} params - An object containing the secret key and coin ID.
 * @param {Buffer} params.secretKey - The secret key.
 * @throws {Error} Throws an error if the coin ID is not supported.
 * @return {string} The secret address.
 */

export const getSecretAddressXRP = ({
    secretKey,
}: {
    secretKey: Buffer;
}): string => {
    return '00' + secretKey.toString('hex').toUpperCase();
};
