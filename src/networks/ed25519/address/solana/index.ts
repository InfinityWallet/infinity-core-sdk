import nacl from 'tweetnacl';
import { base58 } from '../../../../core/base/base58';
import { derivePath } from '../../../../core/ed25519';
import { CoinNotSupported, DerivationTypeNotSupported } from '../../../../errors';
import { extractPath } from '../../../../utils';
import { isValidPath } from '../../../utils/secp256k1';
import { SupportedNetworks } from '../../general';
import { GetKeyPairParams } from '../types';
import { CoinIds, Coins } from '../../../registry';
import config from '../../../config';

/**
 * Returns the Solana public address corresponding to the given public key.
 *
 * @param {Buffer} publicKey - The public key for which the address is generated.
 * @return {string} The Solana public address.
 */
export const getPublicSolanaAddress = ({
    publicKey,
}: {
    publicKey: Buffer;
}): string => {
    const bytes = new Uint8Array(
        publicKey.buffer,
        publicKey.byteOffset,
        publicKey.byteLength,
    );
    return base58.encode(bytes);
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
export const getKeyPairSolana = ({
    path,
    seed,
    walletAccount,
}: GetKeyPairParams): any => {
    path = path.replace('ACCOUNT', walletAccount + '');
    if (!isValidPath(path)) throw new Error(DerivationTypeNotSupported);
    const coin = extractPath(path)[1].number;
    if(coin != CoinIds.SOLANA) throw new Error(DerivationTypeNotSupported);
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
export const getPublicKeySolana = ({ keyPair }: {keyPair:any})  => {
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

export const getSecretAddressSolana = ({
    secretKey,
}: {
    secretKey: Buffer;
}): string => {
    return base58.encode(secretKey);
};

/**
 * Returns the private key from the key pair if available, otherwise returns the raw secret key.
 *
 * @param {GetPrivateKeyParams} keyPair - The key pair object.
 * @return {Uint8Array | Buffer} The private key or raw secret key.
 */
export const getPrivateKeyKusama = ({ seed,walletAccount }: {seed: Buffer,walletAccount:number}) => {
    const keyPair = getKeyPairSolana({ seed, path: config[Coins.SOLANA].derivations[0].path, walletAccount });
    return keyPair.secretKey;
};