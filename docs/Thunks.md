# Thunks

> Read [Dispatches](./Dispatches.md) before this page.

## Typical Setups

[Writing Logic with Thunks](https://redux.js.org/usage/writing-logic-thunks) is a common way to model complex synchronous logic or simple to moderate async logic in Redux applications.
[redux-thunk](https://github.com/reduxjs/redux-thunk) is the standard middleware for thunks.

A thunk might look something like one of these functions that each return a function:

```ts
export const makeCall = () => (dispatch, getState) => {
  /* ... */
};

export const makeCallWith = (value) => (dispatch, getState) => {
  /* ... */
};
```

[Testing dispatched actions](./Dispatches.md) on those thunks is tricky because they return a new function each time they're called.

```ts
makeCall();

expect(dispatch).toHaveBeenCalledWith(makeCall());
// Error: expect(jest.fn()).toHaveBeenCalledWith(...expected)
// Expected: [Function anonymous]
// Received: [Function anonymous]
```

## Strategy: Same Function

One solution would be to make a function that stays the same between them:

```ts
export const makeCallThunk = (dispatch, getState) => {
  /* ... */
};

export const makeCall = () => makeCallThunk;
```

```ts
dispatch(makeCall());
expect(dispatch).toHaveBeenCalledWith(makeCallThunk()); // Same function ✔
```

Note that this strategy only works for thunks that do not take in arguments.
You'll need some kind of memoization to make consistent functions between arguments.

## Strategy: Memoized Function

If you want to support parameters, you could use something like [Lodash's memoize](https://lodash.com/docs/4.17.15#memoize) to cache the function returned by the thunk creator:

```ts
import { memoize } from "lodash";

export const makeCallWith = memoize((value) => {
  return (dispatch, getState) => {
    /* ... */
  };
});
```

```ts
const value = {
  /* ... */
};

dispatch(makeCallWith(value));

expect(dispatch).toHaveBeenCalledWith(makeCallWith(value)); // Same function ✔
```

Note that Lodash by default does a strict equality check, so while the above snippet works, `makeCall({}) === makeCall({})` would result in `false` because the `{}` is different between those two calls.

## Examples

- [Thunks](./examples/Thunks.test.tsx): Tests for the `makeCall` and `makeCallWith` thunks above
