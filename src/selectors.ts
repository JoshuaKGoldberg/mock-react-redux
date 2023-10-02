import type * as jest from "jest";

import { AnySelector } from "./types.js";

export type GetSelector = <ReturnValue>(
	selector: AnySelector<ReturnValue>,
) => SelectorRecord<ReturnValue>;

export interface SelectorRecord<ReturnValue = any> {
	mock?: jest.Mock<ReturnValue>;
	provide: (...args: any[]) => ReturnValue;
	selector: AnySelector<ReturnValue>;
	setMock: (mock: jest.Mock<ReturnValue>) => void;
}

export const createGetSelector = (getState: () => any): GetSelector => {
	const selectors = new Map<AnySelector, SelectorRecord>();

	return <ReturnValue>(selector: AnySelector<ReturnValue>) => {
		const existing = selectors.get(selector);
		if (existing) {
			return existing;
		}

		const record: SelectorRecord<ReturnValue> = {
			provide: (...args) => {
				if (record.mock) {
					return record.mock(...args);
				}

				const state = getState();
				if (state) {
					return selector(state);
				}

				throw new Error(
					`No Redux state or mock defined for '${selector.name || selector}'`,
				);
			},

			selector,

			setMock: (mock) => {
				if (record.mock) {
					throw new Error(
						`Attempted to provide a second mock for '${
							selector.name || selector
						}'.`,
					);
				}

				record.mock = mock;
			},
		};

		selectors.set(selector, record);

		return record;
	};
};
