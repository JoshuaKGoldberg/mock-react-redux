import type { MapDispatchToProps, MapStateToProps } from "react-redux";

import mapValues from "lodash.mapvalues";
import * as React from "react";

type AnyAction = (payload: any) => void;

const defaultMergeProps = (...sources: unknown[]) =>
	Object.assign({}, ...sources);

export function mockConnect<State>(
	getDispatch: () => jest.Mock,
	getState: () => State,
) {
	return function <
		OwnProps,
		StateProps,
		DispatchProps extends Record<string, AnyAction>,
	>(
		mapStateToProps?: MapStateToProps<StateProps, OwnProps, State>,
		mapDispatchToProps?: MapDispatchToProps<DispatchProps, OwnProps>,
		mergeProps = defaultMergeProps,
	) {
		const createStateProps = (ownProps: OwnProps) =>
			mapStateToProps?.(getState(), ownProps) ?? {};

		const createDispatchProps = (ownProps: OwnProps) => {
			if (!mapDispatchToProps) {
				return {};
			}

			const dispatch = getDispatch();

			return mapDispatchToProps instanceof Function
				? mapDispatchToProps(dispatch, ownProps)
				: mapValues(
						mapDispatchToProps,
						(action): AnyAction =>
							(payload) =>
								dispatch(action(payload)),
				  );
		};

		return function mockConnectComponent(Component: React.ComponentType<any>) {
			return function MockConnectedComponent(ownProps: OwnProps) {
				return (
					<Component
						{...mergeProps(
							createStateProps(ownProps),
							createDispatchProps(ownProps),
							ownProps,
						)}
					/>
				);
			};
		};
	};
}
