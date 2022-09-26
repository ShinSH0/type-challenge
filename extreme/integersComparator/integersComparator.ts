/*
  274 - Integers Comparator
  -------
  by Pig Fang (@g-plane) #extreme #template-literal #math
  
  ### Question
  
  Implement a type-level integers comparator. We've provided an enum for indicating the comparison result, like this:
  
  - If `a` is greater than `b`, type should be `Comparison.Greater`.
  - If `a` and `b` are equal, type should be `Comparison.Equal`.
  - If `a` is lower than `b`, type should be `Comparison.Lower`.
  
  **Note that `a` and `b` can be positive integers or negative integers or zero, even one is positive while another one is negative.**
  
  > View on GitHub: https://tsch.js.org/274
*/


/* _____________ Your Code Here _____________ */

enum Comparison {
    Greater,
    Equal,
    Lower,
}

type Abs<N extends number> = `${N}` extends `-${infer F}` ? `${F}` : `${N}`;
type isNegative<N extends number> = `${N}` extends `-${infer F}` ? true : false;

type PositiveSingleDigitCompare<A extends string, B extends string, Arr extends { length : number }[] = []> =
        A extends `${Arr['length']}` ?
            B extends `${Arr['length']}` ?
                Comparison.Equal
                : Comparison.Lower
            : B extends `${Arr['length']}` ?
                Comparison.Greater
                : PositiveSingleDigitCompare<A, B, [...Arr, any]>;

type PositiveDigitCompare<A extends string, B extends string> =
        A extends `${infer AF}${infer AR}` ?
            B extends `${infer BF}${infer BR}` ?
                PositiveSingleDigitCompare<AF, BF> extends Comparison.Equal ?
                    PositiveDigitCompare<AR, BR> 
                    : PositiveSingleDigitCompare<AF, BF>
            : Comparison.Greater
        : B extends `${infer BF}${infer BR}` ?
            Comparison.Lower 
            : PositiveSingleDigitCompare<A, B>;

type NegativeSingleDigitCompare<A extends string, B extends string, Arr extends { length : number }[] = []> =
            A extends `${Arr['length']}` ?
                B extends `${Arr['length']}` ?
                    Comparison.Equal
                    : Comparison.Greater
                : B extends `${Arr['length']}` ?
                    Comparison.Lower
                    : NegativeSingleDigitCompare<A, B, [...Arr, any]>;

type NegativeDigitCompare<A extends string, B extends string> =
        A extends `${infer AF}${infer AR}` ?
            B extends `${infer BF}${infer BR}` ?
                NegativeSingleDigitCompare<AF, BF> extends Comparison.Equal ?
                    NegativeDigitCompare<AR, BR> 
                    : NegativeSingleDigitCompare<AF, BF>
            : Comparison.Lower
        : B extends `${infer BF}${infer BR}` ?
            Comparison.Greater 
            : NegativeSingleDigitCompare<A, B>;

type Comparator<A extends number, B extends number> = 
    A extends B ? 
        Comparison.Equal :
        isNegative<A> extends true ?
            isNegative<B> extends true ?
                NegativeDigitCompare<Abs<A>, Abs<B>> // - -
            : Comparison.Lower // - +
        : isNegative<B> extends true ?
            Comparison.Greater // + -
            : PositiveDigitCompare<`${A}`, `${B}`> // + +
        


/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
    Expect<Equal<Comparator<5, 5>, Comparison.Equal>>,
    Expect<Equal<Comparator<5, 6>, Comparison.Lower>>,
    Expect<Equal<Comparator<5, 8>, Comparison.Lower>>,
    Expect<Equal<Comparator<5, 0>, Comparison.Greater>>,
    Expect<Equal<Comparator<-5, 0>, Comparison.Lower>>,
    Expect<Equal<Comparator<0, 0>, Comparison.Equal>>,
    Expect<Equal<Comparator<0, -5>, Comparison.Greater>>,
    Expect<Equal<Comparator<5, -3>, Comparison.Greater>>,
    Expect<Equal<Comparator<5, -7>, Comparison.Greater>>,
    Expect<Equal<Comparator<-5, -7>, Comparison.Greater>>,
    Expect<Equal<Comparator<-5, -3>, Comparison.Lower>>,
    Expect<Equal<Comparator<-25, -30>, Comparison.Greater>>,
    Expect<Equal<Comparator<15, -23>, Comparison.Greater>>,
    Expect<Equal<Comparator<40, 37>, Comparison.Greater>>,
    Expect<Equal<Comparator<-36, 36>, Comparison.Lower>>,
    Expect<Equal<Comparator<27, 27>, Comparison.Equal>>,
    Expect<Equal<Comparator<-38, -38>, Comparison.Equal>>,
]

type t = Comparator<4555555555, 4555555556>;



/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/274/answer
  > View solutions: https://tsch.js.org/274/solutions
  > More Challenges: https://tsch.js.org
*/

