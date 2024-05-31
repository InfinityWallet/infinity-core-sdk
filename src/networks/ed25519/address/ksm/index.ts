import Keyring, { encodeAddress } from "@polkadot/keyring";
import { DerivationTypeNotSupported } from "../../../../errors";
import { isValidPath } from "../../../utils/secp256k1";
import { GetKeyPairParams } from "../types";
import { derivePath } from "../../../../core/ed25519";
import { CoinIds } from "../../../registry";
import { extractPath } from "../../../../utils";
import { KeyringPair } from "@polkadot/keyring/types";
import { mnemonicToMiniSecret } from "@polkadot/util-crypto";

/**
 * Returns the KSM public address corresponding to the given public key.
 *
 * @param {object} params - The parameters for generating the public address.
 * @param {Uint8Array} params.publicKey - The public key for which the address is generated.
 * @return {string} The KSM public address.
 */
export const getPublicKSMAddress = ({
    publicKey,
}: {
    publicKey: Uint8Array;
}): string => {
    return encodeAddress(publicKey, 2);
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
export const getKeyPairKusama = ({
    path,
    seed,
    walletAccount,
}: GetKeyPairParams): any => {
    path = path.replace('ACCOUNT', walletAccount + '');
    if (!isValidPath(path)) throw new Error(DerivationTypeNotSupported);
    const coin = extractPath(path)[1].number;
    if(coin != CoinIds.KSM) throw new Error(DerivationTypeNotSupported);
    const keySecret = derivePath(path, seed.toString('hex'));
    let keyring: Keyring = new Keyring({ ss58Format: 2 });
    return keyring.addFromSeed(keySecret.key);
};

/**
 * Returns the public key from the given key pair. If the coin ID is not supported, an error is thrown.
 *
 * @param {KeyPair} params.keyPair - The key pair from which to extract the public key.
 * @throws {Error} Throws an error if the coin ID is not supported.
 * @return {Buffer | Uint8Array} The extracted public key.
 */
export const getPublicKeyKusama = ({ keyPair }: {keyPair:KeyringPair})  => {
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

export const getSecretAddressKusama = ({
    secretKey,
}: {
    secretKey: Buffer;
}): string => {
    return '0x' + secretKey.toString('hex');
};

/**
 * Returns the private key from the key pair if available, otherwise returns the raw secret key.
 *
 * @param {GetPrivateKeyParams} keyPair - The key pair object.
 * @return {Uint8Array | Buffer} The private key or raw secret key.
 */
export const getPrivateKeyKusama = ({ seed }: {seed: Buffer}) => {
    const privateKey = mnemonicToMiniSecret(seed.toString('hex'));
    return `0x${Buffer.from(privateKey).toString('hex')}`;
};