export type RootState = {
  clicks: number;
};

export const MARK_CLICKED = "MARK_CLICKED";

export const markClicked = () => ({ type: MARK_CLICKED });

export const selectClicks = (state: RootState) => state.clicks;
