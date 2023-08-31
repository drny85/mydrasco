import React from 'react';
import { makeStyles } from '@mui/styles';

import { Grid } from '@mui/material';
import MyPlanCard from './MyPlanCard';
import { useAppDispatch } from '../redux/hooks/reduxHooks';
import { toogleHoverPlan } from '../redux/wirelessSlide';

const CardContainer: React.FC = () => {
    const dispatch = useAppDispatch();

    return (
        <Grid container spacing={3}>
            <Grid item xs={12} sm={12} md={4}>
                <MyPlanCard
                    selected={false}
                    onClick={() => {
                        dispatch(toogleHoverPlan('ultimate'));
                    }}
                    title="Unlimited Ultimate"
                    price={90}
                    description="Everything in Unlimited Plus, with double the mobile hotspot data, international connectivity and more."
                />
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
                <MyPlanCard
                    selected={false}
                    onClick={() => {
                        dispatch(toogleHoverPlan('plus'));
                    }}
                    title="Unlimited Plus"
                    price={80}
                    description="Our reliable, fastest 5G, up to 10x faster than 4G LTE. No matter how much you use."
                />
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
                <MyPlanCard
                    selected={false}
                    onClick={() => {
                        dispatch(toogleHoverPlan('welcome'));
                    }}
                    title="Unlimited Welcome"
                    price={65}
                    description="Our reliable, fast 5G"
                />
            </Grid>
        </Grid>
    );
};

export default CardContainer;
