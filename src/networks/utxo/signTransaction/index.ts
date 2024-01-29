import { SignTransactionParams } from './types';

export const signTransaction = async ({
    web3,
    transaction,
    privateAddress,
}: SignTransactionParams) => {
    const signedTransaction = await web3.eth.accounts.signTransaction(
        transaction,
        privateAddress,
    );
    return signedTransaction?.rawTransaction;
};