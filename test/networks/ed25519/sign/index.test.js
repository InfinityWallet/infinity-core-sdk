"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
const ed25519_1 = require("../../../../lib/commonjs/networks/ed25519");
const config_1 = __importDefault(require("../../../../lib/commonjs/networks/config"));
const registry_1 = require("../../../../lib/commonjs/networks/registry");
const constants_1 = require("../../../../lib/commonjs/networks/constants");
const mnemonic = 'derive lab over dragon nothing pioneer until deputy inherit help next release';
(0, globals_1.describe)('signMessageED25519', () => {
    (0, globals_1.test)('signMessageStellar', async () => {
        const seed = (0, ed25519_1.getSeed)({
            mnemonic,
            walletAccount: 0,
            derivation: constants_1.DerivationName.STELLAR,
        });
        const secretKey = (0, ed25519_1.getSecretKey)({
            path: config_1.default[registry_1.Coins.TEZOS].derivations[0].path,
            seed,
            walletAccount: 0,
        });
        const signedMessage = (0, ed25519_1.sign)({
            secretKey,
            message: Buffer.from('Message to sign', 'utf-8'),
        });
        (0, globals_1.expect)(Buffer.from(signedMessage).toString('hex')).toBe('4823529380a27dc72cb687eb2487bc5f05f9e90f6ee578185b4e50a67c30e663ee54d1917c19995406b77bbe7a9f90d6f61605acca3a1d94f7a466555c626809');
    });
    (0, globals_1.test)('signMessageSolana', async () => {
        const seed = (0, ed25519_1.getSeed)({
            mnemonic,
            walletAccount: 0,
            derivation: constants_1.DerivationName.SOLANA,
        });
        const secretKey = (0, ed25519_1.getSecretKey)({
            path: config_1.default[registry_1.Coins.SOLANA].derivations[0].path,
            seed,
            walletAccount: 0,
        });
        const signedMessage = (0, ed25519_1.sign)({
            secretKey,
            message: Buffer.from('Message to sign', 'utf-8'),
        });
        (0, globals_1.expect)(Buffer.from(signedMessage).toString('hex')).toBe('f929e426aec83c0460a17eab3d3f872239c08ee442e3dabdad5ae14e50afb47452fc6e28a8e9d4043227ff6113dd7a0893ea47580242f2d877743581ab718402');
    });
});
