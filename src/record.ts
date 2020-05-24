import { AnySelector } from "./types";

export type SelectorRecord<ReturnValue = any> = {
  mock?: jest.Mock<ReturnValue>;
  provide: (...args: any[]) => ReturnValue;
  selector: AnySelector<ReturnValue>;
  setMock: (mock: jest.Mock<ReturnValue>) => void;
};

export const createSelectorRecord = <ReturnValue>(selector: AnySelector<ReturnValue>) => {
  const record: SelectorRecord<ReturnValue> = {
    provide: (...args) => {
      if (!record.mock) {
        throw new Error(`No mock defined for '${record.selector.name || selector}'`);
      }

      return record.mock(...args);
    },

    selector,

    setMock: (mock) => {
      if (record.mock) {
        throw new Error(`Attempted to provide a second mock for '${selector.name || selector}'.`);
      }

      record.mock = mock;
    },
  };

  return record;
};
