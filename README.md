# 🎭 mock-redux

> 🚧 This repository is still under evaluation!
> We're not sure yet whether this is the approach we want to take.
> If you have opinions, let us know!

[![Code Style: Prettier](https://img.shields.io/badge/code_style-prettier-brightgreen.svg)](https://prettier.io)
![TypeScript: Strict](https://img.shields.io/badge/typescript-strict-brightgreen.svg)
[![NPM version](https://badge.fury.io/js/mock-redux.svg)](http://badge.fury.io/js/mock-redux)
[![Circle CI](https://img.shields.io/circleci/build/github/Codecademy/mock-redux.svg)](https://circleci.com/gh/Codecademy/mock-redux)
[![Join the chat at https://gitter.im/Codecademy/mock-redux](https://badges.gitter.im/Codecademy/mock-redux.svg)](https://gitter.im/Codecademy/mock-redux?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

Mocks out Redux actions and selectors for clean React Jest tests.

Tired of setting up, updating, and debugging through complex _Redux_ states in your _React_ tests?
Use this package if you'd like your React component tests to not take dependencies on your full Redux store.

> See [FAQs](./docs/FAQs.md) for more backing information. 📚

## Usage

```js
import { mockRedux } from "mock-redux";
```

`mock-redux` stubs out [`connect`](https://react-redux.js.org/api/connect) and the [two common Redux hooks](https://react-redux.js.org/api/hooks) used with React components.
Call `mockRedux()` before your render/mount logic in each test.

### Mocking State

```tsx
mockRedux().state({
  title: "Hooray!",
});
```

Sets a root state to be passed to your component's selectors.

```tsx
it("displays the title when there is a title", () => {
  mockRedux().state({
    title: "Hooray!",
  });

  // state => state.title
  const view = render(<RendersTitle />);

  view.getByText("Hooray!");
});
```

See [Selectors](./docs/Selectors.md) for more documentation or [Heading](./docs/examples/Heading.test.tsx) for a code example.

### Mocking Selectors

```tsx
mockRedux()
  .give(simpleSelector, "Hooray!")
  .giveMock(fancySelector, jest.fn().mockReturnValueOnce("Just the once."));
```

Provide results to the [`useSelector`](https://react-redux.js.org/api/hooks#useselector) function for individual selectors passed to it.
These work similarly to Jest mocks: `.give` takes in the return value that will always be passed to the selector.

```tsx
it("displays the title when there is a title", () => {
  mockRedux().give(selectTitle, "Hooray!");

  // state => state.title
  const view = render(<RendersTitle />);

  view.getByText("Hooray!");
});
```

If you'd like more control over the return values, you can use `.giveMock` to provide a [Jest mock](https://jestjs.io/docs/en/mock-functions.html).

See [Selectors](./docs/Selectors.md) for more documentation or [Heading](./docs/examples/Heading.test.tsx) for a code example.

### Dispatch Spies

```tsx
const { dispatch } = mockRedux();
```

The `dispatch` function returned by [`useDispatch`](https://react-redux.js.org/api/hooks#usedispatch) will be replaced by a `jest.fn()` spy.
You can then assert against it as with any Jest mock in your tests:

```tsx
it("dispatches the pageLoaded action when rendered", () => {
  const { dispatch } = mockRedux();

  // dispatch(pageLoaded())
  render(<DispatchesPageLoaded />);

  expect(dispatch).toHaveBeenCalledWith(pageLoaded());
});
```

See [Dispatches](./docs/Dispatches.md) for more documentation or [Clicker](./docs/examples/Clicker.test.tsx) for a code example.

## Gotchas

- The first `mock-redux` import _must_ come before the first `react-redux` import in your test files.
- `.give` and `.giveMock` will only apply when selectors are passed directly to `useSelector` (e.g. `useSelector(selectValue)`).
  - For inline selectors such as `useSelector(state => selectValue(state))`, use the `.state` API to set the root state value.

### Hybrid Usage

You don't have to use `mock-redux` in _every_ test file in your repository.
Only the test files that import `mock-redux` will have Redux actions stubbed out.

### TypeScript Usage

`mock-redux` is written in TypeScript and generally type safe.

- `mockRedux()` has an optional `<State>` type which sets the type of the root state passed to `.state`.
- `.give` return values must match the return types of their selectors.
- `.giveMock` mocks must match the return types of their selectors.

_Heck yes._ 🤘

## Development

Requires:

- [Node.js](https://nodejs.org) >12
- [Yarn](https://yarnpkg.com/en)

After [forking the repo from GitHub](https://help.github.com/articles/fork-a-repo):

```
git clone https://github.com/<your-name-here>/mock-redux
cd mock-redux
yarn
```

### Contribution Guidelines

We'd love to have you contribute!
Check the [issue tracker](https://github.com/Codecademy/mock-redux/issues) for issues labeled [`accepting prs`](https://github.com/Codecademy/mock-redux/issues?utf8=%E2%9C%93&q=is%3Aissue+is%3Aopen+label%3A%22accepting+prs%22) to find bug fixes and feature requests the community can work on.
If this is your first time working with this code, the [`good first issue`](https://github.com/Codecademy/mock-redux/issues?utf8=%E2%9C%93&q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22+) label indicates good introductory issues.

Please note that this project is released with a [Contributor Covenant](https://www.contributor-covenant.org).
By participating in this project you agree to abide by its terms.
See [CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md).
