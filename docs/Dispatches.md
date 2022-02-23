# Dispatches

## Typical Setups

[React function components](https://reactjs.org/docs/components-and-props.html) may dispatch Redux actions using `react-redux`'s [`useDispatch` hook](https://react-redux.js.org/api/hooks#usedispatch).
Consider this Redux state shape containing a `clicked` of type `boolean`:

```tsx
const initialState = {
  interactions: {
    clicked: false,
  },
};
```

Your state code might declare a `markClicked` [action](https://redux.js.org/basics/actions):

```tsx
const MARK_CLICKED = "MARK_CLICKED";

const markClicked = () => ({ type: MARK_CLICKED });
```

...and some kind of [reducer](https://redux.js.org/basics/actions) to set `clicked` to `true` upon the `markClicked` action:

```tsx
switch (action.type) {
  case MARK_CLICKED:
    return {
      ...state,
      interactions: {
        ...state.interactions,
        clicked: true,
      },
    };
}
```

Your view code might dispatch an action to set `clicked` to `true`:

```tsx
const Clicker = () => {
  const dispatch = useDispatch();

  return (
    <button onClick={() => dispatch(markClicked())} type="button">
      Click me!
    </button>
  );
};
```

## View Testing

You _could_ set up Redux state with a full state tree:

```tsx
const store = configureStore()({
  interactions: {
    clicked: false,
  },
});

const view = render(
  <Provider store={store}>
    <Clicker />
  </Provider>,
);

act(() => {
  fireEvent.click(view.getByRole("button"));
});

expect(store.actions()).toEqual([markClicked()]);
```

So much work!
That testing setup's complexity and resultant pain can easily grow with your application.
You're also relying a bunch of Redux state in order to test your React view.
It can be useful to separate view and state logic in tests: especially when state is shared across many places.

Instead, `mock-react-redux` can _completely replace_ any Redux interactions.
It'll instead swap out the `dispatch` function with a [Jest mock](https://jestjs.io/docs/en/mock-functions.html):

```tsx
const { dispatch } = mockReactRedux();

const view = render(<Clicker />);

act(() => {
  fireEvent.click(view.getByRole("button"));
});

expect(dispatch).toHaveBeenCalledWith(markClicked());
```

Much cleaner!

## `dispatch`

The `dispatch` returned to your views is directly the result of calling [`jest.fn()`](https://jestjs.io/docs/en/mock-functions.html).
It'll receive any actions passed to it as normal function parameters.

If you'd like to execute some logic when actions are dispatched, you can use Jest's built-in logic for [mock implementations](https://jestjs.io/docs/en/mock-functions.html#mock-implementations):

```tsx
dispatch.mockImplementation((action) => {
  console.log("Received", action);
});
```

## Examples

- [Clicker](./examples/Clicker.test.tsx): Tests for the `Clicker` component above
- [Tracking](./examples/Tracking.test.tsx): Component tests that exercise both dispatch and selector logic
