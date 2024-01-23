export = BaseCurve;
declare function BaseCurve(type: any, conf: any): void;
declare class BaseCurve {
    constructor(type: any, conf: any);
    type: any;
    p: any;
    red: any;
    zero: any;
    one: any;
    two: any;
    n: any;
    g: any;
    _wnafT1: any[];
    _wnafT2: any[];
    _wnafT3: any[];
    _wnafT4: any[];
    _bitLength: any;
    redN: any;
    _maxwellTrick: boolean | undefined;
    point(): never;
    validate(): never;
    _fixedNafMul(p: any, k: any): any;
    _wnafMul(p: any, k: any): any;
    _wnafMulAdd(defW: any, points: any, coeffs: any, len: any, jacobianResult: any): any;
    decodePoint(bytes: any, enc: any): any;
}
declare namespace BaseCurve {
    export { BasePoint };
}
declare function BasePoint(curve: any, type: any): void;
declare class BasePoint {
    constructor(curve: any, type: any);
    curve: any;
    type: any;
    precomputed: {
        doubles: null;
        naf: null;
        beta: null;
    } | null;
    eq(): never;
    validate(): any;
    encodeCompressed(enc: any): any;
    _encode(compact: any): number[];
    encode(enc: any, compact: any): any;
    precompute(power: any): this;
    _hasDoubles(k: any): boolean;
    _getDoubles(step: any, power: any): {
        step: any;
        points: this[];
    };
    _getNAFPoints(wnd: any): {
        wnd: any;
        points: this[];
    };
    _getBeta(): null;
    dblp(k: any): this;
}
