import { KeyringPair } from '@polkadot/keyring/types';
import { DerivationName } from '../../../constants';

export type KSMKeyPair = {
    keyPair: KeyringPair;
    privateKey: Uint8Array;
};
export type GetKeyPairKSMParams = {
    path: string;
    seed: Buffer;
    walletAccount: number;
    derivationName?: DerivationName;
};
