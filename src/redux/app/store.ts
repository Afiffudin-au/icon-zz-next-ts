import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import iconReducer from '../features/icon/iconSlice'

export const store = configureStore({
  reducer: {
    icons: iconReducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
