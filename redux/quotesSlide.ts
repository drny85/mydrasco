import { createSlice } from '@reduxjs/toolkit';
import { Line } from './wirelessSlide';

export interface Quote {
    id: string;
    email: string;
    message: string;
    createdAt: string;
    updatedAt: string;
    status: string;
    hasFios: boolean;
    hasGig: boolean;
    customerName: string;
    lines: Line[];
    userId: string;
    isAutoPay: boolean;
    isFirstResponder: boolean;
}
interface QuotesState {
    quote: Quote | null;
    quotes: Quote[];
}
const initialState: QuotesState = {
    quote: null,
    quotes: [],
};
const quotesSlide = createSlice({
    name: 'quotes',
    initialState,
    reducers: {},
});

export default quotesSlide.reducer;
export const {} = quotesSlide.actions;
export const quotes = (state: any) => state.quotes;
