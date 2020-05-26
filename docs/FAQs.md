# Frequently Asked Questions

## Should I Use `mock-redux`?

Maybe!

`mock-redux` is excellent for separating your React and Redux logic areas.
Many applications intentionally try to independently test the two areas.
This approach is particularily effective in applications that do some or all of:

- Keep a large amount of data in their Redux state and/or share pieces of that state among multiple components
- Test Redux logic (actions, selectors, and/or reducers) in isolation from React components

## How Is `mock-redux` Different Than Other Redux Test Libraries?

Most Redux-focused testing libraries aim to set up Redux logic in unit tests for your React components to use.
[`redux-mock-store`](https://github.com/reduxjs/redux-mock-store), for example, has useful utilities around setting up a mocked version of your Redux store for unit tests.

In a sense, other libraries tend to augment or swap out _Redux_:

```
react <-----> react-redux <-----> redux
                                  |___|
                                    ^
                                    |
                              redux-mock-store
```

`mock-redux` completely swaps out the _`react-redux`_ library from your code, leaving your unit tests just testing the logic in your React components.

```
react <-----> react-redux ...
              |_________|
                   ^
                   |
              mock-redux
```

## How Does `mock-redux` Work?

[Jest module mocks](https://jestjs.io/docs/en/mock-functions#mocking-modules).
The entire `react-redux` module is replaced with `mock-redux` logic, so your React components only ever interact with stubbed versions of `connect`, `useSelector`, and `useDispatch`.

- `useSelector` is replaced by a function that:
  - Calls a predefined mock if you've defined a return value with `.give` or mock with `.giveMock` for that selector
  - Otherwise passes the state you defined for the test to that selector
- `useDispatch` returns the same mock created by a `jest.fn()` and returned as a member of `fetchMock()`
- `connect` mimicks `react-redux` but using the above mock logic

## Should I Mock State or Mock Selectors?

That's up to you.

If your application already tests its Redux state separately, or you otherwise don't want to mix your Redux logic in your React views, `.give` is a great way to separate the two.
Its only caveat is that it doesn't allow inline ("curried") selectors like `useSelector(state => selectSomeState(state, true))`.

Otherwise, if you either prefer including the shape of your Redux state in your React tests or generally cannot use `.give`, use `.state` to set up mock states per test.

## Help! My `.give` Selectors Aren't Getting Mocked!?

`mock-redux` can only mock out selectors that are _directly_ passed to `useSelector`:

```tsx
useSelector(selectValue);
```

If you pass anything else, such as a function wrapping around a selector...

```tsx
useSelector((state) => selectValueByKey(state, "someKey"));
```

...then `mock-redux` won't be able to mock out the call to `selectValue`, and the original function will get used.

You have few couple options for dealing with this situation:

- Figure out a way to move whatever logic generated the selector into Redux, so you can directly pass a selector into it
  - Example:
  ```tsx
  const someValue = useSelector(selectValueUnderSomeKey);
  ```
  - Protip: [`reselect`](https://github.com/reduxjs/reselect) can help you compose selectors
- Figure out a way to move the extra logic in the component to outside the selector call, so you can pass the selector directly to `useSelector` and perform logic on it after
  - Example:
    ```tsx
    const values = useSelector(selectValues);
    const someValue = values.someKey;
    ```
- Use `mock-redux`'s `.state` API to pass a custom state to your selector
