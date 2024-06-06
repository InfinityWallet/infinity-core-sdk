import { describe, expect, test } from '@jest/globals';
import {
    getSeed,
    sign,
    getSecretKey,
} from '../../../../lib/commonjs/networks/ed25519';
import config from '../../../../lib/commonjs/networks/config';
import { Coins } from '../../../../lib/commonjs/networks/registry';
import { DerivationName } from '../../../../lib/commonjs/networks/constants';

const mnemonic =
    'derive lab over dragon nothing pioneer until deputy inherit help next release';

describe('signMessageED25519', () => {
    test('signMessageStellar', async () => {
        const seed = getSeed({
            mnemonic,
            walletAccount: 0,
            derivation: DerivationName.STELLAR,
        });
        const secretKey = getSecretKey({
            path: config[Coins.TEZOS].derivations[0].path,
            seed,
            walletAccount: 0,
        });
        const signedMessage = sign({
            secretKey,
            message: Buffer.from('Message to sign', 'utf-8'),
        });
        expect(Buffer.from(signedMessage).toString('hex')).toBe(
            '4823529380a27dc72cb687eb2487bc5f05f9e90f6ee578185b4e50a67c30e663ee54d1917c19995406b77bbe7a9f90d6f61605acca3a1d94f7a466555c626809',
        );
    });
    test('signMessageSolana', async () => {
        const seed = getSeed({
            mnemonic,
            walletAccount: 0,
            derivation: DerivationName.SOLANA,
        });
        const secretKey = getSecretKey({
            path: config[Coins.SOLANA].derivations[0].path,
            seed,
            walletAccount: 0,
        });
        const signedMessage = sign({
            secretKey,
            message: Buffer.from('Message to sign', 'utf-8'),
        });
        expect(Buffer.from(signedMessage).toString('hex')).toBe(
            'f929e426aec83c0460a17eab3d3f872239c08ee442e3dabdad5ae14e50afb47452fc6e28a8e9d4043227ff6113dd7a0893ea47580242f2d877743581ab718402',
        );
    });
});
