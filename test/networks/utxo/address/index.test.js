"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const secp256k1_1 = require("../../../../lib/commonjs/networks/utils/secp256k1");
const address_1 = require("../../../../lib/commonjs/networks/utxo/address");
const globals_1 = require("@jest/globals");
const registry_1 = require("../../../../lib/commonjs/networks/registry");
const mnemonic = 'derive lab over dragon nothing pioneer until deputy inherit help next release';
const networkBTC = {
    messagePrefix: '\u0018Bitcoin Signed Message:\n',
    bech32: 'bc',
    bip32: {
        public: 76067358,
        private: 76066276,
    },
    pubKeyHash: 0,
    scriptHash: 5,
    wif: 128,
};
const networkLTC = {
    messagePrefix: '\u0018Bitcoin Signed Message:\n',
    bech32: 'ltc',
    bip32: {
        private: 0x019d9cfe,
        public: 0x019da462,
    },
    pubKeyHash: 0x30,
    scriptHash: 0x32,
    wif: 0xb0,
};
(0, globals_1.describe)('generateAddressUTXO', () => {
    (0, globals_1.test)('generateExtendedPrivateKeyBTC', async () => {
        const rootNode = (0, secp256k1_1.getRootNode)({ mnemonic, network: networkBTC });
        const privateAccountNode = (0, secp256k1_1.getPrivateMasterKey)({
            bipIdCoin: registry_1.CoinIds.BTC,
            protocol: registry_1.Protocol.WRAPPED_SEGWIT,
            rootNode,
            walletAccount: 0,
        });
        (0, globals_1.expect)((0, secp256k1_1.xprvToYprv)(privateAccountNode.toBase58())).toBe('yprvAHZLii61veRXpyD1b7vfCAUapNPfpoYCiVA78H5Ddn7uSFjBnXv8JtQpVgsgtudUwgCHHGFnGMTgETVjFNzu2j8SLZuR6ZK7Qiczin1QwWS');
    });
    (0, globals_1.test)('generateExtendedPrivateKeySegwitBTC', async () => {
        const rootNode = (0, secp256k1_1.getRootNode)({ mnemonic, network: networkBTC });
        const privateAccountNode = (0, secp256k1_1.getPrivateMasterKey)({
            bipIdCoin: registry_1.CoinIds.BTC,
            protocol: registry_1.Protocol.SEGWIT,
            rootNode,
            walletAccount: 0,
        });
        (0, globals_1.expect)((0, secp256k1_1.xprvToZprv)(privateAccountNode.toBase58())).toBe('zprvAcf4ncnUAESerj58XNSsX57U76UiqNwuRmqcgK2KksLtwaFCiP7P21EAifdWVN9dkByxZ2RZ58gLwiR1p1nky91CF83MSkt36tFfkcRGksM');
    });
    (0, globals_1.test)('generateExtendedPublicKeyBTC', async () => {
        const rootNode = (0, secp256k1_1.getRootNode)({ mnemonic, network: networkBTC });
        const publicAccountNode = (0, secp256k1_1.getPublicMasterKey)({
            bipIdCoin: registry_1.CoinIds.BTC,
            protocol: registry_1.Protocol.LEGACY,
            rootNode,
            walletAccount: 0,
        });
        (0, globals_1.expect)(publicAccountNode.toBase58()).toBe('xpub6CRVjHtvvpPy5jpN9ppfjLA1ttbSYYZZfhrwyJEX1p2NYkx3xhvhNCiPJ9rjp3JDLTLsQAaesL8JLrUCbrxE4KKPRGqYLgvibRoC7a7gpww');
    });
    (0, globals_1.test)('xpubToYpub', async () => {
        const rootNode = (0, secp256k1_1.getRootNode)({ mnemonic, network: networkBTC });
        const publicAccountNode = (0, secp256k1_1.getPublicMasterKey)({
            bipIdCoin: registry_1.CoinIds.BTC,
            protocol: registry_1.Protocol.WRAPPED_SEGWIT,
            rootNode,
            walletAccount: 0,
        });
        (0, globals_1.expect)((0, secp256k1_1.xpubToYpub)(publicAccountNode.toBase58())).toBe('ypub6WYh8Dcum1yq3THUh9TfZJRKNQEAEGG45i5hvfUqC7etK44LL5ENrgjJLzkDQupjAKg7sAUo91YKqzJSXjH9AVHxmAgUaCjq9yhmawGm1xG');
    });
    (0, globals_1.test)('xpubToZpub', async () => {
        const rootNode = (0, secp256k1_1.getRootNode)({ mnemonic, network: networkBTC });
        const publicAccountNode = (0, secp256k1_1.getPublicMasterKey)({
            bipIdCoin: registry_1.CoinIds.BTC,
            protocol: registry_1.Protocol.SEGWIT,
            rootNode,
            walletAccount: 0,
        });
        (0, globals_1.expect)((0, secp256k1_1.xpubToZpub)(publicAccountNode.toBase58())).toBe('zpub6qeRC8KMzbzx5D9bdPystD4Cf8KDEqfknzmDUhRwKCsspNaMFvRdZoYeZxUYVkWx8E274jeFk4EWKmWqvaZSR2KUNfHyppdVByAbE9GSTPM');
    });
    (0, globals_1.test)('getPublicAddressP2WPKHP2S', async () => {
        const rootNode = (0, secp256k1_1.getRootNode)({ mnemonic, network: networkBTC });
        const publicAccountNode = (0, secp256k1_1.getPublicMasterKey)({
            bipIdCoin: registry_1.CoinIds.BTC,
            protocol: registry_1.Protocol.WRAPPED_SEGWIT,
            rootNode,
            walletAccount: 0,
        });
        const publicAddress = (0, address_1.getPublicAddressP2WPKHP2S)({
            change: 0,
            index: 0,
            publicAccountNode,
            network: networkBTC,
        });
        (0, globals_1.expect)(publicAddress).toBe('32juhuebHD1h2nEkBeUN3LnrNAVVdfuB8m');
    });
    (0, globals_1.test)('getPublicAddressLTC', async () => {
        const rootNode = (0, secp256k1_1.getRootNode)({ mnemonic, network: networkLTC });
        const publicAccountNode = (0, secp256k1_1.getPublicMasterKey)({
            bipIdCoin: registry_1.CoinIds.LTC,
            protocol: registry_1.Protocol.LEGACY,
            rootNode,
            walletAccount: 0,
        });
        const publicAddress = (0, address_1.getPublicAddressP2PKH)({
            change: 0,
            index: 0,
            publicAccountNode,
            network: networkLTC,
        });
        (0, globals_1.expect)(publicAddress).toBe('LNiHyZY6wstYSJnkyE8dXTCGZRuBk7526m');
    });
    (0, globals_1.test)('getPublicAddressSegwit', async () => {
        const rootNode = (0, secp256k1_1.getRootNode)({ mnemonic, network: networkBTC });
        const publicAccountNode = (0, secp256k1_1.getPublicMasterKey)({
            bipIdCoin: registry_1.CoinIds.BTC,
            protocol: registry_1.Protocol.SEGWIT,
            rootNode,
            walletAccount: 0,
        });
        const publicAddress = (0, address_1.getPublicAddressSegwit)({
            change: 0,
            index: 0,
            publicAccountNode,
            network: networkBTC,
        });
        (0, globals_1.expect)(publicAddress).toBe('bc1qh493z9tmfegw2z4ly26whu8crh3ukwl4v4jkvj');
    });
    (0, globals_1.test)('getPrivateAddressLTC', async () => {
        const rootNode = (0, secp256k1_1.getRootNode)({ mnemonic, network: networkLTC });
        const privateAccountNode = (0, secp256k1_1.getPrivateMasterKey)({
            bipIdCoin: registry_1.CoinIds.LTC,
            protocol: registry_1.Protocol.LEGACY,
            rootNode,
            walletAccount: 0,
        });
        const privateAddress = (0, address_1.getPrivateAddress)({
            privateKey: (0, secp256k1_1.getPrivateKey)({
                privateAccountNode,
            }),
        });
        (0, globals_1.expect)(privateAddress).toBe('TAy1gDZ6EfCGpdMac415snAv1DkgzGaS7uHDK2QdZcC4us6Qt4En');
    });
});
