import { configureStore } from '@reduxjs/toolkit';
import interviewSlice from './slices/interviewSlice';
import loginSlice from './slices/loginSlice';
import recognizerSlice from './slices/recognizerSlice';
// ...

export const store = configureStore({
  reducer: {
    interview: interviewSlice,
    login: loginSlice,
    recognizer: recognizerSlice
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;