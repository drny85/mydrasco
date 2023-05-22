import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Button,
    Divider,
    Tooltip,
} from '@mui/material';
import AnimatedNumber from 'animated-number-react';
import { useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useAppDispatch, useAppSelector } from '../redux/hooks/reduxHooks';
import {
    Line,
    setExpressAutoPay,
    setExpressFirstResponder,
    setExpressHasFios,
    setLinesData,
    setReviewModal,
} from '../redux/wirelessSlide';
import { firstResponderDiscount } from '../utils/firstResponderDiscount';
import { totalPerksCount } from '../utils/totalPerksCount';
import AnimateElementIf from './AnimateElementIf';
import { Perk } from './PerksView';
import { byodSavings } from '../utils/byodSavings';

type Props = {
    lines: Line[];
    modalView?: boolean;
};

const TotalView = ({ lines, modalView = false }: Props) => {
    const theme = useAppSelector((s) => s.theme);
    const dispatch = useAppDispatch();

    const {
        expressFirstResponder,
        expressAutoPay,
        expressHasFios,
        expressInternet,
    } = useAppSelector((s) => s.wireless);

    const byod = byodSavings(lines);

    const mobilePlusHomeDiscount = (): number => {
        return lines
            .map((line) =>
                line.name === 'Unlimited Plus' &&
                expressHasFios &&
                expressInternet === 'gig'
                    ? { discount: 10 }
                    : line.name === 'Unlimited Plus' &&
                      expressHasFios &&
                      expressInternet !== 'gig'
                    ? { discount: 5 }
                    : line.name === 'Unlimited Welcome' && expressHasFios
                    ? { discount: 5 }
                    : { discount: 0 }
            )
            .reduce((acc, line) => acc + line.discount, 0);
    };
    const perksSavings = (): number => {
        return lines
            .map((line) =>
                line.perks.map((perk) =>
                    perk.selected ? perk.value - perk.price : 0
                )
            )
            .flat()
            .reduce((acc, perks) => acc + perks, 0);
    };

    const perks = (): Perk[] => {
        //@ts-ignore
        return lines
            .map((line) =>
                line.perks.map((perk) => (perk.selected ? perk : null))
            )
            .flat()

            .filter((perk) => perk !== null);
    };

    const perksTotal = (): number => {
        return lines
            .map((line) =>
                line.perks.map((perk) => (perk.selected ? perk.price : 0))
            )
            .flat()
            .reduce((acc, perks) => acc + perks, 0);
    };

    const totalPerks = (): number => {
        return totalPerksCount(lines);
    };

    const autoPayDiscount = (): number => {
        return expressAutoPay ? lines.length * 10 : 0;
    };

    const resetAll = () => {
        dispatch(setLinesData([]));
        dispatch(setExpressAutoPay(0));
        dispatch(setExpressFirstResponder(false));
        dispatch(setExpressHasFios(false));
    };

    return (
        <Box
            display={'flex'}
            flexDirection={'column'}
            width={'100%'}
            alignItems={'center'}
            maxWidth={'850px'}
            padding={3}
            mx={'auto'}
            sx={{
                boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
                borderRadius: '10px',
                backgroundColor: theme.BACKGROUND_COLOR,
            }}
            mt={2}
        >
            <Box>
                <p
                    style={{
                        fontSize: '0.9rem',
                        fontStyle: 'italic',
                        margin: '0.8rem 0',
                    }}
                >
                    Note:{' '}
                    <span>
                        First bill will include ${lines.length * 35} activation
                        fee.
                    </span>
                </p>
            </Box>
            <Box
                my={1}
                display={'flex'}
                justifyContent={'space-between'}
                alignItems={'center'}
                width={'100%'}
            >
                <p style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>
                    Subtotal{' '}
                    <span
                        style={{
                            fontSize: '0.8rem',
                            fontStyle: 'italic',
                            marginLeft: '5px',
                        }}
                    >
                        (auto pay not included)
                    </span>
                </p>

                <h2>
                    ${''}
                    <AnimatedNumber
                        duration={300}
                        formatValue={(n: number) => n.toFixed(0)}
                        value={
                            lines.reduce((acc, line) => acc + line.price, 0) +
                            mobilePlusHomeDiscount() +
                            autoPayDiscount() +
                            perksTotal() +
                            byod
                        }
                    />
                </h2>
            </Box>
            <AnimateElementIf show={perksTotal() > 0}>
                <Accordion sx={{ backgroundColor: theme.SHADOW_COLOR }}>
                    <AccordionSummary
                        expandIcon={
                            <ExpandMoreIcon sx={{ color: theme.TEXT_COLOR }} />
                        }
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Box
                            display={'flex'}
                            justifyContent={'space-between'}
                            alignItems={'center'}
                            width={'100%'}
                            borderRadius={2}
                        >
                            <p style={{ fontSize: '1.1rem' }}>
                                Perks ({totalPerks()})
                                <span
                                    style={{
                                        fontSize: '0.8rem',
                                        fontStyle: 'italic',
                                        marginLeft: '5px',
                                    }}
                                >
                                    (${perksSavings().toFixed(2)}/mo savings in
                                    perks)
                                </span>
                            </p>
                            <p
                                style={{
                                    fontSize: '1.1rem',
                                }}
                            >
                                ${''}
                                <AnimatedNumber
                                    duration={300}
                                    formatValue={(n: number) => n.toFixed(0)}
                                    value={perksTotal()}
                                />
                            </p>
                        </Box>
                    </AccordionSummary>
                    <AccordionDetails>
                        {perks().map((perk, index) => (
                            <Box
                                px={3}
                                display={'flex'}
                                justifyContent={'space-between'}
                                key={index}
                                my={1}
                            >
                                <p
                                    style={{
                                        fontSize: '0.8rem',
                                        textTransform: 'capitalize',
                                    }}
                                >
                                    {perk.name}
                                </p>
                                <p>${perk.price}</p>
                            </Box>
                        ))}
                    </AccordionDetails>
                </Accordion>
            </AnimateElementIf>
            <AnimateElementIf show={expressAutoPay === 10}>
                <Box
                    display={'flex'}
                    justifyContent={'space-between'}
                    alignItems={'center'}
                    width={'100%'}
                    my={1}
                >
                    <p style={{ fontSize: '1.1rem' }}>
                        Auto Pay Discount
                        <i style={{ fontSize: '0.8rem', marginLeft: '5px' }}>
                            ($10 per line)
                        </i>
                    </p>
                    <p
                        style={{
                            fontSize: '1.1rem',
                        }}
                    >
                        -${''}
                        <AnimatedNumber
                            duration={300}
                            formatValue={(n: number) => n.toFixed(0)}
                            value={expressAutoPay ? lines.length * 10 : 0}
                        />
                    </p>
                </Box>
            </AnimateElementIf>
            <AnimateElementIf show={expressFirstResponder}>
                <Box
                    display={'flex'}
                    justifyContent={'space-between'}
                    alignItems={'center'}
                    width={'100%'}
                    my={1}
                >
                    <p style={{ fontSize: '1.1rem' }}>
                        First Responder Discount
                    </p>
                    <p
                        style={{
                            fontSize: '1.1rem',
                        }}
                    >
                        -${''}
                        <AnimatedNumber
                            duration={300}
                            formatValue={(n: number) => n.toFixed(0)}
                            value={firstResponderDiscount(
                                lines.length,
                                expressFirstResponder
                            )}
                        />
                    </p>
                </Box>
            </AnimateElementIf>
            <AnimateElementIf show={expressHasFios}>
                <Box
                    my={1}
                    display={'flex'}
                    justifyContent={'space-between'}
                    alignItems={'center'}
                    width={'100%'}
                >
                    <p
                        style={{
                            fontSize: '1.1rem',
                        }}
                    >
                        Mobile + Home Discount
                    </p>
                    <p style={{ fontSize: '1.1rem' }}>
                        -$
                        <AnimatedNumber
                            duration={300}
                            formatValue={(n: number) => n.toFixed(0)}
                            value={mobilePlusHomeDiscount()}
                        />
                    </p>
                </Box>
            </AnimateElementIf>
            <AnimateElementIf show={byod > 0}>
                <Box
                    my={1}
                    display={'flex'}
                    justifyContent={'space-between'}
                    alignItems={'center'}
                    width={'100%'}
                >
                    <p
                        style={{
                            fontSize: '1.1rem',
                        }}
                    >
                        BYOD Monthly Savings{' '}
                        <i style={{ fontSize: '0.8rem' }}>(36 months)</i>
                    </p>
                    <p style={{ fontSize: '1.1rem' }}>
                        -$
                        <AnimatedNumber
                            duration={300}
                            formatValue={(n: number) => n.toFixed(0)}
                            value={byod}
                        />
                    </p>
                </Box>
            </AnimateElementIf>

            <Box
                my={1}
                display={'flex'}
                justifyContent={'space-between'}
                alignItems={'center'}
                width={'100%'}
            >
                <p
                    style={{
                        fontSize: '1.7rem',
                        fontWeight: 'bold',
                    }}
                >
                    Total
                </p>
                <p style={{ fontSize: '1.7rem', fontWeight: 'bold' }}>
                    $
                    <AnimatedNumber
                        duration={300}
                        formatValue={(n: number) => n.toFixed(0)}
                        value={
                            lines.reduce((acc, line) => acc + line.price, 0) -
                            firstResponderDiscount(
                                lines.length,
                                expressFirstResponder
                            )
                        }
                    />
                </p>
            </Box>
            <Divider
                color={theme.SHADOW_COLOR}
                sx={{ height: '1px', width: '100%' }}
            />
            {!modalView && (
                <Box
                    display={'flex'}
                    justifyContent={'space-evenly'}
                    mt={3}
                    width={'100%'}
                >
                    <Tooltip
                        title="Reset all selections"
                        arrow
                        placeholder="top"
                    >
                        <Button onClick={resetAll} variant="text">
                            RESET ALL
                        </Button>
                    </Tooltip>
                    <Tooltip title="View Summary" arrow placeholder="top">
                        <Button
                            variant="contained"
                            onClick={() => dispatch(setReviewModal(true))}
                            style={{ marginLeft: '10px' }}
                        >
                            View Summary
                        </Button>
                    </Tooltip>
                </Box>
            )}
        </Box>
    );
};

export default TotalView;
