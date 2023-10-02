import { render, fireEvent } from "@testing-library/react";
import { mockReactRedux } from "mock-react-redux";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";

type RootState = {
	clicks: number;
};

const MARK_CLICKED = "MARK_CLICKED";

const markClicked = () => ({ type: MARK_CLICKED });

const selectClicks = (state: RootState) => state.clicks;

const Tracking = () => {
	const clicks = useSelector(selectClicks);
	const dispatch = useDispatch();

	return (
		<button onClick={() => dispatch(markClicked())} type="button">
			This button has been clicked {clicks} time{clicks === 1 ? "" : "s"}.
		</button>
	);
};

describe(Tracking, () => {
	it("renders a singular message when it has been clicked 1 time", () => {
		mockReactRedux().give(selectClicks, 1);

		const view = render(<Tracking />);

		view.getByText("This button has been clicked 1 time.");
	});

	it("renders a plural message when it has been clicked 2 times", () => {
		mockReactRedux().state({ clicks: 2 });

		const view = render(<Tracking />);

		view.getByText("This button has been clicked 2 times.");
	});

	it("dispatches the markClicked event when clicked", () => {
		const { dispatch } = mockReactRedux().give(selectClicks, 1);

		const view = render(<Tracking />);

		fireEvent.click(view.getByRole("button"));

		expect(dispatch).toHaveBeenCalledWith(markClicked());
	});
});
