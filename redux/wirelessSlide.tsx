import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import moment from 'moment';
import { Perk } from '../components/PerksView';

interface DataState {
    expressAutoPay: 0 | 10;
    expressFirstResponder: boolean;
    expressHasFios: boolean;
    expressBonus: number;
    expressWhithin30Days: boolean;
    expressInternet: '200' | '400' | 'gig' | undefined;
    BYOD: boolean;
    hoverPlan: 'plus' | 'welcome' | undefined;
    lines: Line[];
    reviewModal: 'review' | 'quote' | undefined;
    planView: 'myPlan' | 'oldPlan';
    getStarted: boolean;
}
export interface Line {
    id: string;
    name: 'Unlimited Plus' | 'Unlimited Welcome';
    price: number;
    byod: boolean;
    perks: Perk[];
}
const initialState: DataState = {
    expressAutoPay: 10,
    expressFirstResponder: false,
    expressHasFios: false,
    expressWhithin30Days: true,
    expressBonus: moment().isBefore(moment('2022-02-28').endOf('day')) ? 20 : 0,
    expressInternet: undefined,
    BYOD: false,
    hoverPlan: undefined,
    lines: [],
    reviewModal: undefined,
    getStarted: false,
    planView: 'myPlan',
};
const wirelessSlide = createSlice({
    name: 'wireless',
    initialState,
    reducers: {
        setExpressAutoPay: (
            state,
            { payload }: PayloadAction<DataState['expressAutoPay']>
        ) => {
            state.expressAutoPay = payload;
        },
        setExpressFirstResponder: (
            state,
            { payload }: PayloadAction<boolean>
        ) => {
            state.expressFirstResponder = payload;
        },
        setExpressHasFios: (state, { payload }: PayloadAction<boolean>) => {
            state.expressHasFios = payload;
        },

        setExpressInternet: (
            state,
            { payload }: PayloadAction<DataState['expressInternet']>
        ) => {
            state.expressInternet = payload;
        },
        setExpressWithin30Days: (
            state,
            { payload }: PayloadAction<boolean>
        ) => {
            state.expressWhithin30Days = payload;
        },
        setExpressReset: (state) => {
            return (state = initialState);
        },
        toogleBYOD: (state) => {
            state.BYOD = !state.BYOD;
        },
        setLinesData: (state, { payload }: PayloadAction<Line[]>) => {
            state.lines = payload;
        },

        toogleHoverPlan: (
            state,
            { payload }: PayloadAction<'plus' | 'welcome' | undefined>
        ) => {
            state.hoverPlan = payload;
        },
        setReviewModal: (
            state,
            { payload }: PayloadAction<DataState['reviewModal']>
        ) => {
            state.reviewModal = payload;
        },
        toogleView: (
            state,
            { payload }: PayloadAction<'myPlan' | 'oldPlan'>
        ) => {
            state.planView = payload;
        },
        setGetStarted: (state, { payload }: PayloadAction<boolean>) => {
            state.getStarted = payload;
        },
    },
});

export const {
    setExpressFirstResponder,
    setExpressAutoPay,
    setExpressHasFios,
    setExpressInternet,
    setExpressWithin30Days,
    setExpressReset,
    toogleBYOD,
    setLinesData,
    toogleHoverPlan,
    setReviewModal,
    setGetStarted,
    toogleView,
} = wirelessSlide.actions;

export default wirelessSlide.reducer;
