import type * as jest from "jest";

import { render } from "@testing-library/react";
import React, { useEffect } from "react";
import { act } from "react-dom/test-utils";
import { connect } from "react-redux";

import { mockReactRedux } from "./index.js";

const value = "Hi!";
const payload = { value };
const action = (payload: unknown) => ({ payload, type: "ACTION" });

type WithAction = { action: typeof action };
type WithValue = { value: string };

describe("connect", () => {
	it("passes through to the component when there are no mappings", async () => {
		const ConnectedRendersValue = connect()((props: { text: string }) => (
			<>{props.text}</>
		));

		mockReactRedux();

		const view = render(<ConnectedRendersValue text={value} />);

		view.getByText(value);
	});

	describe("mapStateToProps", () => {
		const RendersValue = ({ value }: WithValue) => {
			return <>{value}</>;
		};

		const selectValue = (state: WithValue) => state.value;
		const mapStateToProps = (state: WithValue) => ({
			value: selectValue(state),
		});

		it("throws an error when a connected component is rendered calling mockReactRedux()", () => {
			const ConnectedRendersValue = connect(mapStateToProps)(RendersValue);

			expect(() => ConnectedRendersValue({})).toThrow(
				"You imported mock-react-redux but didn't call mockReactRedux() before rendering a connect() component.",
			);
		});

		it("throws an error when a connected component is rendered without a mock state", () => {
			const ConnectedRendersValue = connect(mapStateToProps)(RendersValue);

			mockReactRedux();

			expect(() => ConnectedRendersValue({})).toThrow(
				"You imported mock-react-redux but didn't set state before rendering a connect() component.",
			);
		});

		it("provides a selector value when mapStateToProps calls a selector", async () => {
			const ConnectedRendersValue = connect(mapStateToProps)(RendersValue);

			mockReactRedux().state({ value });

			const view = render(<ConnectedRendersValue />);

			view.getByText(value);
		});
	});

	describe("mapDispatchToProps", () => {
		const FiresAction = ({ action }: WithAction) => {
			useEffect(() => {
				action(payload);
			}, []);
			return null;
		};

		it("throws an error when a connected component is rendered without having called mockReactRedux", () => {
			const ConnectedFiresAction = connect(null, { action })(FiresAction);

			expect(() => ConnectedFiresAction({})).toThrow(
				"You imported mock-react-redux but didn't call mockReactRedux() before calling useDispatch from react-redux.",
			);
		});

		it("mocks an action dispatch when mapDispatchToProps is used in the object form", async () => {
			const ConnectedFiresAction = connect(null, { action })(FiresAction);
			const { dispatch } = mockReactRedux();

			act(() => {
				render(<ConnectedFiresAction />);
			});

			expect(dispatch).toHaveBeenCalledWith(action(payload));
		});

		it("mocks an action dispatch when mapDispatchToProps is used in the function form", async () => {
			const ConnectedFiresAction = connect(null, (dispatch) => ({
				action: () => dispatch(action(payload)),
			}))(FiresAction);
			const { dispatch } = mockReactRedux();

			act(() => {
				render(<ConnectedFiresAction />);
			});

			expect(dispatch).toHaveBeenCalledWith(action(payload));
		});
	});

	describe("mergeProps", () => {
		type TracksPropsProps = Record<string, unknown> & {
			spy: jest.Mock;
		};

		const TracksProps = (props: TracksPropsProps) => {
			useEffect(() => {
				props.spy(props);
			}, []);
			return null;
		};

		const fromState = { from: "state" };
		const fromDispatch = { from: "dispatch" };

		const mapStateToProps = () => ({ fromState });
		const mapDispatchToProps = { fromDispatch };

		it("defaults to a basic merge when not provided", () => {
			const spy = jest.fn();
			const ConnectedTracksProps = connect(
				mapStateToProps,
				mapDispatchToProps,
			)(TracksProps);

			mockReactRedux().state({});

			act(() => {
				render(<ConnectedTracksProps spy={spy} />);
			});

			expect(spy).toHaveBeenCalledWith({
				fromDispatch: expect.any(Function),
				fromState,
				spy,
			});
		});

		it("is used when provided", () => {
			const spy = jest.fn();
			const ConnectedTracksProps = connect(
				mapStateToProps,
				mapDispatchToProps,
				(stateProps, dispatchProps, ownProps) => ({
					dispatchProps,
					stateProps,
					...ownProps,
				}),
			)(TracksProps);

			mockReactRedux().state({});

			act(() => {
				render(<ConnectedTracksProps spy={spy} />);
			});

			expect(spy).toHaveBeenCalledWith({
				dispatchProps: { fromDispatch: expect.any(Function) },
				spy,
				stateProps: { fromState },
			});
		});
	});
});
