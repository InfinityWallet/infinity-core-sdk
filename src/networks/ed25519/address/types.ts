import { DerivationName } from '../../constants';
import { CoinIds } from '../../registry';

export type GetKeyPairParams = {
    path: string;
    seed: Buffer;
    walletAccount: number;
    derivationName: DerivationName;
    bipIdCoin?: CoinIds;
};
export type GetKeyPairCoinParams = {
    path: string;
    seed: Buffer;
    walletAccount: number;
};
export type GetPublicKeyParams = {
    keyPair: any;
    bipIdCoin: CoinIds;
};

export type GetPrivateKeyParams = {
    keyPair: any;
    bipIdCoin: CoinIds;
};

export type SeedParams = {
    mnemonic: string;
    walletAccount: number;
    derivation: DerivationName;
};
