import { DerivationName, Encoding } from './constants';
import { Chains } from './evm/general';
import networks from './networks';
import { CoinIds, Coins, Curve, Protocol } from './registry';
import { Derivation } from './types';

const config: Record<Coins, Derivation> = {
    [Coins.BTC]: {
        derivations: [
            {
                name: DerivationName.SEGWIT,
                path: "m/84'/0'/ACCOUNT'/0/0",
                xpub: Encoding.ZPUB,
                xprv: Encoding.ZPRIV,
                protocol: Protocol.SEGWIT,
            },
            {
                name: DerivationName.WRAPPED_SEGWIT,
                path: "m/49'/0'/ACCOUNT'/0/0",
                xpub: Encoding.YPUB,
                xprv: Encoding.YPRIV,
                protocol: Protocol.WRAPPED_SEGWIT,
            },
        ],
        bip44: CoinIds.BTC,
        curve: Curve.SECP256K1,
        network: networks[Coins.BTC],
        dust: 546,
        rpc: ['https://btc1.trezor.io'],
        apiUrl: 'https://btc1.trezor.io',
    },
    [Coins.LTC]: {
        derivations: [
            {
                name: DerivationName.LEGACY,
                path: "m/44'/2'/ACCOUNT'/0/0",
                xpub: Encoding.LTUB,
                xprv: Encoding.LTPV,
                protocol: Protocol.LEGACY,
            },
        ],
        bip44: CoinIds.LTC,
        curve: Curve.SECP256K1,
        network: networks[Coins.LTC],
        dust: 1000,
        rpc: ['https://ltc1.trezor.io'],
        apiUrl: 'https://ltc1.trezor.io',
    },
    [Coins.DOGE]: {
        derivations: [
            {
                name: DerivationName.LEGACY,
                path: "m/44'/3'/ACCOUNT'/0/0",
                xpub: Encoding.DGUB,
                xprv: Encoding.DGPUV,
                protocol: Protocol.LEGACY,
            },
        ],
        bip44: CoinIds.DOGE,
        curve: Curve.SECP256K1,
        network: networks[Coins.DOGE],
        dust: 50000000,
        rpc: ['https://doge1.trezor.io'],
        apiUrl: 'https://doge1.trezor.io',
    },
    [Coins.FIO]: {
        derivations: [
            {
                name: DerivationName.FIO,
                path: "m/44'/235'/ACCOUNT'/0/0",
                protocol: Protocol.LEGACY,
            },
        ],
        bip44: CoinIds.FIO,
        curve: Curve.ECDSA,
        network: networks[Coins.FIO],
        dust: 546,
        rpc: ['https://fio.blockpane.com/v1/'],
        apiUrl: 'https://fio.blockpane.com',
    },
    [Coins.STELLAR]: {
        derivations: [
            {
                name: DerivationName.STELLAR,
                path: "m/44'/148'/ACCOUNT'",
                protocol: Protocol.LEGACY,
            },
        ],
        bip44: CoinIds.STELLAR,
        curve: Curve.ED25519,
        network: networks[Coins.STELLAR],
        dust: 10000,
        rpc: ['https://horizon.stellar.org'],
        apiUrl: 'https://horizon.stellar.org',
    },
    [Coins.SOLANA]: {
        derivations: [
            {
                name: DerivationName.SOLANA,
                path: "m/44'/501'/ACCOUNT'/0'",
                protocol: Protocol.LEGACY,
            },
        ],
        bip44: CoinIds.SOLANA,
        curve: Curve.ED25519,
        network: networks[Coins.SOLANA],
        rpc: ['https://mainnet-beta.solflare.network'],
    },
    [Coins.TEZOS]: {
        derivations: [
            {
                name: DerivationName.TEZOS,
                path: "m/44'/1729'/ACCOUNT'/0'",
                protocol: Protocol.LEGACY,
            },
        ],
        bip44: CoinIds.TEZOS,
        curve: Curve.ED25519,
        network: networks[Coins.TEZOS],
        rpc: ['https://prod.tcinfra.net/rpc/mainnet'],
        apiUrl: 'https://api.tzkt.io',
    },
    [Coins.XRP]: {
        derivations: [
            {
                name: DerivationName.XRP,
                path: "m/44'/144'/ACCOUNT'/0/0",
                protocol: Protocol.LEGACY,
            },
        ],
        bip44: CoinIds.XRP,
        curve: Curve.ED25519,
        network: networks[Coins.XRP],
        rpc: [
            'wss://xrplcluster.com',
            'wss://xrpl.link',
            'wss://s2.ripple.com',
        ],
        apiUrl: 'https://s1.ripple.com:51234',
    },
    [Coins.ETH]: {
        derivations: [
            {
                name: DerivationName.LEGACY,
                path: "m/44'/60'/ACCOUNT'/0/0",
                protocol: Protocol.LEGACY,
            },
        ],
        bip44: CoinIds.ETH,
        curve: Curve.ECDSA,
        network: networks[Coins.ETH],
        chain: Chains.ETH,
        apiKey: '6ED2Z4CPYC16PQIBDXZH69NV8B23JI5CXE',
        rpc: ['https://rpc.ankr.com/eth'],
        apiUrl: 'https://api.etherscan.io',
    },
    [Coins.BNB]: {
        derivations: [
            {
                name: DerivationName.BNB,
                path: "m/44'/714'/ACCOUNT'/0/0",
                protocol: Protocol.LEGACY,
            },
        ],
        bip44: CoinIds.BNB,
        curve: Curve.ECDSA,
        network: networks[Coins.BNB],
        rpc: ['https://dex.bnbchain.org'],
    },
    [Coins.MATIC]: {
        derivations: [
            {
                name: DerivationName.LEGACY,
                path: "m/44'/60'/ACCOUNT'/0/0",
                protocol: Protocol.LEGACY,
            },
        ],
        bip44: CoinIds.ETH,
        curve: Curve.ECDSA,
        network: networks[Coins.MATIC],
        chain: Chains.MATIC,
        apiKey: 'H6WD6D2CIX8TQNRTV39NVETWDNX64FAXG1',
        rpc: ['https://polygon-rpc.com'],
        apiUrl: 'https://api.polygonscan.com',
    },
    [Coins.BSC]: {
        derivations: [
            {
                name: DerivationName.LEGACY,
                path: "m/44'/60'/ACCOUNT'/0/0",
                protocol: Protocol.LEGACY,
            },
        ],
        bip44: CoinIds.ETH,
        curve: Curve.ECDSA,
        network: networks[Coins.BSC],
        chain: Chains.BSC,
        apiKey: 'XJ26CWNQZHSK7ZK5PZDMI5E6PJS9SS3GNB',
        rpc: ['https://bsc-dataseed.bnbchain.org'],
        apiUrl: 'https://api.bscscan.com',
    },
    [Coins.GRS]: {
        derivations: [
            {
                name: DerivationName.SEGWIT,
                path: "m/84'/17'/ACCOUNT'/0/0",
                xpub: Encoding.ZPUB,
                xprv: Encoding.ZPRIV,
                protocol: Protocol.SEGWIT,
            },
        ],
        bip44: CoinIds.GRS,
        curve: Curve.SECP256K1,
        network: networks[Coins.GRS],
        dust: 1000,
        rpc: ['https://blockbook.groestlcoin.org'],
        apiUrl: 'https://blockbook.groestlcoin.org',
    },
    [Coins.ONE]: {
        derivations: [
            {
                name: DerivationName.HARMONY,
                path: "m/44'/60'/ACCOUNT'/0/0",
                protocol: Protocol.LEGACY,
            },
            {
                name: DerivationName.LEGACY,
                path: "m/44'/60'/ACCOUNT'/0/0",
                protocol: Protocol.LEGACY,
            },
        ],
        bip44: CoinIds.ETH,
        curve: Curve.ECDSA,
        network: networks[Coins.ONE],
        chain: Chains.ONE,
        rpc: ['https://api.harmony.one'],
    },
    [Coins.CRS]: {
        derivations: [
            {
                name: DerivationName.LEGACY,
                path: "m/44'/60'/ACCOUNT'/0/0",
                protocol: Protocol.LEGACY,
            },
        ],
        bip44: CoinIds.ETH,
        curve: Curve.ECDSA,
        chain: Chains.CRS,
        apiKey: 'YUTCIFR27BFAPHTWW5S8JQ6WXI75ZJTXNP',
        network: networks[Coins.CRS],
        rpc: ['https://evm.cronos.org'],
        apiUrl: 'https://api.cronoscan.com',
    },
    [Coins.VET]: {
        derivations: [
            {
                name: DerivationName.LEGACY,
                path: "m/44'/60'/ACCOUNT'/0/0",
                protocol: Protocol.LEGACY,
            },
        ],
        bip44: CoinIds.ETH,
        curve: Curve.ECDSA,
        network: networks[Coins.VET],
        chain: Chains.VET,
        rpc: ['https://mainnet.vechain.org'],
        apiUrl: 'https://explore.vechain.org',
    },
    [Coins.AVAX]: {
        derivations: [
            {
                name: DerivationName.LEGACY,
                path: "m/44'/60'/ACCOUNT'/0/0",
                protocol: Protocol.LEGACY,
            },
        ],
        bip44: CoinIds.ETH,
        curve: Curve.ECDSA,
        network: networks[Coins.AVAX],
        chain: Chains.AVAX,
        apiKey: 'JNU58ZF1ZNCV1SJ4YZ7VQBFQWDK2U1KTXS',
        rpc: ['https://api.avax.network/ext/bc/C/rpc'],
        apiUrl: 'https://api.snowtrace.io',
    },
    [Coins.XDC]: {
        derivations: [
            {
                name: DerivationName.XDC,
                path: "m/44'/60'/ACCOUNT'/0/0",
                protocol: Protocol.LEGACY,
            },
        ],
        bip44: CoinIds.ETH,
        curve: Curve.ECDSA,
        network: networks[Coins.XDC],
        chain: Chains.XDC,
        rpc: ['https://erpc.xinfin.network'],
        apiUrl: 'https://xdc.blocksscan.io/api',
    },
    [Coins.KCC]: {
        derivations: [
            {
                name: DerivationName.LEGACY,
                path: "m/44'/60'/ACCOUNT'/0/0",
                protocol: Protocol.LEGACY,
            },
        ],
        bip44: CoinIds.ETH,
        curve: Curve.ECDSA,
        network: networks[Coins.KCC],
        chain: Chains.KCC,
        rpc: ['https://rpc-mainnet.kcc.network'],
        apiUrl: 'https://scan.kcc.io',
        apiUrlSecundary: 'https://explorer.kcc.io',
    },
    [Coins.OKX]: {
        derivations: [
            {
                name: DerivationName.OKX,
                path: "m/44'/60'/ACCOUNT'/0/0",
                protocol: Protocol.LEGACY,
            },
        ],
        bip44: CoinIds.ETH,
        curve: Curve.ECDSA,
        network: networks[Coins.OKX],
        chain: Chains.OKX,
        rpc: ['https://exchainrpc.okex.org'],
    },
    [Coins.ARB]: {
        derivations: [
            {
                name: DerivationName.LEGACY,
                path: "m/44'/60'/ACCOUNT'/0/0",
                protocol: Protocol.LEGACY,
            },
        ],
        bip44: CoinIds.ETH,
        curve: Curve.ECDSA,
        network: networks[Coins.ARB],
        chain: Chains.ARB,
        apiKey: 'JNNU81YTJCYSGKRVYZ6W4XDBSGWM5I2INU',
        rpc: ['https://arb1.arbitrum.io/rpc'],
        apiUrl: 'https://api.arbiscan.io',
    },
    [Coins.BSC_TESTNET]: {
        derivations: [
            {
                name: DerivationName.LEGACY,
                path: "m/44'/60'/ACCOUNT'/0/0",
                protocol: Protocol.LEGACY,
            },
        ],
        bip44: CoinIds.ETH,
        curve: Curve.ECDSA,
        network: networks[Coins.BSC_TESTNET],
        chain: Chains.BSC_TESTNET,
        rpc: ['https://data-seed-prebsc-1-s1.binance.org:8545'],
    },
    [Coins.ETH_TESTNET]: {
        derivations: [
            {
                name: DerivationName.LEGACY,
                path: "m/44'/60'/ACCOUNT'/0/0",
                protocol: Protocol.LEGACY,
            },
        ],
        bip44: CoinIds.ETH,
        curve: Curve.ECDSA,
        network: networks[Coins.ETH_TESTNET],
        chain: Chains.ETH_TESTNET,
        rpc: ['wss://ropsten.infura.io/ws/v3/7a88decb96744f998ab69192dc97fb40'],
    },
    [Coins.OP]: {
        derivations: [
            {
                name: DerivationName.LEGACY,
                path: "m/44'/60'/ACCOUNT'/0/0",
                protocol: Protocol.LEGACY,
            },
        ],
        bip44: CoinIds.ETH,
        curve: Curve.ECDSA,
        network: networks[Coins.OP],
        chain: Chains.OP,
        apiKey: 'HCC93UJPD1AIJSJASCY3NG8VPANP8MUETH',
        rpc: [
            'https://optimism-mainnet.infura.io/v3/b6bf7d3508c941499b10025c0776eaf8',
        ],
        apiUrl: 'https://api-optimistic.etherscan.io',
    },
    [Coins.BASE]: {
        derivations: [
            {
                name: DerivationName.LEGACY,
                path: "m/44'/60'/ACCOUNT'/0/0",
                protocol: Protocol.LEGACY,
            },
        ],
        bip44: CoinIds.ETH,
        curve: Curve.ECDSA,
        network: networks[Coins.BASE],
        chain: Chains.BASE,
        apiKey: 'FAKRDWBWMEG7PKA74XSUCHUG8GU73UH18D',
        rpc: ['https://base-rpc.publicnode.com'],
        apiUrl: 'https://api.basescan.org',
    },
    [Coins.DOT]: {
        derivations: [
            {
                name: DerivationName.DOT,
                path: "m/44'/354'/ACCOUNT'/0'/0'",
                protocol: Protocol.LEGACY,
            },
        ],
        bip44: CoinIds.DOT,
        curve: Curve.ED25519,
        network: networks[Coins.DOT],
        rpc: ['wss://rpc.polkadot.io'],
        apiUrl: 'https://polkadot.api.subscan.io/',
    },
    [Coins.KSM]: {
        derivations: [
            {
                name: DerivationName.KSM,
                path: "m/44'/434'/ACCOUNT'/0'/0'",
                protocol: Protocol.LEGACY,
            },
        ],
        bip44: CoinIds.KSM,
        curve: Curve.ED25519,
        network: networks[Coins.KSM],
        rpc: ['wss://kusama-rpc.polkadot.io'],
        apiUrl: 'https://kusama.api.subscan.io/',
    },
};

export default config;
