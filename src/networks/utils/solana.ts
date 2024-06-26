import { ed25519 } from '@noble/curves/ed25519';
import { BN } from 'bn.js';
import { base58 } from '../../core/base/base58';
export const isValidMemo = (memo: string) => {
    if (typeof memo != 'string') return false;
    return /^[a-zA-Z0-9]{0,283}$/.test(memo);
};
function isOnCurve(publicKey: Uint8Array): boolean {
    try {
        ed25519.ExtendedPoint.fromHex(publicKey);
        return true;
    } catch (e) {
        console.error(e);
        return false;
    }
}
export const PUBLIC_KEY_LENGTH = 32;
function toBuffer(_bn: any): Buffer {
    const b = _bn.toArrayLike(Buffer);
    if (b.length === PUBLIC_KEY_LENGTH) {
        return b;
    }

    const zeroPad = Buffer.alloc(32);
    b.copy(zeroPad, 32 - b.length);
    return zeroPad;
}
export const isValidAddress = (address: string) => {
    if (typeof address != 'string') return false;
    const decoded = base58.decode(address);
    if (decoded.length != PUBLIC_KEY_LENGTH) {
        throw new Error(`Invalid public key input`);
    }
    const bn = new BN(decoded);
    const buf = toBuffer(bn);
    const uarray = new Uint8Array(buf.buffer, buf.byteOffset, buf.byteLength);
    return isOnCurve(uarray);
};
