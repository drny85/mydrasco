import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AppUser {
    id: string;
    email: string;
    emailVerified: boolean;
    lastLogin?: string;
    createdAt?: string;
}
interface IState {
    user: AppUser | null;
}
const initialState: IState = {
    user: null,
};

const authSlide = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, { payload }: PayloadAction<IState['user']>) => {
            state.user = payload;
        },
    },
});

export const { setUser } = authSlide.actions;

export default authSlide.reducer;
