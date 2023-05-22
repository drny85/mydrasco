import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export enum InterestedOn {
    Fios = 'fios',
    Wireless = 'wireless',
    Both = 'both',
}
interface DataState {
    currentFios: boolean | undefined;
    currentWireless: boolean | undefined;
    interestedOn: InterestedOn | undefined;
    numberOfLines: number;
    mobilePlusHomeDiscountAmount: number;
    discount: number;
    within30Days: boolean;
    unlimitedData: boolean;
    wirelessDiscount: number;
    isFirstResponder: boolean;
    plansPrice: {
        start: number;
        play_more: number;
        do_more: number;
        get_more: number;
    };
    auto_pay: 0 | 10;
    internet: '200' | '400' | 'gig' | undefined;
    lineDiscont: 0 | 10 | 25 | 35 | 40;
}

const initialState: DataState = {
    currentFios: undefined,
    currentWireless: undefined,
    interestedOn: undefined,
    wirelessDiscount: 0,
    numberOfLines: 4,
    discount: 0,
    isFirstResponder: false,
    mobilePlusHomeDiscountAmount: 0,
    internet: undefined,
    within30Days: true,
    unlimitedData: true,
    plansPrice: {
        start: 80,
        play_more: 90,
        do_more: 90,
        get_more: 100,
    },
    auto_pay: 10,
    lineDiscont: 0,
};
const dataSlide = createSlice({
    name: 'data',
    initialState,
    reducers: {
        setCurrentFiosCustomer: (
            state,
            { payload }: PayloadAction<boolean>
        ) => {
            state.currentFios = payload;
        },
        setCurrentWirelessCustomer: (
            state,
            { payload }: PayloadAction<boolean>
        ) => {
            state.currentWireless = payload;
        },
        setInterestedOn: (state, { payload }: PayloadAction<InterestedOn>) => {
            state.interestedOn = payload;
        },
        setNumbersOfLines: (state, { payload }: PayloadAction<number>) => {
            state.numberOfLines = payload;
        },
        setWithin30Days: (state, { payload }: PayloadAction<boolean>) => {
            state.within30Days = payload;
        },
        increaseLine: (state, { payload }: PayloadAction<number>) => {
            switch (true) {
                case payload === 1:
                    state.numberOfLines++;
                    state.plansPrice = {
                        do_more: 80,
                        get_more: 90,
                        play_more: 80,
                        start: 70,
                    };
                    break;
                case payload === 2:
                    state.numberOfLines++;
                    state.plansPrice = {
                        do_more: 65,
                        get_more: 75,
                        play_more: 65,
                        start: 55,
                    };
                    break;

                case payload === 3:
                    state.numberOfLines++;
                    state.plansPrice = {
                        do_more: 55,
                        get_more: 65,
                        play_more: 55,
                        start: 45,
                    };
                    break;

                case payload >= 4 && payload <= 10:
                    state.numberOfLines++;
                    state.plansPrice = {
                        do_more: 50,
                        get_more: 60,
                        play_more: 50,
                        start: 40,
                    };
                    break;

                default:
                    break;
            }
        },
        decreaseLine: (state, { payload }: PayloadAction<number>) => {
            switch (true) {
                case payload === 2:
                    state.numberOfLines--;
                    state.plansPrice = {
                        do_more: 90,
                        get_more: 100,
                        play_more: 90,
                        start: 80,
                    };
                    break;
                case payload === 3:
                    state.numberOfLines--;
                    state.plansPrice = {
                        do_more: 80,
                        get_more: 90,
                        play_more: 80,
                        start: 70,
                    };
                    break;
                case payload === 4:
                    state.numberOfLines--;
                    state.plansPrice = {
                        do_more: 65,
                        get_more: 75,
                        play_more: 65,
                        start: 55,
                    };
                    break;
                case payload === 5:
                    state.numberOfLines--;
                    state.plansPrice = {
                        do_more: 55,
                        get_more: 65,
                        play_more: 55,
                        start: 45,
                    };
                    break;
                case payload > 5 && payload <= 10:
                    state.numberOfLines--;
                    state.plansPrice = {
                        do_more: 50,
                        get_more: 60,
                        play_more: 50,
                        start: 40,
                    };
                    break;

                default:
                    break;
            }
        },
        setPlansPrice: (
            state,
            { payload }: PayloadAction<DataState['plansPrice']>
        ) => {
            state.plansPrice = payload;
        },
        setAutoPay: (
            state,
            { payload }: PayloadAction<DataState['auto_pay']>
        ) => {
            state.auto_pay = payload;
        },
        setLineDiscount: (
            state,
            { payload }: PayloadAction<DataState['lineDiscont']>
        ) => {
            state.lineDiscont = payload;
        },

        setInternet: (
            state,
            { payload }: PayloadAction<DataState['internet']>
        ) => {
            state.internet = payload;
        },
        setIsFirstResponder: (state, { payload }: PayloadAction<boolean>) => {
            state.isFirstResponder = payload;
        },

        setDiscount: (state, { payload }: PayloadAction<number>) => {
            state.discount = payload;
        },
        setUnlimitedData: (state, { payload }: PayloadAction<boolean>) => {
            state.unlimitedData = payload;
        },
        setWiressDiscount: (state, { payload }: PayloadAction<number>) => {
            state.wirelessDiscount = payload;
        },
        dataReset: (state) => {
            return (state = initialState);
        },
    },
});

export const {
    setCurrentFiosCustomer,
    setCurrentWirelessCustomer,
    setInterestedOn,
    setNumbersOfLines,
    setAutoPay,
    setWithin30Days,
    setPlansPrice,
    setIsFirstResponder,
    increaseLine,
    decreaseLine,
    setInternet,
    setUnlimitedData,
    setLineDiscount,
    setWiressDiscount,
    setDiscount,
    dataReset,
} = dataSlide.actions;

export default dataSlide.reducer;
