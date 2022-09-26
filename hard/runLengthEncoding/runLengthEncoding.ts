/*
  14188 - Run-length encoding
  -------
  by Hen Hedymdeith (@alfaproxima) #hard 
  
  ### Question
  
  Given a `string` sequence of a letters f.e. `AAABCCXXXXXXY`. Return run-length encoded string `3AB2C6XY`.
  Also make a decoder for that string.
  
  > View on GitHub: https://tsch.js.org/14188
*/


/* _____________ Your Code Here _____________ */

namespace RLE {
    export type Encode<S extends string> = _Encode<`${S} `>
    export type Decode<S extends string> = _Decode<`${S} `>
}

type _Encode<S extends string, Arr extends string[] = [], Result extends string[] = []> = 
    S extends `${infer F}${infer N}${infer R}` ?
        F extends N ? 
            _Encode<`${N}${R}`, [F, ...Arr], Result>
            : Arr extends [] ? 
                _Encode<`${N}${R}`, [], [...Result, F]>
                : _Encode<`${N}${R}`, [], [...Result, `${[...Arr, F]['length']}${F}`]> // *
        : S extends ' ' ? Join<Result>: never;

type _Decode<S extends string, Temp extends string = '', Result extends any[] = []> = 
    S extends `${infer F}${infer N}${infer R}` ?
        IsNumber<F> extends true ?
            IsNumber<N> extends true ? 
                _Decode<`${N}${R}`, `${Temp}${F}`, Result>
                : _Decode<`${R}`, '', [...Result, Repeat<N, `${Temp}${F}`>]>
            : _Decode<`${N}${R}`, '', [...Result, Repeat<F, "1">]>
        : S extends ' ' ? Join<Result> : never;


type IsNumber<S extends string> = S extends "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" ? true : false;

type Join<T extends string[]> = T extends [infer F extends string, ...infer R extends string[]] ?
    `${F}${Join<R>}` : '';

type Repeat<S extends string, N extends string, Result extends string[] = []> = 
        `${Result['length']}` extends N ? Join<Result> : Repeat<S, N, [...Result, S]>;

type a = RLE.Encode<'AAAAAAAAAAAAAAAAAAAAAAAABCCCDDEFGHHHHH'>
type b = RLE.Decode<'15A9BXY45S'>

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
    // Raw string -> encoded string
    Expect<Equal<RLE.Encode<'AAABCCXXXXXXY'>, '3AB2C6XY'>>,

    // Encoded string -> decoded string
    Expect<Equal<RLE.Decode<'3AB2C6XY'>, 'AAABCCXXXXXXY'>>,
]



/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/14188/answer
  > View solutions: https://tsch.js.org/14188/solutions
  > More Challenges: https://tsch.js.org
*/

