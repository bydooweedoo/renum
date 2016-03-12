/**
 * Converting any given types into a single frozen object `Enum`.
 */
declare module renum {

    /**
     * The predicate pure function is used to check given value type.
     * If type matches (`Predicate` returns true),
     * then it will call the associated `Format` with the same value.
     *
     *      const predicate = value => value instanceof Error;
     *
     * Note: For keyed/valued pair or complex type, the complete entry is passed
     * to the `Predicate`.
     */
    export type Predicate = (value: any) => boolean;

    /**
     * The format pure function is used to convert given value to any type that
     * fit `Enum` input or to directly `Enum` output (frozen object).
     *
     *      const format = error => ({[error.name]: error.message});
     *
     * Note (1): For keyed/valued pair or complex type, the complete entry is passed
     * to the `Format`.
     * Note (2): Concerning multiple input values like `Array` of a `class`, you can either return
     * an `Object`, `Map`, `Set`, or even an `Array` of `Pair`. Because `renum` will call the
     * low priority conditions (default ones) with the output of high priority ones.
     */
    export type Format = (value: any) => any;

    /**
     * Frozen object returned by `renum`.
     */
    export interface Enum <key, value> {
        key: string;
        value: any;
    }

    /**
     * Javascript ES6 `Map`.
     */
    interface Map <key, value> {
        key: any;
        value: any;
    }

    /**
     * Javascript ES6 `Set`.
     */
    interface Set <key, value> {
        key: any;
        value: any;
    }

    /**
     * A tuple of key value of any type.
     * The key will be converted to `string` in order to match
     * `Enum` key, but the value will remain of the same type (reference might change).
     */
    export type Pair = [any, any];

    /**
     * A tuple of `Predicate` and `Format`.
     * An `Array` of `Condition` can be directly passed to the
     * `extend` function.
     */
    export type Condition = [Predicate, Format];

    /**
     * Extends high priority `Condition`s with given `Predicate` and `Format`.
     *
     *      import renum from 'renum';
     *
     *      const isNull = v => v === null;
     *      const alwaysEmptyObject = v => {};
     *      const updatedConditions = renum.extend(isNull, alwaysEmptyObject);
     */
    export function extend(Predicate, Format): Array<Condition>;

    /**
     * Extends high priority `Condition`s with given `Array` of `Condition`s.
     *
     *      import R from 'ramda';
     *      import renum from 'renum';
     *      import Immutable from 'immutable';
     *
     *      const listOfConditions = [
     *          [Immutable.Map.isMap, R.invoker(0, 'toObject')],
     *          [Immutable.Stack.isStack, R.invoker(0, 'toJS')],
     *          [Immutable.List.isList, R.invoker(0, 'toArray')],
     *      ];
     *      const updatedConditions = renum.extend(listOfConditions);
     */
    export function extend(conditions: Array<Condition>): Array<Condition>;

    export default function(): Enum<string, any>;
    export default function(value: any): Enum<string, any>;
    export default function(...values: Array<any>) : Enum<string, any>;
    export default function(value: Enum<string, any>): Enum<string, any>;
    export default function(...values: Array<Enum<string, any>>): Enum<string, any>;
    export default function(value: Pair): Enum<string, any>;
    export default function(...values: Array<Pair>): Enum<string, any>;
    export default function(value: string): Enum<string, string>;
    export default function(value: number): Enum<string, number>;
    export default function(value: boolean): Enum<string, boolean>;
    export default function(value: symbol): Enum<string, symbol>;
    export default function(value: Map<any, any>): Enum<string, any>;
    export default function(value: Set<any, any>): Enum<string, any>;
}
