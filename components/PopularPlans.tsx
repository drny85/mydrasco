import { Grid } from '@mui/material';
import { perks } from '../perks';

import PopularPlanCard from './PopularPlanCard';

const PopularPlans = () => {
    return (
        <Grid container width={'100%'} spacing={3} sx={{ cursor: 'pointer' }}>
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
                    '3-year price guarantee',
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
                    '3-year price guarantee',
                ]}
            />
            <PopularPlanCard
                title="Unlimited Welcome"
                perks={[perks.find((p) => p.name === 'walmart+ membership')!]}
                description="If you love easy shooping, saving & more"
                totalPrice={75}
                linePrice={65}
                benefits={['5G']}
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
                    '3-year price guarantee',
                ]}
            />
        </Grid>
    );
};

export default PopularPlans;
