import "mock-react-redux";
import * as ReactRedux from "react-redux";

const apiNames = [
	"batch",
	"connectAdvanced",
	"createDispatchHook",
	"createSelectorHook",
	"createStoreHook",
	"Provider",
	"shallowEqual",
	"useStore",
] as const;

describe("Unsupported APIs", () => {
	describe.each(apiNames)("%s", (apiName) => {
		it("throws an error when mock-react-redux has been imported", async () => {
			expect(ReactRedux[apiName]).toThrowError(
				`${apiName} is not yet supported when using mock-react-redux. Consider filing an issue on https://github.com/Codecademy/mock-react-redux. Thanks, friend!`,
			);
		});
	});
});
