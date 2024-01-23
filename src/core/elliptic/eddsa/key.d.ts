export = KeyPair;
/**
 * @param {EDDSA} eddsa - instance
 * @param {Object} params - public/private key parameters
 *
 * @param {Array<Byte>} [params.secret] - secret seed bytes
 * @param {Point} [params.pub] - public key point (aka `A` in eddsa terms)
 * @param {Array<Byte>} [params.pub] - public key point encoded as bytes
 *
 */
declare function KeyPair(eddsa: EDDSA, params: {
    secret?: Byte[] | undefined;
    pub?: any;
    pub?: any;
}): void;
declare class KeyPair {
    /**
     * @param {EDDSA} eddsa - instance
     * @param {Object} params - public/private key parameters
     *
     * @param {Array<Byte>} [params.secret] - secret seed bytes
     * @param {Point} [params.pub] - public key point (aka `A` in eddsa terms)
     * @param {Array<Byte>} [params.pub] - public key point encoded as bytes
     *
     */
    constructor(eddsa: EDDSA, params: {
        secret?: Byte[] | undefined;
        pub?: any;
        pub?: any;
    });
    eddsa: EDDSA;
    _secret: any;
    _pub: any;
    _pubBytes: any;
    secret(): any;
    sign(message: any): any;
    verify(message: any, sig: any): any;
    getSecret(enc: any): any;
    getPublic(enc: any): any;
}
declare namespace KeyPair {
    function fromPublic(eddsa: any, pub: any): KeyPair;
    function fromSecret(eddsa: any, secret: any): KeyPair;
}
