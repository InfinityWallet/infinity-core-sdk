"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
const solana_1 = require("../../../../lib/commonjs/networks/utils/solana");
const stellar_1 = require("../../../../lib/commonjs/networks/utils/stellar");
const tezos_1 = require("../../../../lib/commonjs/networks/utils/tezos");
const index_1 = require("../../../../lib/commonjs/networks/ed25519/address/index");
const ksm_1 = require("../../../../lib/commonjs/networks/utils/ksm");
const dot_1 = require("../../../../lib/commonjs/networks/utils/dot");
const xrp_1 = require("../../../../lib/commonjs/networks/utils/xrp");
const index_2 = require("../../../../lib/commonjs/networks/ed25519/address/index");
const tezos_2 = require("../../../../lib/commonjs/networks/utils/tezos");
const registry_1 = require("../../../../lib/commonjs/networks/registry");
const constants_1 = require("../../../../lib/commonjs/networks/constants");
const config_1 = __importDefault(require("../../../../lib/commonjs/networks/config"));
const util_crypto_1 = require("@polkadot/util-crypto");
const mnemonic = 'derive lab over dragon nothing pioneer until deputy inherit help next release';
(0, globals_1.describe)('generateAddressED25519', () => {
    (0, globals_1.test)('generateStellarAddress', async () => {
        const seed = (0, index_2.getSeed)({
            mnemonic,
            walletAccount: 0,
            derivation: constants_1.DerivationName.STELLAR,
        });
        const keyPair = (0, index_2.getKeyPair)({
            path: config_1.default[registry_1.Coins.STELLAR].derivations[0].path,
            seed,
            walletAccount: 0,
            bipIdCoin: registry_1.CoinIds.STELLAR,
            derivationName: constants_1.DerivationName.STELLAR,
        });
        const publicAddress = (0, index_2.getPublicAddress)({
            publicKey: (0, index_2.getPublicKey)({ keyPair, bipIdCoin: registry_1.CoinIds.STELLAR }),
            bipIdCoin: registry_1.CoinIds.STELLAR,
        });
        (0, globals_1.expect)(publicAddress).toBe('GCYKH5F7TTFCKPB25N6ZMA6NUYE62P4QOBZ5WCQGEAQPEZEMNW7F3TOO');
        (0, globals_1.expect)((0, stellar_1.isValidAddress)(publicAddress)).toBe(true);
    });
    (0, globals_1.test)('generateSolanaAddress', async () => {
        const seed = (0, index_2.getSeed)({
            mnemonic,
            walletAccount: 0,
            derivation: constants_1.DerivationName.SOLANA,
        });
        const keyPair = (0, index_2.getKeyPair)({
            path: config_1.default[registry_1.Coins.SOLANA].derivations[0].path,
            seed,
            walletAccount: 0,
            bipIdCoin: registry_1.CoinIds.SOLANA,
            derivationName: constants_1.DerivationName.SOLANA,
        });
        const publicAddress = (0, index_2.getPublicAddress)({
            publicKey: (0, index_2.getPublicKey)({ keyPair, bipIdCoin: registry_1.CoinIds.SOLANA }),
            bipIdCoin: registry_1.CoinIds.SOLANA,
        });
        (0, globals_1.expect)(publicAddress).toBe('HSPjuCaHafg3YUfcQy3iVkLL4g639xHBC9FEiQNzmrWZ');
        (0, globals_1.expect)((0, solana_1.isValidAddress)(publicAddress)).toBe(true);
    });
    (0, globals_1.test)('generateTezosAddress', async () => {
        const seed = (0, index_2.getSeed)({
            mnemonic,
            walletAccount: 0,
            derivation: constants_1.DerivationName.TEZOS,
        });
        const keyPair = (0, index_2.getKeyPair)({
            path: config_1.default[registry_1.Coins.TEZOS].derivations[0].path,
            seed,
            walletAccount: 0,
            bipIdCoin: registry_1.CoinIds.TEZOS,
            derivationName: constants_1.DerivationName.TEZOS,
        });
        const publicAddress = (0, index_2.getPublicAddress)({
            publicKey: (0, index_2.getPublicKey)({ keyPair, bipIdCoin: registry_1.CoinIds.TEZOS }),
            bipIdCoin: registry_1.CoinIds.TEZOS,
        });
        const publicHash = (0, index_1.getTezosPublicKeyHash)({
            keyPair,
        });
        (0, globals_1.expect)(publicAddress).toBe('tz1bHaVSz1e9GeRMV7MUkS5wZmMH5qf8m8Ym');
        (0, globals_1.expect)((0, tezos_1.isValidAddress)(publicAddress)).toBe(true);
        (0, globals_1.expect)((0, tezos_2.isValidPublicKey)(publicHash)).toBe(true);
    });
    (0, globals_1.test)('generateXRPAddress', async () => {
        const seed = (0, index_2.getSeed)({
            mnemonic,
            walletAccount: 0,
            derivation: constants_1.DerivationName.XRP,
        });
        const keyPair = (0, index_2.getKeyPair)({
            path: config_1.default[registry_1.Coins.XRP].derivations[0].path,
            seed,
            walletAccount: 0,
            bipIdCoin: registry_1.CoinIds.XRP,
            derivationName: constants_1.DerivationName.XRP,
        });
        const publicAddress = (0, index_2.getPublicAddress)({
            publicKey: (0, index_2.getPublicKey)({ keyPair, bipIdCoin: registry_1.CoinIds.XRP }),
            bipIdCoin: registry_1.CoinIds.XRP,
        });
        (0, globals_1.expect)(publicAddress).toBe('rwDLcZL1MwUmyLwshgpxE6zRhxkAorwQDp');
        (0, globals_1.expect)((0, xrp_1.isValidAddress)(publicAddress)).toBe(true);
    });
    (0, globals_1.test)('generateDOTAddress', async () => {
        await (0, util_crypto_1.cryptoWaitReady)();
        const seed = (0, index_2.getSeed)({
            mnemonic,
            walletAccount: 0,
            derivation: constants_1.DerivationName.DOT,
        });
        const keyPair = (0, index_2.getKeyPair)({
            path: config_1.default[registry_1.Coins.DOT].derivations[0].path,
            seed,
            walletAccount: 0,
            bipIdCoin: registry_1.CoinIds.DOT,
            derivationName: constants_1.DerivationName.DOT,
        });
        const publicAddress = (0, index_2.getPublicAddress)({
            publicKey: (0, index_2.getPublicKey)({ keyPair, bipIdCoin: registry_1.CoinIds.DOT }),
            bipIdCoin: registry_1.CoinIds.DOT,
        });
        (0, globals_1.expect)(publicAddress).toBe('15PevHkrsB6q43DPbyS5idBPZFuqXwoAkQqtkagxZRZicVr');
        (0, globals_1.expect)((0, dot_1.isValidAddress)(publicAddress)).toBe(true);
    });
    (0, globals_1.test)('generateKSMAddress', async () => {
        await (0, util_crypto_1.cryptoWaitReady)();
        const seed = (0, index_2.getSeed)({
            mnemonic,
            walletAccount: 0,
            derivation: constants_1.DerivationName.KSM,
        });
        const keyPair = (0, index_2.getKeyPair)({
            path: config_1.default[registry_1.Coins.KSM].derivations[0].path,
            seed,
            walletAccount: 0,
            bipIdCoin: registry_1.CoinIds.KSM,
            derivationName: constants_1.DerivationName.KSM,
        });
        const publicAddress = (0, index_2.getPublicAddress)({
            publicKey: (0, index_2.getPublicKey)({ keyPair, bipIdCoin: registry_1.CoinIds.KSM }),
            bipIdCoin: registry_1.CoinIds.KSM,
        });
        (0, globals_1.expect)(publicAddress).toBe('D8Kd9wUf3YEMGrnnD6agDDsppyiHBVfoHePwNgM9v3EGrcw');
        (0, globals_1.expect)((0, ksm_1.isValidAddress)(publicAddress)).toBe(true);
    });
    (0, globals_1.test)('generateDOTStandardAddress', async () => {
        await (0, util_crypto_1.cryptoWaitReady)();
        const seed = (0, index_2.getSeed)({
            mnemonic,
            walletAccount: 0,
            derivation: constants_1.DerivationName.DOT_STANDARD,
        });
        const keyPair = (0, index_2.getKeyPair)({
            path: config_1.default[registry_1.Coins.DOT].derivations[1].path,
            seed,
            walletAccount: 0,
            bipIdCoin: registry_1.CoinIds.DOT,
            derivationName: constants_1.DerivationName.DOT_STANDARD,
        });
        const publicAddress = (0, index_2.getPublicAddress)({
            publicKey: (0, index_2.getPublicKey)({ keyPair, bipIdCoin: registry_1.CoinIds.DOT }),
            bipIdCoin: registry_1.CoinIds.DOT,
        });
        const privateAddress = (0, index_1.getSecretAddress)({
            secretKey: keyPair.privateKey,
            bipIdCoin: registry_1.CoinIds.DOT,
        });
        console.log(privateAddress);
        (0, globals_1.expect)(publicAddress).toBe('15dJyHAF2cgCvKq3wFpYYzfAjvwF9FYqYeqLH2ebamrSMeum');
        (0, globals_1.expect)((0, dot_1.isValidAddress)(publicAddress)).toBe(true);
    });
    (0, globals_1.test)('generateKSMStandardAddress', async () => {
        await (0, util_crypto_1.cryptoWaitReady)();
        const seed = (0, index_2.getSeed)({
            mnemonic,
            walletAccount: 0,
            derivation: constants_1.DerivationName.KSM_STANDARD,
        });
        const keyPair = (0, index_2.getKeyPair)({
            path: config_1.default[registry_1.Coins.KSM].derivations[1].path,
            seed,
            walletAccount: 0,
            bipIdCoin: registry_1.CoinIds.KSM,
            derivationName: constants_1.DerivationName.KSM_STANDARD,
        });
        const publicAddress = (0, index_2.getPublicAddress)({
            publicKey: (0, index_2.getPublicKey)({ keyPair, bipIdCoin: registry_1.CoinIds.KSM }),
            bipIdCoin: registry_1.CoinIds.KSM,
        });
        const privateAddress = (0, index_1.getSecretAddress)({
            secretKey: keyPair.privateKey,
            bipIdCoin: registry_1.CoinIds.KSM,
        });
        console.log(privateAddress);
        (0, globals_1.expect)(publicAddress).toBe('D8Kd9wUf3YEMGrnnD6agDDsppyiHBVfoHePwNgM9v3EGrcw');
        (0, globals_1.expect)((0, ksm_1.isValidAddress)(publicAddress)).toBe(true);
    });
});
