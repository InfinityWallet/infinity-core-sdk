import { describe, expect, test } from '@jest/globals';
import { isValidAddress } from '../../../../lib/commonjs/networks/utils/solana';
import { isValidAddress as isValidAddressStellar } from '../../../../lib/commonjs/networks/utils/stellar';
import { isValidAddress as isValidAddressTezos } from '../../../../lib/commonjs/networks/utils/tezos';
import {
    getSecretAddress,
    getTezosPublicKeyHash,
} from '../../../../lib/commonjs/networks/ed25519/address/index';
import { isValidAddress as isValidAddressKSM } from '../../../../lib/commonjs/networks/utils/ksm';
import { isValidAddress as isValidAddressDOT } from '../../../../lib/commonjs/networks/utils/dot';
import { isValidAddress as isValidAddressXRP } from '../../../../lib/commonjs/networks/utils/xrp';

import {
    getSeed,
    getPublicKey,
    getKeyPair,
    getPublicAddress,
} from '../../../../lib/commonjs/networks/ed25519/address/index';
import { isValidPublicKey } from '../../../../lib/commonjs/networks/utils/tezos';
import { CoinIds, Coins } from '../../../../lib/commonjs/networks/registry';
import { DerivationName } from '../../../../lib/commonjs/networks/constants';
import config from '../../../../lib/commonjs/networks/config';
import { cryptoWaitReady } from '@polkadot/util-crypto';
const mnemonic =
    'derive lab over dragon nothing pioneer until deputy inherit help next release';

describe('generateAddressED25519', () => {
    test('generateStellarAddress', async () => {
        const seed = getSeed({
            mnemonic,
            walletAccount: 0,
            derivation: DerivationName.STELLAR,
        });
        const keyPair = getKeyPair({
            path: config[Coins.STELLAR].derivations[0].path,
            seed,
            walletAccount: 0,
            bipIdCoin: CoinIds.STELLAR,
            derivationName: DerivationName.STELLAR,
        });
        const publicAddress = getPublicAddress({
            publicKey: getPublicKey({ keyPair, bipIdCoin: CoinIds.STELLAR }),
            bipIdCoin: CoinIds.STELLAR,
        });
        expect(publicAddress).toBe(
            'GCYKH5F7TTFCKPB25N6ZMA6NUYE62P4QOBZ5WCQGEAQPEZEMNW7F3TOO',
        );
        expect(isValidAddressStellar(publicAddress)).toBe(true);
    });
    test('generateSolanaAddress', async () => {
        const seed = getSeed({
            mnemonic,
            walletAccount: 0,
            derivation: DerivationName.SOLANA,
        });
        const keyPair = getKeyPair({
            path: config[Coins.SOLANA].derivations[0].path,
            seed,
            walletAccount: 0,
            bipIdCoin: CoinIds.SOLANA,
            derivationName: DerivationName.SOLANA,
        });
        const publicAddress = getPublicAddress({
            publicKey: getPublicKey({ keyPair, bipIdCoin: CoinIds.SOLANA }),
            bipIdCoin: CoinIds.SOLANA,
        });
        expect(publicAddress).toBe(
            'HSPjuCaHafg3YUfcQy3iVkLL4g639xHBC9FEiQNzmrWZ',
        );
        expect(isValidAddress(publicAddress)).toBe(true);
    });
    test('generateTezosAddress', async () => {
        const seed = getSeed({
            mnemonic,
            walletAccount: 0,
            derivation: DerivationName.TEZOS,
        });
        const keyPair = getKeyPair({
            path: config[Coins.TEZOS].derivations[0].path,
            seed,
            walletAccount: 0,
            bipIdCoin: CoinIds.TEZOS,
            derivationName: DerivationName.TEZOS,
        });
        const publicAddress = getPublicAddress({
            publicKey: getPublicKey({ keyPair, bipIdCoin: CoinIds.TEZOS }),
            bipIdCoin: CoinIds.TEZOS,
        });
        const publicHash = getTezosPublicKeyHash({
            keyPair,
        });
        expect(publicAddress).toBe('tz1bHaVSz1e9GeRMV7MUkS5wZmMH5qf8m8Ym');
        expect(isValidAddressTezos(publicAddress)).toBe(true);
        expect(isValidPublicKey(publicHash)).toBe(true);
    });
    test('generateXRPAddress', async () => {
        const seed = getSeed({
            mnemonic,
            walletAccount: 0,
            derivation: DerivationName.XRP,
        });
        const keyPair = getKeyPair({
            path: config[Coins.XRP].derivations[0].path,
            seed,
            walletAccount: 0,
            bipIdCoin: CoinIds.XRP,
            derivationName: DerivationName.XRP,
        });
        const publicAddress = getPublicAddress({
            publicKey: getPublicKey({ keyPair, bipIdCoin: CoinIds.XRP }),
            bipIdCoin: CoinIds.XRP,
        });
        expect(publicAddress).toBe('rwDLcZL1MwUmyLwshgpxE6zRhxkAorwQDp');
        expect(isValidAddressXRP(publicAddress)).toBe(true);
    });
    test('generateDOTAddress', async () => {
        await cryptoWaitReady();
        const seed = getSeed({
            mnemonic,
            walletAccount: 0,
            derivation: DerivationName.DOT,
        });
        const keyPair = getKeyPair({
            path: config[Coins.DOT].derivations[0].path,
            seed,
            walletAccount: 0,
            bipIdCoin: CoinIds.DOT,
            derivationName: DerivationName.DOT,
        });
        const publicAddress = getPublicAddress({
            publicKey: getPublicKey({ keyPair, bipIdCoin: CoinIds.DOT }),
            bipIdCoin: CoinIds.DOT,
        });
        expect(publicAddress).toBe(
            '15PevHkrsB6q43DPbyS5idBPZFuqXwoAkQqtkagxZRZicVr',
        );
        expect(isValidAddressDOT(publicAddress)).toBe(true);
    });
    test('generateKSMAddress', async () => {
        await cryptoWaitReady();

        const seed = getSeed({
            mnemonic,
            walletAccount: 0,
            derivation: DerivationName.KSM,
        });
        const keyPair = getKeyPair({
            path: config[Coins.KSM].derivations[0].path,
            seed,
            walletAccount: 0,
            bipIdCoin: CoinIds.KSM,
            derivationName: DerivationName.KSM,
        });
        const publicAddress = getPublicAddress({
            publicKey: getPublicKey({ keyPair, bipIdCoin: CoinIds.KSM }),
            bipIdCoin: CoinIds.KSM,
        });
        expect(publicAddress).toBe(
            'D8Kd9wUf3YEMGrnnD6agDDsppyiHBVfoHePwNgM9v3EGrcw',
        );
        expect(isValidAddressKSM(publicAddress)).toBe(true);
    });
    test('generateDOTStandardAddress', async () => {
        await cryptoWaitReady();

        const seed = getSeed({
            mnemonic,
            walletAccount: 0,
            derivation: DerivationName.DOT_STANDARD,
        });
        const keyPair = getKeyPair({
            path: config[Coins.DOT].derivations[1].path,
            seed,
            walletAccount: 0,
            bipIdCoin: CoinIds.DOT,
            derivationName: DerivationName.DOT_STANDARD,
        });
        const publicAddress = getPublicAddress({
            publicKey: getPublicKey({ keyPair, bipIdCoin: CoinIds.DOT }),
            bipIdCoin: CoinIds.DOT,
        });
        const privateAddress = getSecretAddress({
            secretKey: keyPair.privateKey,
            bipIdCoin: CoinIds.DOT,
        });
        console.log(privateAddress);
        expect(publicAddress).toBe(
            '19GwNgTeZrzwRT2pLKxQUNiB2b2CNMzVcKBHKsHEhbv6uHP',
        );
        expect(isValidAddressDOT(publicAddress)).toBe(true);
    });
    test('generateKSMStandardAddress', async () => {
        await cryptoWaitReady();

        const seed = getSeed({
            mnemonic,
            walletAccount: 0,
            derivation: DerivationName.KSM_STANDARD,
        });
        const keyPair = getKeyPair({
            path: config[Coins.KSM].derivations[1].path,
            seed,
            walletAccount: 0,
            bipIdCoin: CoinIds.KSM,
            derivationName: DerivationName.KSM_STANDARD,
        });
        const publicAddress = getPublicAddress({
            publicKey: getPublicKey({ keyPair, bipIdCoin: CoinIds.KSM }),
            bipIdCoin: CoinIds.KSM,
        });
        const privateAddress = getSecretAddress({
            secretKey: keyPair.privateKey,
            bipIdCoin: CoinIds.KSM,
        });
        console.log(privateAddress);
        expect(publicAddress).toBe(
            'CibTMmGR9cTFYFxdQ61AGuZTzscJjd2sVRSWh9tAQntfeN4',
        );
        expect(isValidAddressKSM(publicAddress)).toBe(true);
    });
});
