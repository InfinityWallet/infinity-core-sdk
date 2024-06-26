import Keyring, { encodeAddress } from '@polkadot/keyring';
import { isValidPath } from '../../../utils/secp256k1';
import { DerivationTypeNotSupported } from '../../../../errors';
import { u8aToHex } from '@polkadot/util';
import { GetKeyPairCoinParams } from '../types';
import { CoinIds } from '../../../registry';
import { extractPath } from '../../../../utils';
import { KeyringPair } from '@polkadot/keyring/types';
import { mnemonicToMiniSecret } from '@polkadot/util-crypto';
import { DotKeyPair, GetKeyPairPolkadotParams } from './types';
import { derivePath } from '../../../../core/ed25519';
import { DerivationName } from '../../../constants';

/**
 * Returns the Polkadot address associated with the given public key.
 *
 * @param {Object} params - The parameters for generating the address.
 * @param {Uint8Array} params.publicKey - The public key used to generate the address.
 * @return {string} The Polkadot address corresponding to the public key.
 */
export const getPublicPolkadotAddress = ({
    publicKey,
}: {
    publicKey: Uint8Array;
}): string => {
    return encodeAddress(publicKey, 0);
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
export const getKeyPairPolkadot = ({
    path,
    seed,
    walletAccount,
    derivationName,
}: GetKeyPairPolkadotParams): DotKeyPair => {
    if (derivationName == DerivationName.DOT) {
        return getKeyPairPolkadotEd25591({
            path,
            seed,
            walletAccount,
        });
    } else {
        return getKeyPairPolkadotSr25591({
            path,
            seed,
            walletAccount,
        });
    }
};
/**
 * Generates a key pair based on the provided path and seed.
 *
 * @param {GetKeyPairCoinParams} params - An object containing the path and seed.
 * @param {string} params.path - The derivation path.
 * @param {Buffer} params.seed - The seed.
 * @param {number} params.walletAccount - The wallet account ID.
 * @throws {Error} Throws an error if the path is not valid or the coin is not supported.
 * @return {any} Returns the generated key pair.
 */
export const getKeyPairPolkadotEd25591 = ({
    path,
    seed,
    walletAccount,
}: GetKeyPairCoinParams): DotKeyPair => {
    path = path.replace('ACCOUNT', walletAccount + '');
    if (!isValidPath(path)) throw new Error(DerivationTypeNotSupported);
    const coin = extractPath(path)[1].number;
    if (coin != CoinIds.DOT) throw new Error(DerivationTypeNotSupported);
    const keySecret = derivePath(path, seed.toString('hex'));
    let keyring: Keyring = new Keyring({ ss58Format: 0 });
    const keyPair = keyring.addFromSeed(keySecret.key);
    const privateKey = mnemonicToMiniSecret(keySecret.key.toString('hex'));
    return {
        keyPair,
        privateKey,
    };
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
export const getKeyPairPolkadotSr25591 = ({
    seed,
    walletAccount,
}: GetKeyPairCoinParams): DotKeyPair => {
    let keyring: Keyring = new Keyring({ type: 'sr25519', ss58Format: 0 });
    const keyPair = keyring.createFromUri(
        u8aToHex(seed) + '//' + walletAccount,
    );
    return {
        keyPair,
        privateKey: seed,
    };
};

/**
 * Returns the public key from the given key pair. If the coin ID is not supported, an error is thrown.
 *
 * @param {KeyPair} params.keyPair - The key pair from which to extract the public key.
 * @throws {Error} Throws an error if the coin ID is not supported.
 * @return {Buffer | Uint8Array} The extracted public key.
 */
export const getPublicKeyPolkadot = ({ keyPair }: { keyPair: KeyringPair }) => {
    return keyPair.addressRaw;
};

/**
 * Returns the secret address for a given secret key and coin ID.
 *
 * @param {Object} params - An object containing the secret key and coin ID.
 * @param {Buffer} params.secretKey - The secret key.
 * @throws {Error} Throws an error if the coin ID is not supported.
 * @return {string} The secret address.
 */

export const getSecretAddressPolkadot = ({
    secretKey,
}: {
    secretKey: any;
}): string => {
    return '0x' + secretKey.toString('hex');
};

/**
 * Returns the private key from the key pair if available, otherwise returns the raw secret key.
 *
 * @param {GetPrivateKeyParams} keyPair - The key pair object.
 * @return {Uint8Array | Buffer} The private key or raw secret key.
 */
export const getPrivateKeyPolkadot = ({ keyPair }: { keyPair: DotKeyPair }) => {
    return `0x${Buffer.from(keyPair.privateKey).toString('hex')}`;
};
