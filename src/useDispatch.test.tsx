import { render } from "@testing-library/react";
import React, { useEffect } from "react";
import { act } from "react-dom/test-utils";
import { useDispatch } from "react-redux";

import { mockReactRedux } from "./index.js";

const stubAction = { type: "test" };

const Tester = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(stubAction);
	}, [dispatch]);

	return <></>;
};

describe("useDispatch", () => {
	it("throws an error when mockReactRedux was not previously called", () => {
		expect(useDispatch).toThrow(
			`You imported mock-react-redux but didn't call mockReactRedux() before calling useDispatch from react-redux.`,
		);
	});

	it("directly passes a mocked call from the component when mockReactRedux was previously called", () => {
		const { dispatch } = mockReactRedux();

		act(() => {
			render(<Tester />);
		});

		expect(dispatch).toHaveBeenCalledWith(stubAction);
	});
});
