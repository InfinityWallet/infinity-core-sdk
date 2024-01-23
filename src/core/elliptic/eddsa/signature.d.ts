export = Signature;
/**
 * @param {EDDSA} eddsa - eddsa instance
 * @param {Array<Bytes>|Object} sig -
 * @param {Array<Bytes>|Point} [sig.R] - R point as Point or bytes
 * @param {Array<Bytes>|bn} [sig.S] - S scalar as bn or bytes
 * @param {Array<Bytes>} [sig.Rencoded] - R point encoded
 * @param {Array<Bytes>} [sig.Sencoded] - S scalar encoded
 */
declare function Signature(eddsa: EDDSA, sig: Array<Bytes> | Object): void;
declare class Signature {
    /**
     * @param {EDDSA} eddsa - eddsa instance
     * @param {Array<Bytes>|Object} sig -
     * @param {Array<Bytes>|Point} [sig.R] - R point as Point or bytes
     * @param {Array<Bytes>|bn} [sig.S] - S scalar as bn or bytes
     * @param {Array<Bytes>} [sig.Rencoded] - R point encoded
     * @param {Array<Bytes>} [sig.Sencoded] - S scalar encoded
     */
    constructor(eddsa: EDDSA, sig: Array<Bytes> | Object);
    eddsa: EDDSA;
    _R: any;
    _S: any;
    _Rencoded: any;
    _Sencoded: any;
    toBytes(): any;
    toHex(): any;
}
