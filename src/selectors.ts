import { createSelectorRecord, SelectorRecord } from "./record";
import { AnySelector } from "./types";

export type GetSelector = <ReturnValue>(
  selector: AnySelector<ReturnValue>,
) => SelectorRecord<ReturnValue>;

export const createGetSelector = (): GetSelector => {
  const selectors = new Map<AnySelector, SelectorRecord>();

  return <ReturnValue>(selector: AnySelector<ReturnValue>) => {
    const existing = selectors.get(selector);
    if (existing) {
      return existing;
    }

    const record = createSelectorRecord<ReturnValue>(selector);

    selectors.set(selector, record);

    return record;
  };
};
