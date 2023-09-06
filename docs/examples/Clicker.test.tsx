import { render, fireEvent } from "@testing-library/react";
import { mockReactRedux } from "mock-react-redux";
import * as React from "react";
import { useDispatch } from "react-redux";

const MARK_CLICKED = "MARK_CLICKED";

const markClicked = () => ({ type: MARK_CLICKED });

const Clicker = () => {
	const dispatch = useDispatch();

	return (
		<button onClick={() => dispatch(markClicked())} type="button">
			Click me!
		</button>
	);
};

describe(Clicker, () => {
	it("dispatches the markClicked event when clicked", () => {
		const { dispatch } = mockReactRedux();

		const view = render(<Clicker />);

		fireEvent.click(view.getByRole("button"));

		expect(dispatch).toHaveBeenCalledWith(markClicked());
	});
});
