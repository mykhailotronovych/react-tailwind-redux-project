import { configureStore } from '@reduxjs/toolkit';
import blogReducer from './blog.reducer';

export const store = configureStore({
    reducer: {
        blog: blogReducer,
    },
});

// * Lấy rootstate và addDispatch từ store của ta
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
