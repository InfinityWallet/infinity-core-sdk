export = EDDSA;
declare function EDDSA(curve: any): EDDSA;
declare class EDDSA {
    constructor(curve: any);
    curve: any;
    g: any;
    pointClass: any;
    encodingLength: number | undefined;
    hash: Sha512Constructor | undefined;
    /**
     * @param {Array|String} message - message bytes
     * @param {Array|String|KeyPair} secret - secret bytes or a keypair
     * @returns {Signature} - signature
     */
    sign(message: any[] | string, secret: any[] | string | KeyPair): Signature;
    /**
     * @param {Array} message - message bytes
     * @param {Array|String|Signature} sig - sig bytes
     * @param {Array|String|Point|KeyPair} pub - public key
     * @returns {Boolean} - true if public key matches sig of message
     */
    verify(message: any[], sig: any[] | string | Signature, pub: any[] | string | Point | KeyPair): boolean;
    hashInt(...args: any[]): any;
    keyFromPublic(pub: any): KeyPair;
    keyFromSecret(secret: any): KeyPair;
    makeSignature(sig: any): Signature;
    /**
     * * https://tools.ietf.org/html/draft-josefsson-eddsa-ed25519-03#section-5.2
     *
     * EDDSA defines methods for encoding and decoding points and integers. These are
     * helper convenience methods, that pass along to utility functions implied
     * parameters.
     *
     */
    encodePoint(point: any): any;
    decodePoint(bytes: any): any;
    encodeInt(num: any): any;
    decodeInt(bytes: any): any;
    isPoint(val: any): boolean;
}
import KeyPair = require("./key");
import Signature = require("./signature");
