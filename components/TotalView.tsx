import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
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
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { db } from '../firebase';
import { useAppDispatch, useAppSelector } from '../redux/hooks/reduxHooks';
import { Quote } from '../redux/quotesSlide';
import {
    Line,
    setExpressAutoPay,
    setExpressFirstResponder,
    setExpressHasFios,
    setLinesData,
    setQuotes,
    setReviewModal,
} from '../redux/wirelessSlide';
import { byodSavings } from '../utils/byodSavings';
import { firstResponderDiscount } from '../utils/firstResponderDiscount';
import { totalPerksCount } from '../utils/totalPerksCount';
import AnimateElementIf from './AnimateElementIf';
import { Perk } from './PerksView';

type Props = {
    lines: Line[];
    modalView?: boolean;
    onViewQouteClick?: () => void;
};

const TotalView = ({ lines, modalView = false, onViewQouteClick }: Props) => {
    const theme = useAppSelector((s) => s.theme);
    const user = useAppSelector((s) => s.auth.user);
    const quotes = useAppSelector((s) => s.wireless.quotes);

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
                (expressInternet === '2gig' || expressInternet === 'gig')
                    ? { discount: 10 }
                    : line.name === 'Unlimited Plus' &&
                      expressHasFios &&
                      expressInternet !== '2gig' &&
                      expressInternet !== 'gig'
                    ? { discount: 5 }
                    : line.name === 'Unlimited Welcome' && expressHasFios
                    ? { discount: 5 }
                    : { discount: 0 }
            )
            .reduce((acc, line) => acc + line.discount, 0);
    };

    const loyaltyBonusDiscount = (): number => {
        return lines
            .map((line) =>
                (line.name === 'Unlimited Welcome' ||
                    line.name === 'Unlimited Plus') &&
                expressInternet !== '2gig' &&
                expressInternet !== 'gig' &&
                expressHasFios
                    ? {
                          discount:
                              lines.length === 1
                                  ? 30
                                  : lines.length === 2
                                  ? 20
                                  : lines.length === 3
                                  ? 5
                                  : 0,
                      }
                    : line.name === 'Unlimited Plus' &&
                      (expressInternet === '2gig' ||
                          expressInternet === 'gig') &&
                      expressHasFios
                    ? {
                          discount:
                              lines.length === 1
                                  ? 25
                                  : lines.length === 2
                                  ? 15
                                  : 0,
                      }
                    : line.name === 'Unlimited Welcome' &&
                      expressHasFios &&
                      (expressInternet === 'gig' || expressInternet === '2gig')
                    ? {
                          discount:
                              lines.length === 1
                                  ? 30
                                  : lines.length === 2
                                  ? 20
                                  : lines.length === 3
                                  ? 5
                                  : 0,
                      }
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
        return expressAutoPay === 10 ? lines.length * 10 : 0;
    };

    const resetAll = () => {
        dispatch(setLinesData([]));
        dispatch(setExpressAutoPay(0));
        dispatch(setExpressFirstResponder(false));
        dispatch(setExpressHasFios(false));
    };

    const loadQuotes = async () => {
        try {
            const q = await db.collection('quotes').get();
            const data = q.docs.map((doc) => ({ ...(doc.data() as Quote) }));
            dispatch(setQuotes(data));
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        loadQuotes();
    }, [user, quotes.length]);

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
                            loyaltyBonusDiscount() +
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
                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                }}
                            >
                                <i
                                    style={{
                                        marginRight: '10px',
                                        fontSize: '0.8rem',
                                    }}
                                >
                                    (included in subtotal)
                                </i>
                                <p
                                    style={{
                                        fontSize: '1.1rem',
                                    }}
                                >
                                    ${''}
                                    <AnimatedNumber
                                        duration={300}
                                        formatValue={(n: number) =>
                                            n.toFixed(0)
                                        }
                                        value={perksTotal()}
                                    />
                                </p>
                            </div>
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
            <AnimateElementIf
                show={expressHasFios && loyaltyBonusDiscount() > 0}
            >
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
                        M + Home Lotalty Bonus Discount
                    </p>
                    <p style={{ fontSize: '1.1rem' }}>
                        -$
                        <AnimatedNumber
                            duration={300}
                            formatValue={(n: number) => n.toFixed(0)}
                            value={loyaltyBonusDiscount()}
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
                        {quotes.length > 0 ? (
                            <Button onClick={onViewQouteClick} variant="text">
                                View Saved Quotes
                            </Button>
                        ) : (
                            <div></div>
                        )}
                    </Tooltip>
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
                            onClick={() => {
                                toast.success('Reviewed!', {
                                    position: 'top-center',
                                    autoClose: 3000,
                                });
                                dispatch(setReviewModal('review'));
                            }}
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
