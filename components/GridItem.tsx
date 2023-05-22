import { Grid } from '@mui/material';

const GridItem = ({ title, subtitle }: { title: string; subtitle: string }) => {
    return (
        <Grid
            flex={1}
            justifyContent={'space-between'}
            display={'flex'}
            item
            width={'100%'}
            px={{ xs: 2, md: 6, lg: 8 }}
            py={1.5}
            xs={12}
        >
            <h4>{title}</h4>
            <p>{subtitle}</p>
        </Grid>
    );
};

export default GridItem;
