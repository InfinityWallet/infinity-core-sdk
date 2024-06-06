import { KeyringPair } from '@polkadot/keyring/types';
import { DerivationName } from '../../../constants';

export type DotKeyPair = {
    keyPair: KeyringPair;
    privateKey: Uint8Array;
};
export type GetKeyPairPolkadotParams = {
    path: string;
    seed: Buffer;
    walletAccount: number;
    derivationName?: DerivationName;
};
