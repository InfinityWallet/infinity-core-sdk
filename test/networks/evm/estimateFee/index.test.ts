import { describe, expect, test } from '@jest/globals';
import { estimateFeeTransfer } from '../../../../lib/commonjs/networks/evm/estimateFee';
import BigNumber from 'bignumber.js';
import { web3Ethereum, web3BSC } from '../helper';
describe('estimateFee', () => {
    test('estimateCurrencyFee(ETH)', async () => {
        const { estimateGas } = await estimateFeeTransfer({
            web3: web3Ethereum,
            chainId: 1,
            priorityFee: '1000000000',
            feeRatio: 0.5,
            source: '0x1402066a3392FF3EA724Ae6ee64194c5D93090DF',
            destination: '0x41414D3EfDf47376ba3D8c7774424AfC7B417Cbf',
            amount: new BigNumber('0.0001').shiftedBy(18).toString(10),
        });
        expect(estimateGas).toBe(21000n);
    });
    test('estimateTokenFee(BSC)', async () => {
        const { estimateGas } = await estimateFeeTransfer({
            web3: web3BSC,
            chainId: 56,
            priorityFee: '1000000000',
            feeRatio: 0.5,
            source: '0xF977814e90dA44bFA03b6295A0616a897441aceC',
            tokenContract: '0x7a58c0be72be218b41c608b7fe7c5bb630736c71',
            destination: '0x41414D3EfDf47376ba3D8c7774424AfC7B417Cbf',
            amount: new BigNumber('1').shiftedBy(18).toString(10),
        });
        expect(estimateGas).toBe(21632n);
    });
    test('estimateBridgeFee', async () => {
        const { estimateGas } = await estimateFeeTransfer({
            web3: web3BSC,
            chainId: 56,
            priorityFee: '1000000000',
            feeRatio: 0.5,
            source: '0xF977814e90dA44bFA03b6295A0616a897441aceC',
            destination: 'bnb1cklnk9wwj9w4h2cn3sugqdlrayf7t89d9m62cc',
            amount: new BigNumber('2').shiftedBy(18).toString(10),
        });
        expect(estimateGas).toBe(82488n);
    });
});