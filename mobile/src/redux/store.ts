import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import SessionReducer from "./reducers/auth";

export const store = configureStore({
  reducer: {
    session: SessionReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
