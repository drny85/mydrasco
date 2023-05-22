import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DefaultTheme } from 'styled-components';
import { lightTheme } from '../Theme';

const initialState: DefaultTheme = lightTheme;

const themeSlide = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        switchTheme: (state, { payload }: PayloadAction<DefaultTheme>) => {
            localStorage.setItem('theme', JSON.stringify(payload.mode));
            return payload;
        },
    },
});

export const { switchTheme } = themeSlide.actions;

export default themeSlide.reducer;
