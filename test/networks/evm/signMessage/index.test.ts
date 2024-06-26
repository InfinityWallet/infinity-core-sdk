import { describe, expect, test } from '@jest/globals';
import {
    signMessage,
    verifyMessage,
} from '../../../../lib/commonjs/networks/evm/signMessage';
import { getPublicAddress } from '../../../../lib/commonjs/networks/evm/address';
import {
    getPrivateKey,
    getPrivateMasterKey,
    getRootNode,
    getPublicMasterKey,
} from '../../../../lib/commonjs/networks/utils/secp256k1';
import { CoinIds, Protocol } from '../../../../lib/commonjs/networks/registry';

const mnemonic =
    'derive lab over dragon nothing pioneer until deputy inherit help next release';
const network = {
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
describe('signMessageEVM', () => {
    test('signMessage(BSC)', async () => {
        const rootNode = getRootNode({ mnemonic, network });
        const privateAccountNode = getPrivateMasterKey({
            bipIdCoin: CoinIds.ETH,
            protocol: Protocol.LEGACY,
            rootNode,
            walletAccount: 0,
        });
        const privateKey = getPrivateKey({
            privateAccountNode,
        }).privateKey;
        const signature = signMessage({
            message: 'Some data',
            privateKey: privateKey as Buffer,
        });
        expect(signature).toBe(
            '0xc43ae069d67e364a0a539f20a2a598cbf9f2988e0b4c26ec79d9cfc42a3621c42fc5fe5887e991d0a45951e23799b6d58c6f8a8813e622398ca23219f88670aa1b',
        );
    });
    test('verifyMessage(BSC)', async () => {
        const rootNode = getRootNode({ mnemonic, network });
        const publicAccountNode = getPublicMasterKey({
            bipIdCoin: CoinIds.ETH,
            protocol: Protocol.LEGACY,
            rootNode,
            walletAccount: 0,
        });
        const publicAddress = getPublicAddress({
            publicAccountNode,
        });
        const signature =
            '0xc43ae069d67e364a0a539f20a2a598cbf9f2988e0b4c26ec79d9cfc42a3621c42fc5fe5887e991d0a45951e23799b6d58c6f8a8813e622398ca23219f88670aa1b';
        const verify = await verifyMessage({
            message: 'Some data',
            address: publicAddress as string,
            signature,
        });
        expect(verify).toBe(true);
    });
});
