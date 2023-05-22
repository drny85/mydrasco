import { Card, CardContent, CardHeader } from '@mui/material';
import React, { FC } from 'react';

import { useAppSelector } from '../redux/hooks/reduxHooks';
import AnimatedNumber from 'animated-number-react';

import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import { motion } from 'framer-motion';

interface Props {
    id: string;
    title: string;
    details: string[];
    price: number;
    perk: string;
    subtitle?: string;
}
const TvCard: FC<Props> = ({ title, details, price, id, subtitle, perk }) => {
    const theme = useAppSelector((state) => state.theme);
    return (
        <motion.div
            style={{ display: 'flex', flex: 1 }}
            whileHover={{ scale: 1.02 }}
        >
            <Card
                style={{
                    backgroundColor: theme.BACKGROUND_COLOR,
                    minWidth: '12rem',
                    width: '100%',
                }}
            >
                <CardHeader
                    title={title}
                    style={{
                        color: theme.TEXT_COLOR,
                        fontWeight: 'bold',
                    }}
                />
                <CardContent>
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            paddingBottom: '1rem',
                        }}
                    >
                        {/* <h1>
                        {Math.fround(
                            price -
                                auto_pay -
                                firstResponderDiscount()! -
                                mobilePlusHomeDiscount()!
                        ).toFixed(2)}
                    </h1> */}
                        <h1>
                            $
                            <AnimatedNumber
                                duration={300}
                                formatValue={(n: number) => n.toFixed(2)}
                                value={price}
                            />
                        </h1>

                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <p
                                style={{
                                    paddingLeft: '8px',
                                    fontStyle: 'italic',
                                    fontSize: '13px',
                                }}
                            >
                                / Per month
                            </p>
                            <p
                                style={{
                                    paddingLeft: '8px',
                                    fontStyle: 'italic',
                                    fontSize: '13px',
                                }}
                            >
                                {' '}
                                Plus taxes & fee
                            </p>
                        </div>
                    </div>
                    <div>
                        <h4
                            style={{
                                padding: '6px',
                                lineHeight: 1.5,
                                fontStyle: 'italic',
                                paddingBottom: '10px',
                            }}
                        >
                            {subtitle}
                        </h4>
                    </div>

                    {details.map((d, index) => (
                        <div
                            style={{ display: 'flex', alignItems: 'center' }}
                            key={d}
                        >
                            <DoubleArrowIcon
                                style={{ color: theme.TEXT_COLOR }}
                            />
                            <p
                                style={{
                                    padding: '8px 4px',

                                    fontWeight:
                                        index === 0 ||
                                        (index === details.length - 1 &&
                                            d.includes('$99'))
                                            ? 'bold'
                                            : undefined,
                                }}
                            >
                                {d}
                            </p>
                        </div>
                    ))}
                </CardContent>
            </Card>
        </motion.div>
    );
};

export default TvCard;
