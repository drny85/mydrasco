import { Card, CardContent, CardHeader } from '@mui/material';
import React, { FC } from 'react';

import { useAppSelector } from '../redux/hooks/reduxHooks';
import AnimatedNumber from 'animated-number-react';

interface Props {
    id: string;
    title: string;
    details: string[];
    price: number;
    subtitle?: string;
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
    onClick?: () => void;
}
const FiosCard: FC<Props> = ({
    title,
    details,
    price,
    id,
    subtitle,
    onMouseEnter,
    onMouseLeave,
    onClick,
}) => {
    const theme = useAppSelector((state) => state.theme);

    const {
        fiosAutoPay,
        isFiosFirstResponder,
        hasWireless,
        isUnlimited,
        acpCustomer,
    } = useAppSelector((state) => state.fiosData);

    const firstResponderDiscount = () => {
        if (isFiosFirstResponder) {
            if (
                id === 'fiosGig' ||
                id === 'streaming' ||
                id === 'gaming' ||
                id === 'complete'
            )
                return 15;
            if (id === 'fios400') return 10;
            if (id === 'fios200') return 5;
        } else {
            return 0;
        }
    };

    const acpDiscountTotal = (): number => {
        if (acpCustomer) {
            if (id === 'fios200') return 49.99;
            return 50.0;
        }
        return 0;
    };

    const mobilePlusHomeDiscount = () => {
        if (hasWireless && isUnlimited) {
            return 25;
        } else if (hasWireless && !isUnlimited) {
            return 10;
        } else {
            return 0;
        }
    };

    return (
        <Card
            onClick={onClick}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            style={{
                backgroundColor: theme.CARD_BACKGROUND,
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
                    <div>
                        {(fiosAutoPay === 10 || hasWireless || acpCustomer) &&
                            id !== 'fiosGig' && (
                                <h3
                                    style={{
                                        textDecoration: 'line-through',
                                        textDecorationThickness: 1,
                                        color: '#964c43',
                                    }}
                                >
                                    was ${price}
                                </h3>
                            )}

                        <h1>
                            {id !== 'fiosGig' && (
                                <>
                                    {fiosAutoPay === 10 && (
                                        <i
                                            style={{
                                                fontSize: '18px',
                                                paddingRight: '6px',
                                            }}
                                        >
                                            now
                                        </i>
                                    )}
                                    ${' '}
                                    <AnimatedNumber
                                        duration={300}
                                        formatValue={(n: number) =>
                                            n.toFixed(2)
                                        }
                                        value={
                                            id === 'fios200' && acpCustomer
                                                ? 0
                                                : Math.fround(
                                                      price -
                                                          fiosAutoPay -
                                                          mobilePlusHomeDiscount()! -
                                                          firstResponderDiscount()! -
                                                          acpDiscountTotal()
                                                  ).toFixed(2)
                                        }
                                    />
                                </>
                            )}
                        </h1>
                    </div>
                    {id !== 'fiosGig' && (
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
                    )}
                </div>
                <div>
                    <h4
                        style={{
                            padding: '6px',
                            fontSize: id === 'fiosGig' ? '1.8rem' : 'inherit',
                        }}
                    >
                        {subtitle}
                    </h4>
                </div>

                {details.map((d, index) => (
                    <p
                        style={{
                            padding: '8px 4px',

                            textDecorationStyle: 'solid',

                            fontWeight:
                                index === 0 ||
                                (index === details.length - 1 &&
                                    d.includes('$99'))
                                    ? 'bold'
                                    : undefined,
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

export default FiosCard;
