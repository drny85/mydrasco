import { configureStore } from '@reduxjs/toolkit';
import authSlide from './authSlide';
import dataSlide from './dataSlide';
import fiosData from './fiosData';
import home5GSlide from './home5GSlide';

import themeSlide from './themeSlide';
import wirelessSlide from './wirelessSlide';
import quotesSlide from './quotesSlide';
// ...

export const store = configureStore({
    reducer: {
        auth: authSlide,
        theme: themeSlide,
        data: dataSlide,
        fiosData: fiosData,
        wireless: wirelessSlide,
        home5G: home5GSlide,
        quotes: quotesSlide,
    },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
