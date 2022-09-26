# [type-challenges/integers-comparator](https://github.com/type-challenges/type-challenges/blob/main/questions/00274-extreme-integers-comparator/README.md)

1. 받은 숫자 크기의 튜플을 각각 만든 다음에 비교하려고 시도했으나 일정 횟수 이상의 재귀가 발생하면 오류가 나서 실패하는것 같음<br/>
   추가로 단순 튜플 길이로 비교하기엔 음수도 비교대상에 포함되기 때문에 양수 케이스, 음수 케이스 따로 구현 해야할것 같음

```typescript
type Tuple<Length extends number, T extends any[] = []> = 
    T extends { length : Length } ? T : Tuple<Length, [...T, any]>;

type GreaterThan<A extends number, B extends number> =
    Tuple<A> extends [...Tuple<B>, ...infer R] ? true : false;
```

2. 어떻게 재귀횟수를 줄일까 생각하다가 자릿수 분리해서 23이면 2, 3 따로따로 큰 자릿수부터 비교하도록 구현함<br/>
   또 숫자 비교할때 튜플을 하나만 사용해서 length 비교하도록 구현

```typescript
// 자릿수 비교
type DigitCompare<A extends string, B extends string> =
    A extends `${infer AF}${infer AR}` ?
        B extends `${infer BF}${infer BR}` ?
            SingleDigitCompare<AF, BF> extends Comparison.Equal ?
                DigitCompare<AR, BR> 
                : SingleDigitCompare<AF, BF>
        : Comparison.Greater
    : B extends `${infer BF}${infer BR}` ?
        Comparison.Lower 
        : SingleDigitCompare<A, B>;


type SingleDigitCompare<A extends string, B extends string, Arr extends { length : number }[] = []> =
    A extends `${Arr['length']}` ?
        B extends `${Arr['length']}` ?
            Comparison.Equal
            : Comparison.Lower
        : B extends `${Arr['length']}` ?
            Comparison.Greater
            : PositiveSingleDigitCompare<A, B, [...Arr, any]>;
```

3. 위에서 생각한대로 음수 케이스, 양수 케이스 따로 비교하도록 구현
```typescript
type Abs<N extends number> = `${N}` extends `-${infer F}` ? `${F}` : `${N}`;
type isNegative<N extends number> = `${N}` extends `-${infer F}` ? true : false;

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
```
