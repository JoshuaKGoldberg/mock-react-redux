<h1 align="center">🎭 mock-react-redux</h1>

<p align="center">Mocks out Redux actions and selectors for clean React Jest tests. 🎭</p>

<p align="center">
	<a href="#contributors" target="_blank">
<!-- prettier-ignore-start -->
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
<img alt="All Contributors: 3" src="https://img.shields.io/badge/all_contributors-3-21bb42.svg" />
<!-- ALL-CONTRIBUTORS-BADGE:END -->
<!-- prettier-ignore-end -->
	</a>
	<a href="https://codecov.io/gh/JoshuaKGoldberg/mock-react-redux" target="_blank">
		<img alt="Codecov Test Coverage" src="https://codecov.io/gh/JoshuaKGoldberg/mock-react-redux/branch/main/graph/badge.svg"/>
	</a>
	<a href="https://github.com/JoshuaKGoldberg/mock-react-redux/blob/main/.github/CODE_OF_CONDUCT.md" target="_blank">
		<img alt="Contributor Covenant" src="https://img.shields.io/badge/code_of_conduct-enforced-21bb42" />
	</a>
	<a href="https://github.com/JoshuaKGoldberg/mock-react-redux/blob/main/LICENSE.md" target="_blank">
		<img alt="License: MIT" src="https://img.shields.io/github/license/JoshuaKGoldberg/mock-react-redux?color=21bb42">
	</a>
	<img alt="Style: Prettier" src="https://img.shields.io/badge/style-prettier-21bb42.svg" />
	<img alt="TypeScript: Strict" src="https://img.shields.io/badge/typescript-strict-21bb42.svg" />
</p>

Mocks out Redux actions and selectors for clean React Jest tests.

Tired of setting up, updating, and debugging through complex _Redux_ states in your _React_ tests?
Use this package if you'd like your React component tests to not take dependencies on your full Redux store.

> See [FAQs](./docs/FAQs.md) for more backing information. 📚

## Usage

```js
import { mockReactRedux } from "mock-react-redux";

mockReactRedux();
```

`mock-react-redux` stubs out [`connect`](https://react-redux.js.org/api/connect) and the [two common Redux hooks](https://react-redux.js.org/api/hooks) used with React components.
Call `mockReactRedux()` before your render/mount logic in each test.

### Mocking State

```tsx
mockReactRedux().state({
	title: "Hooray!",
});
```

Sets a root state to be passed to your component's selectors.

```tsx
it("displays the title when there is a title", () => {
	mockReactRedux().state({
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
mockReactRedux()
	.give(valueSelector, "Hooray!")
	.giveMock(fancySelector, jest.fn().mockReturnValueOnce("Just the once."));
```

Provide results to the [`useSelector`](https://react-redux.js.org/api/hooks#useselector) function for individual selectors passed to it.
These work similarly to Jest mocks: `.give` takes in the return value that will always be passed to the selector.

```tsx
it("displays the title when there is a title", () => {
	mockReactRedux().give(selectTitle, "Hooray!");

	// state => state.title
	const view = render(<RendersTitle />);

	view.getByText("Hooray!");
});
```

If you'd like more control over the return values, you can use `.giveMock` to provide a [Jest mock](https://jestjs.io/docs/en/mock-functions.html).

See [Selectors](./docs/Selectors.md) for more documentation or [Heading](./docs/examples/Heading.test.tsx) for a code example.

### Dispatch Spies

```tsx
const { dispatch } = mockReactRedux();
```

The `dispatch` function returned by [`useDispatch`](https://react-redux.js.org/api/hooks#usedispatch) will be replaced by a `jest.fn()` spy.
You can then assert against it as with any Jest mock in your tests:

```tsx
it("dispatches the pageLoaded action when rendered", () => {
	const { dispatch } = mockReactRedux();

	// dispatch(pageLoaded())
	render(<DispatchesPageLoaded />);

	expect(dispatch).toHaveBeenCalledWith(pageLoaded());
});
```

See [Dispatches](./docs/Dispatches.md) for more documentation or [Clicker](./docs/examples/Clicker.test.tsx) for a code example.

## Gotchas

- The first `mock-react-redux` import _must_ come before the first `react-redux` import in your test files.
- `.give` and `.giveMock` will only apply when selectors are passed directly to `useSelector` (e.g. `useSelector(selectValue)`).
  - See [FAQs](./docs/FAQs.md#help-my-give-selectors-arent-getting-mocked) for more tips and tricks.
- Thunks often create new functions per dispatch that make `toBeCalledWith`-style checks difficult.
  See [the Thunks docs](./docs/Thunks.md) for details.

### Hybrid Usage

You don't have to use `mock-react-redux` in _every_ test file in your repository.
Only the test files that import `mock-react-redux` will have `react-redux` stubbed out.

### TypeScript Usage

`mock-react-redux` is written in TypeScript and generally type safe.

- `mockReactRedux()` has an optional `<State>` type which sets the type of the root state passed to `.state`.
- `.give` return values must match the return types of their selectors.
- `.giveMock` mocks must match the return types of their selectors.

## Development

See [`.github/CONTRIBUTING.md`](./.github/CONTRIBUTING.md), then [`.github/DEVELOPMENT.md`](./.github/DEVELOPMENT.md).
Thanks! 💖

## Contributors

<!-- spellchecker: disable -->
<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/jenesh"><img src="https://avatars.githubusercontent.com/u/47792836?v=4?s=100" width="100px;" alt="Jenesh Napit"/><br /><sub><b>Jenesh Napit</b></sub></a><br /><a href="https://github.com/JoshuaKGoldberg/mock-react-redux/commits?author=jenesh" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://www.joshuakgoldberg.com/"><img src="https://avatars.githubusercontent.com/u/3335181?v=4?s=100" width="100px;" alt="Josh Goldberg ✨"/><br /><sub><b>Josh Goldberg ✨</b></sub></a><br /><a href="https://github.com/JoshuaKGoldberg/mock-react-redux/commits?author=JoshuaKGoldberg" title="Code">💻</a> <a href="#maintenance-JoshuaKGoldberg" title="Maintenance">🚧</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://gitter.im/"><img src="https://avatars.githubusercontent.com/u/8518239?v=4?s=100" width="100px;" alt="The Gitter Badger"/><br /><sub><b>The Gitter Badger</b></sub></a><br /><a href="https://github.com/JoshuaKGoldberg/mock-react-redux/commits?author=gitter-badger" title="Code">💻</a></td>
    </tr>
  </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->
<!-- spellchecker: enable -->

> 💙 This package is based on [@JoshuaKGoldberg](https://github.com/JoshuaKGoldberg)'s [create-typescript-app](https://github.com/JoshuaKGoldberg/create-typescript-app).
