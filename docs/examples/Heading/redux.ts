export type RootState = {
  title: string;
};

export const selectTitle = (state: RootState) => state.title;
