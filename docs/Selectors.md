# Selectors

## Typical Setups

[React function components](https://reactjs.org/docs/components-and-props.html) may read from Redux state using `react-redux`'s [`useSelector` hook](https://react-redux.js.org/api/hooks#useselector).
Consider this simple Redux state shape containing a `title` of type `string`:

```tsx
const initialState = {
  title: "",
};
```

Your state code might declare a `selectTitle` selector to retrieve that title:

```tsx
const selectTitle = (state) => state.title;
```

Your view code might use that selector to render the title:

```tsx
const Heading = () => {
  const title = useSelector(selectTitle);

  return <h1>{title}</h1>;
};
```

## View Testing

You _could_ set up Redux state with a full state tree:

```tsx
const testState = {
  title: "Test Title",
};

// Renders <h1>Test Title</h1>
<Provider store={configureStore()(testState)}>
  <Heading />
</Provider>;
```

So much work!
That testing setup's complexity and resultant pain can easily grow with your application.
You're also relying a bunch of Redux state in order to test your React view.
It can be useful to separate view and state logic in tests: especially when state is shared across many places.

Instead, `mock-react-redux` can _simplify_ or even _replace_ any Redux interactions.
You have two options:

- Providing a mocked Redux state for your test
- Directly using predefined return values or mock functions for individual selectors

## Mocking State

You can set mock Redux state for the duration of a test.
That state will be provided to selectors called by `useSelector`.

```tsx
mockReactRedux().state({
  title: "Test Title",
});

// Renders <h1>Test Title</h1>
<Heading />;
```

`.state` takes in a single parameter and can only be called once per test:

- `state`: A value to use as the root Redux state for the duration of the test

## Mocking Selectors

### `give`

If your component only uses `useSelector` and directly passes predefined selector functions to it,
you can completely remove its dependency on Redux state with `.give`.
It takes two parameters:

- `selector`: Selector function to mock out return values for
- `returnValue`: Value to return whenever the selector is provided to `useSelector`

The `returnValue` will be directly returned when `useSelector` is called from that `selector`:

```tsx
mockReactRedux().give(selectTitle, "Test Title");

// Renders <h1>Test Title</h1>
<Heading />;
```

### `giveMock`

If you'd like more control over the return values, use `.giveMock` to provide a [Jest mock](https://jestjs.io/docs/en/mock-functions.html).
It takes two parameters:

- `selector`: Selector function to mock out return values for
- `mock`: Jest mock function to call in place of the selector

For example, you might want the selector to return a different value than the first on subsequent calls:

```tsx
mockReactRedux().giveMock(
  selectTitle,
  jest
    .fn()
    .mockReturnValueOnce("First!")
    .mockReturnValueOnce("Second.")
    .mockReturnValue("Other times..."),
);
```

See [Jest's mock functions](https://jestjs.io/docs/en/mock-functions.html) for full documentation.

> See [FAQs](./FAQs.md) for help choosing between these strategies and pracices for mocking selectors.

## Examples

- [Heading](./examples/Heading.test.tsx): Tests for the `Heading` component above
- [Tracking](./examples/Tracking.test.tsx): Component tests that exercise both dispatch and selector logic
