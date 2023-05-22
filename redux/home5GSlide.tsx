import { createSlice, PayloadAction } from '@reduxjs/toolkit';
export type Wireless_Plan =
    | 'welcome'
    | 'start'
    | 'do_more'
    | 'play_more'
    | 'get_more'
    | 'one_unlimited'
    | undefined;
interface IState {
    home5GAutoPay: boolean;
    home5GHasWireless: boolean;
    home5GACPCustomer: boolean;
    wirelessPlan: Wireless_Plan;
}
const initialState: IState = {
    home5GAutoPay: true,
    home5GHasWireless: true,
    home5GACPCustomer: false,
    wirelessPlan: undefined,
};
const home5GSlide = createSlice({
    name: 'home5G',
    initialState,
    reducers: {
        toogle5GAutoPay: (state) => {
            state.home5GAutoPay = !state.home5GAutoPay;
        },
        toogle5GHasWireless: (state) => {
            state.home5GHasWireless = !state.home5GHasWireless;
        },
        toogle5GACP: (state) => {
            state.home5GACPCustomer = !state.home5GACPCustomer;
        },
        switch5GWirelessPlan: (
            state,
            { payload }: PayloadAction<IState['wirelessPlan']>
        ) => {
            state.wirelessPlan = payload;
        },
    },
});

export const {
    toogle5GAutoPay,
    toogle5GACP,
    toogle5GHasWireless,
    switch5GWirelessPlan,
} = home5GSlide.actions;
export default home5GSlide.reducer;
