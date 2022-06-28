/*
  4182 - Fibonacci Sequence
  -------
  by windliang (@wind-liang) #medium 
  
  ### Question
  
  Implement a generic Fibonacci\<T\> takes an number T and returns it's corresponding [Fibonacci number](https://en.wikipedia.org/wiki/Fibonacci_number).
  
  The sequence starts:
  1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, ...
  
  For example
  ```ts
  type Result1 = Fibonacci<3> // 2
  type Result2 = Fibonacci<8> // 21
  ```
  
  > View on GitHub: https://tsch.js.org/4182
*/


/* _____________ Your Code Here _____________ */

type Fibonacci<T extends number, Store extends number[] = [0, 1]> =
            T extends 1 | 2 ? 
                    1 : 
                    Store extends { length : infer Length } ?
                            Length extends T ? 
                                    Store extends [...infer R, infer Last] ?
                                            Last :
                                            never
                                    :
                                    Length extends number ?
                                            Fibonacci<T, [...Store, Add< Store[ Minus<Length, 1> ], Store[ Minus<Length, 2> ] > ]> :
                                            never
                            :
                            never;


type Tuple<Length extends number, T extends any[] = []> = 
            T extends { length : Length } ? 
                    T : 
                    Tuple<Length, [...T, any]>;

type Add<L extends number, R extends number> = 
            [...Tuple<L>, ...Tuple<R>] extends { length : infer Length } ? 
                    Length : 
                    never;

type Minus<L extends number, R extends number> = 
            Tuple<L> extends [...infer U, ...Tuple<R>] ? 
                    U extends { length : infer Length } ? 
                            Length : 
                            never 
                    : never;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Fibonacci<3>, 2>>,
  Expect<Equal<Fibonacci<8>, 21>>,
]


/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/4182/answer
  > View solutions: https://tsch.js.org/4182/solutions
  > More Challenges: https://tsch.js.org
*/

