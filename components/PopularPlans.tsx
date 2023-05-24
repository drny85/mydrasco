import { Box, Grid } from '@mui/material';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks/reduxHooks';
import { perks } from '../perks';
import HoverElement from './HoverElement';
import {
    setExpressAutoPay,
    setGetStarted,
    setLinesData,
} from '../redux/wirelessSlide';
import { v4 } from 'uuid';
import PopularPlanCard from './PopularPlanCard';

type Props = {};

const PopularPlans = (props: Props) => {
    const theme = useAppSelector((s) => s.theme);
    const lines = useAppSelector((s) => s.wireless.lines);
    const dispatch = useAppDispatch();

    return (
        <Grid container width={'100%'} spacing={2} sx={{ cursor: 'pointer' }}>
            <PopularPlanCard
                title="Unlimited Plus"
                perks={[
                    perks.find((p) => p.name === 'disney bundle')!,
                    perks.find((p) => p.name === '100 GB mobile hotspot')!,
                ]}
                description="If you love movies, series & more"
                totalPrice={100}
                linePrice={80}
                benefits={[
                    '5G Ultra Wideband',
                    '30 GB premium mobile hotspot data',
                ]}
            />
            <PopularPlanCard
                title="Unlimited Plus"
                perks={[perks.find((p) => p.name === 'apple one')!]}
                description="If you love your Apple favorites, all together."
                totalPrice={90}
                linePrice={80}
                benefits={[
                    '5G Ultra Wideband',
                    '30 GB premium mobile hotspot data',
                ]}
            />
            <PopularPlanCard
                title="Unlimited Plus"
                perks={[perks.find((p) => p.name === 'walmart+ membership')!]}
                description="If you love easy shooping, saving & more"
                totalPrice={90}
                linePrice={80}
                benefits={[
                    '5G Ultra Wideband',
                    '30 GB premium mobile hotspot data',
                ]}
            />
            <PopularPlanCard
                title="Unlimited Plus"
                perks={[
                    perks.find((p) => p.name === 'apple music family')!,
                    perks.find((p) => p.name === '3 TravelPass Days')!,
                ]}
                description="If you love listening to music and travel"
                totalPrice={100}
                linePrice={80}
                benefits={[
                    '5G Ultra Wideband',
                    '30 GB premium mobile hotspot data',
                ]}
            />
        </Grid>
    );
};

export default PopularPlans;
