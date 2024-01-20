import { sha256 } from './hash';
import { base58check } from '@scure/base';

export function toBase58Check(data: any): string {
    const bytesCoder = base58check(sha256);
    return bytesCoder.encode(Buffer.from(data));
}

export function fromBase58Check(data: string): Buffer {
    const bytesCoder = base58check(sha256);
    return Buffer.from(bytesCoder.decode(data));
}
