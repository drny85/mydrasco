import { Card, CardContent, CardHeader } from '@mui/material';
import React, { FC, useState } from 'react';
import { setDiscount } from '../redux/dataSlide';
import { useAppDispatch, useAppSelector } from '../redux/hooks/reduxHooks';
import AnimatedNumber from 'animated-number-react';

interface Props {
    title: string;
    details: string[];
    price: number;
    subtitle?: string;
}
const PlanCard: FC<Props> = ({ title, details, price }) => {
    const dispatch = useAppDispatch();

    const theme = useAppSelector((state) => state.theme);
    const {
        auto_pay,
        numberOfLines,
        isFirstResponder,
        currentFios,
        internet,
        within30Days,
        mobilePlusHomeDiscountAmount,
    } = useAppSelector((state) => state.data);

    const firstResponderDiscount = () => {
        if (isFirstResponder) {
            if (numberOfLines === 1) {
                return 10;
            } else if (numberOfLines === 2) {
                return 12.5;
            } else if (numberOfLines === 3) {
                return 8.33;
            } else if (numberOfLines > 3) {
                return 5;
            }
        } else {
            return 0;
        }
    };
    const mobilePlusHomeDiscount = () => {
        if (currentFios) {
            if (internet && internet === 'gig') {
                dispatch(
                    setDiscount(
                        mobilePlusHomeDiscountAmount +
                            5 +
                            (within30Days ? 5 : 0)
                    )
                );
                return within30Days ? 10 : 0;
            } else if (internet === '200' || internet === '400') {
                dispatch(
                    setDiscount(
                        mobilePlusHomeDiscountAmount +
                            10 +
                            (within30Days ? 5 : 0)
                    )
                );
                return within30Days ? 5 : 0;
            } else {
                return 0;
            }
        } else {
            return 0;
        }
    };

    return (
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
                        <AnimatedNumber
                            duration={300}
                            formatValue={(n: number) => n.toFixed(2)}
                            value={Math.fround(
                                price -
                                    auto_pay -
                                    firstResponderDiscount()! -
                                    mobilePlusHomeDiscount()!
                            ).toFixed(2)}
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
                            / line per month
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

                {details.map((d, index) => (
                    <p
                        style={{
                            padding: '8px 4px',
                            fontWeight: index === 0 ? 'bold' : undefined,
                        }}
                        key={d}
                    >
                        {d}
                    </p>
                ))}
            </CardContent>
        </Card>
    );
};

export default PlanCard;
