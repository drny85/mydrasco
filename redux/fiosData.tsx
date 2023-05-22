import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DataState {
    fiosAutoPay: 0 | 10;
    isFiosFirstResponder: boolean;
    hasWireless: boolean;
    wirelessDiscount: number;
    isUnlimited: boolean;
    wirelessWithin30Days: boolean;
    justSigned: boolean;
    acpCustomer: boolean;
    fiosDiscount: number;

    fiosPrice: {
        fios200: number;
        fios400: number;
        fiosGig: number;
    };
}

const initialState: DataState = {
    fiosAutoPay: 10,
    acpCustomer: false,
    isFiosFirstResponder: false,
    hasWireless: false,
    wirelessDiscount: 0,
    justSigned: false,
    isUnlimited: true,
    fiosDiscount: 0,
    wirelessWithin30Days: false,

    fiosPrice: {
        fios200: 59.99,
        fios400: 79.99,
        fiosGig: 99.99,
    },
};

const fiosDataSlide = createSlice({
    name: 'fiosData',
    initialState,
    reducers: {
        setFiosAutoPay: (
            state,
            { payload }: PayloadAction<DataState['fiosAutoPay']>
        ) => {
            state.fiosAutoPay = payload;
        },
        setFiosFirstResponder: (state, { payload }: PayloadAction<boolean>) => {
            state.isFiosFirstResponder = payload;
        },
        setWirelessDiscount: (state, { payload }: PayloadAction<number>) => {
            state.wirelessDiscount = payload;
        },
        setHasWireless: (state, { payload }: PayloadAction<boolean>) => {
            state.hasWireless = payload;
        },
        setFiosPrices: (
            state,
            { payload }: PayloadAction<DataState['fiosPrice']>
        ) => {
            state.fiosPrice = payload;
        },
        setIsUnlimited: (state, { payload }: PayloadAction<boolean>) => {
            state.isUnlimited = payload;
        },
        setWirelessWithin30Days: (
            state,
            { payload }: PayloadAction<boolean>
        ) => {
            state.wirelessWithin30Days = payload;
        },
        fiosReset: (state) => {
            return (state = initialState);
        },
        setJustSignedUpForWireless: (
            state,
            { payload }: PayloadAction<boolean>
        ) => {
            state.justSigned = payload;
        },
        setFiosDiscount: (state, { payload }: PayloadAction<number>) => {
            state.fiosDiscount = payload;
        },
        setAcpCustomer: (state, { payload }: PayloadAction<boolean>) => {
            state.acpCustomer = payload;
        },
    },
});

export const {
    setFiosAutoPay,
    setFiosFirstResponder,
    setHasWireless,
    setIsUnlimited,
    setFiosDiscount,
    setFiosPrices,
    setWirelessDiscount,
    setWirelessWithin30Days,
    fiosReset,
    setJustSignedUpForWireless,
    setAcpCustomer,
} = fiosDataSlide.actions;
export default fiosDataSlide.reducer;
