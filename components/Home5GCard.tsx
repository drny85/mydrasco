import { Card, CardContent, CardHeader, Typography } from '@mui/material';
import React from 'react';

import { useAppSelector } from '../redux/hooks/reduxHooks';
import AnimatedNumber from 'animated-number-react';

type Props = {
    id: string;
    title: string;
    price: number;
    subtitle: string;
    details: string[];
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
};

const Home5GCard = ({ title, id, subtitle, details, price }: Props) => {
    const theme = useAppSelector((state) => state.theme);
    const {
        home5GAutoPay,
        wirelessPlan,
        home5GHasWireless,
        home5GACPCustomer,
    } = useAppSelector((state) => state.home5G);

    const discount = (): number => {
        if (
            (wirelessPlan === 'do_more' ||
                wirelessPlan === 'get_more' ||
                wirelessPlan === 'one_unlimited' ||
                wirelessPlan === 'play_more') &&
            home5GHasWireless
        )
            return 2;

        return 1;
    };

    const ACPdiscount = (): number => {
        return home5GACPCustomer ? 30 : 0;
    };
    const autopayDiscount = (): number => {
        return home5GAutoPay && wirelessPlan !== undefined && discount() === 2
            ? 5
            : home5GAutoPay && wirelessPlan === undefined
            ? 10
            : home5GAutoPay
            ? 10
            : 0;
    };

    return (
        <Card
            sx={{ margin: '4px' }}
            style={{
                backgroundColor: theme.CARD_BACKGROUND,
                minWidth: '15rem',
                width: '100%',
            }}
        >
            <Typography align="center" paddingY={2} variant="h4">
                {title}
            </Typography>
            {/* <CardHeader
                sx={{
                    fontSize: 40,
                    fontWeight: 'bold',
                    color: theme.TEXT_COLOR,
                }}
                title={title}
            /> */}
            <CardContent>
                <h3 style={{ paddingBottom: '1rem' }}>{subtitle}</h3>
                <p
                    style={{
                        color: '#964c43',
                        fontSize: '1.2rem',

                        textDecoration: 'line-through',
                        textDecorationThickness: 2,
                    }}
                >
                    was ${price}
                </p>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <h1>
                        $
                        <AnimatedNumber
                            duration={300}
                            formatValue={(n: number) => n.toFixed(2)}
                            value={
                                home5GACPCustomer &&
                                discount() === 2 &&
                                id === 'home'
                                    ? 0
                                    : price / discount() -
                                      autopayDiscount() -
                                      ACPdiscount()
                            }
                        />
                    </h1>
                    <span style={{ paddingLeft: '0.6rem' }}>
                        {home5GAutoPay && wirelessPlan
                            ? '/ mo with Auto Pay & select 5G mobile plans.'
                            : home5GAutoPay && !wirelessPlan
                            ? '/ mo with Auto Pay.'
                            : '/ mo without auto pay'}
                    </span>
                </div>

                {details.map((d, index) => (
                    <p
                        style={{
                            padding: '8px 4px',

                            textDecorationStyle: 'solid',
                        }}
                        key={index}
                    >
                        {d}
                    </p>
                ))}
            </CardContent>
        </Card>
    );
};

export default Home5GCard;
