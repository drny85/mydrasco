import { Box, Button, Grid, Tooltip } from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';
import React, { useCallback, useEffect, useState } from 'react';

import GridItem from '../components/GridItem';
import MyPlanCard from '../components/MyPlanCard';
import TopSwicher from '../components/TopSwitch';
import { useAppDispatch, useAppSelector } from '../redux/hooks/reduxHooks';

import { Perk } from '../components/PerksView';
import { perks } from '../perks';
import { Line, setGetStarted, setLinesData } from '../redux/wirelessSlide';

import moment from 'moment';
import Head from 'next/head';
import AnimateElementIf from '../components/AnimateElementIf';
import LineItem from '../components/LineItem';
import LinesSelector from '../components/LinesSelector';
import PopularPlans from '../components/PopularPlans';
import TotalView from '../components/TotalView';
import PerkAlertModal from '../components/modals/PerkAlertModal';
import ReviewModal from '../components/modals/ReviewModal';
import {
    BONUS_EXPIRATION_DATE,
    NON_PREMIUM_BYOD_VALUE,
    PREMIUM_BYOD_VALUE,
} from '../constant';
import { toogleHoverPlan } from '../redux/wirelessSlide';
import Quotes from './quotes';

const MyPlan = () => {
    const user = useAppSelector((s) => s.auth.user);
    const theme = useAppSelector((state) => state.theme);
    const [unlimitedPlus, setUnlimitedPlus] = React.useState(90);
    const [unlimitedWelcome, setUnlimitedWelcome] = React.useState(75);
    const [viewQuotes, setViewQuotes] = React.useState(false);
    const [popularPlans, setPopularPlans] = React.useState(false);
    const [showPerkAlertModal, setShowPerkAlertModal] = React.useState(false);
    const [perkToAdd, setPerkToAdd] = useState<{ perK: Perk; line: Line }>();

    const lines = useAppSelector((state) => state.wireless.lines);

    const getStarted = useAppSelector((state) => state.wireless.getStarted);

    const {
        expressAutoPay,
        hoverPlan,
        expressHasFios,
        expressFirstResponder,
        expressInternet,
    } = useAppSelector((state) => state.wireless);
    const dispatch = useAppDispatch();
    const deleteLine = (id: string) => {
        const newLines = lines.filter((line) => line.id !== id);
        dispatch(setLinesData(newLines));
    };

    const removeAllPerks = () => {
        const newLines = lines.map((line) => {
            const l = { ...line, perks: [...perks] };
            return {
                ...line,
                price: calculatePrice(l),
                perks: [...perks],
            };
        });
        dispatch(setLinesData(newLines));
    };

    const canPerkBeAdded = (perk: Perk): boolean => {
        const exists = lines
            .map((l) => l.perks)
            .flatMap((p) => p)
            .find(
                (i) =>
                    i.name.toLowerCase() === perk.name.toLowerCase() &&
                    i.selected
            );

        if (!exists) return true;
        return !exists.sharabled;
    };

    const addPerk = (line: Line, perk: Perk) => {
        const newPerks = line.perks.map((p) => {
            if (p.name.toLowerCase() === perk.name.toLowerCase()) {
                return {
                    ...p,
                    selected: !p.selected,
                };
            }
            return p;
        });

        const newLines = lines.map((l) => {
            if (l.id === line.id) {
                return {
                    ...l,
                    price: calculatePrice({ ...l, perks: newPerks }),
                    perks: newPerks,
                };
            }
            return l;
        });

        dispatch(setLinesData(newLines));
    };

    const cantAddPerkWarning = (perk: Perk, line: Line) => {
        setPerkToAdd({ perK: perk, line: line });
        setShowPerkAlertModal(true);
    };

    const onSelectPerk = (perk: Perk, line: Line) => {
        const exists = lines.find((l) => l.id === line.id);
        if (!exists) return;
        const canBeAdded = canPerkBeAdded(perk);

        if (canBeAdded) {
            addPerk(line, perk);
        } else {
            cantAddPerkWarning(perk, line);
        }
    };

    const onSwitchBYOD = (id: string) => {
        const newLines = lines.map((line) => {
            if (line.id === id) {
                return {
                    ...line,
                    price: calculatePrice({ ...line, byod: !line.byod }),
                    byod: !line.byod,
                };
            }
            return line;
        });
        // @ts-ignore

        dispatch(setLinesData(newLines));
    };

    const onSwitchLine = (id: string) => {
        const newLines = lines.map((line) => {
            const n = {
                ...line,
                name:
                    line.name === 'Unlimited Plus'
                        ? 'Unlimited Welcome'
                        : ('Unlimited Plus' as typeof line.name),
            };
            if (line.id === id) {
                return {
                    ...line,
                    price: calculatePrice(n),
                    name:
                        line.name === 'Unlimited Plus'
                            ? 'Unlimited Welcome'
                            : ('Unlimited Plus' as typeof line.name),
                };
            }
            return line;
        });

        dispatch(setLinesData(newLines));
    };

    const onSwitchAllLines = (name: Line['name']) => {
        const newLines = lines.map((line) => {
            const n = {
                ...line,
                name: name,
            };

            return {
                ...line,
                price: calculatePrice(n),
                name: name,
            };
        });

        dispatch(setLinesData(newLines));
    };

    const perksTotalAll = (): number => {
        return lines
            .map((line) =>
                line.perks.map((perk) => (perk.selected ? perk.price : 0))
            )
            .flat()
            .reduce((acc, perks) => acc + perks, 0);
    };

    const perksTotal = (line: Line): number => {
        return line.perks
            .map((i) => (i.selected ? i.price : 0))
            .reduce(
                (acc, p) => acc + p,

                0
            );
    };

    const mobilePlusHome = (line: Line): number => {
        if (
            (expressInternet === 'gig' || expressInternet === '2gig') &&
            line.name === 'Unlimited Plus'
        ) {
            return 10;
        } else if (
            expressHasFios &&
            expressInternet === 'gig' &&
            line.name === 'Unlimited Welcome'
        ) {
            return 5;
        } else if (expressHasFios && expressInternet !== 'gig') {
            return 5;
        } else {
            return 0;
        }
    };

    const calculateLoyaltyBonus = (
        line: Line,
        internet: typeof expressInternet
    ): number => {
        if (moment().isAfter(BONUS_EXPIRATION_DATE)) return 0;
        if (!expressHasFios || lines.length === 0) return 0;
        const gig = internet === 'gig' || internet === '2gig';
        if (line.name === 'Unlimited Plus') {
            if (gig) {
                return lines.length === 1 ? 25 : lines.length === 2 ? 15 : 0;
            }
            return lines.length === 1
                ? 30
                : lines.length === 2
                ? 20
                : lines.length === 3
                ? 5
                : 0;
        } else if (line.name === 'Unlimited Welcome') {
            return lines.length === 1
                ? 30
                : lines.length === 2
                ? 20
                : lines.length === 3
                ? 5
                : 0;
        } else {
            return 0;
        }
    };

    const calculatePrice = useCallback(
        (line: Line): number => {
            switch (line.name) {
                case 'Unlimited Welcome':
                    return (
                        (lines.length === 1
                            ? 75
                            : lines.length === 2
                            ? 65
                            : lines.length === 3
                            ? 50
                            : lines.length === 4
                            ? 40
                            : lines.length >= 5
                            ? 37
                            : 0) -
                        expressAutoPay -
                        mobilePlusHome(line) -
                        (line.byod ? NON_PREMIUM_BYOD_VALUE : 0) -
                        calculateLoyaltyBonus(line, expressInternet) +
                        perksTotal(line)
                    );
                case 'Unlimited Plus':
                    return (
                        (lines.length === 1
                            ? 90
                            : lines.length === 2
                            ? 80
                            : lines.length === 3
                            ? 65
                            : lines.length === 4
                            ? 55
                            : lines.length >= 5
                            ? 52
                            : 0) -
                        expressAutoPay -
                        mobilePlusHome(line) -
                        (line.byod ? PREMIUM_BYOD_VALUE : 0) -
                        calculateLoyaltyBonus(line, expressInternet) +
                        perksTotal(line)
                    );
                default:
                    return 0;
            }
        },
        [
            lines.length,
            expressAutoPay,
            expressFirstResponder,
            expressInternet,
            expressHasFios,
        ]
    );

    useEffect(() => {
        const newLines = lines.map((line) => {
            return {
                ...line,
                price: calculatePrice(line),
            };
        });

        dispatch(setLinesData(newLines));
    }, [
        lines.length,
        expressAutoPay,
        expressFirstResponder,
        expressInternet,
        expressHasFios,
        getStarted,
    ]);

    if (viewQuotes) return <Quotes onGoBack={() => setViewQuotes(false)} />;

    return (
        <div
            style={{
                backgroundColor: theme.BACKGROUND_COLOR,
                height: '100%',
                minHeight: '80vh',
                display: 'flex',
                flex: 1,
                flexDirection: 'column',
            }}
        >
            <div
                style={{
                    backgroundColor: theme.BACKGROUND_COLOR,
                    margin: '1rem auto',
                    width: '100%',
                    maxWidth: '900px',
                    height: '100%',
                }}
            >
                <Head>
                    <title>My Plan</title>
                </Head>
                <AnimateElementIf show={lines.length > 0}>
                    <TopSwicher />
                </AnimateElementIf>

                <AnimatePresence>
                    {!getStarted && (
                        <motion.div
                            style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                margin: '1rem auto',
                                height: '100%',
                                marginBottom: '20px',
                            }}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1, width: '100%' }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <Box>
                                {popularPlans && <PopularPlans />}
                                {!popularPlans && !getStarted && (
                                    <Grid
                                        gap={2}
                                        container
                                        direction={{
                                            xs: 'column',
                                            sm: 'row',
                                            md: 'row',
                                        }}
                                        width={'100%'}
                                        justifyContent={'center'}
                                        alignItems={'center'}
                                        // direction={{
                                        //     xs: 'column',
                                        //     sm: 'row',
                                        //     md: 'row',
                                        //     lg: 'row',
                                        // }}
                                    >
                                        <MyPlanCard
                                            selected={hoverPlan === 'plus'}
                                            onClick={() =>
                                                dispatch(
                                                    toogleHoverPlan('plus')
                                                )
                                            }
                                            title="Unlimited Plus"
                                            price={
                                                unlimitedPlus - expressAutoPay
                                            }
                                            description="Our reliable, fastest 5G, up to 10x faster than 4G LTE. No matter how much you use."
                                        />

                                        <MyPlanCard
                                            selected={hoverPlan === 'welcome'}
                                            onClick={() =>
                                                dispatch(
                                                    toogleHoverPlan('welcome')
                                                )
                                            }
                                            title="Unlimited Welcome"
                                            price={
                                                unlimitedWelcome -
                                                expressAutoPay
                                            }
                                            description="Our reliable, fast 5G."
                                        />
                                    </Grid>
                                )}

                                {hoverPlan === 'plus' && !popularPlans && (
                                    <div>
                                        <Grid
                                            sx={{
                                                width: '100%',
                                                boxShadow:
                                                    '0px 0px 5px 6px rgba(0, 0, 0, 0.25)',
                                                borderRadius: '0.5rem',
                                                marginTop: '1rem',
                                            }}
                                            container
                                            bgcolor={theme.BACKGROUND_COLOR}
                                        >
                                            <GridItem
                                                title="5G"
                                                subtitle="5G Ultra Wideband"
                                            />
                                            <GridItem
                                                title="Unlimited Premium Data"
                                                subtitle="Included"
                                            />
                                            <GridItem
                                                title="Mobile Hotspot"
                                                subtitle="30 GB"
                                            />
                                            <GridItem
                                                title="Home Internet"
                                                subtitle="Starting at $25/mo"
                                            />
                                            <GridItem
                                                title="Device Savings"
                                                subtitle="Eligible"
                                            />
                                            <GridItem
                                                title="Bring Your Own Device"
                                                subtitle="Up to $540 promo credit"
                                            />
                                            <GridItem
                                                title="Connected Device Plan"
                                                subtitle="Up to 50% off"
                                            />
                                            <GridItem
                                                title="Price Guarantee"
                                                subtitle="3 years"
                                            />
                                        </Grid>
                                    </div>
                                )}
                                {hoverPlan === 'welcome' && !popularPlans && (
                                    <div>
                                        <Grid
                                            sx={{
                                                width: '100%',
                                                boxShadow:
                                                    '0px 0px 5px 6px rgba(0, 0, 0, 0.25)',
                                                borderRadius: '0.5rem',
                                                marginTop: '1rem',
                                            }}
                                            container
                                            bgcolor={theme.BACKGROUND_COLOR}
                                        >
                                            <GridItem
                                                title="5G"
                                                subtitle="5G"
                                            />
                                            <GridItem
                                                title="Unlimited Premium Data"
                                                subtitle="-"
                                            />
                                            <GridItem
                                                title="Mobile Hotspot"
                                                subtitle="-"
                                            />
                                            <GridItem
                                                title="Home Internet"
                                                subtitle="Starting at $40/mo"
                                            />
                                            <GridItem
                                                title="Device Savings"
                                                subtitle="-"
                                            />
                                            <GridItem
                                                title="Bring Your Own Device"
                                                subtitle="Up to $180 promo credit"
                                            />
                                            <GridItem
                                                title="Connected Device Plan"
                                                subtitle="-"
                                            />
                                            <GridItem
                                                title="Price Guarantee"
                                                subtitle="-"
                                            />
                                        </Grid>
                                    </div>
                                )}
                            </Box>
                            <div
                                style={{
                                    marginTop: '2rem',
                                    display: 'flex',
                                    justifyContent: 'center',
                                }}
                            >
                                <Button
                                    sx={{ marginRight: '1rem', minWidth: 140 }}
                                    color="secondary"
                                    onClick={() => {
                                        console.log(popularPlans);
                                        if (popularPlans) {
                                            setPopularPlans(false);
                                            dispatch(setGetStarted(false));
                                        } else {
                                            setGetStarted(false);
                                            setPopularPlans(true);
                                        }
                                    }}
                                    variant="contained"
                                >
                                    {popularPlans
                                        ? 'Go Back'
                                        : 'Start with popular plans'}
                                </Button>
                                <Button
                                    sx={{ marginLeft: '1rem' }}
                                    onClick={() => {
                                        setPopularPlans(false);

                                        dispatch(setGetStarted(true));
                                    }}
                                    variant="contained"
                                >
                                    Start your own plan
                                </Button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
                <AnimatePresence>
                    {getStarted && (
                        <motion.div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                flexDirection: 'column',
                                margin: '0 auto',
                                width: '100%',
                                backgroundColor: theme.BACKGROUND_COLOR,
                                height: '100%',
                            }}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <Box mx={3}>
                                <Button
                                    variant="text"
                                    onClick={() =>
                                        dispatch(setGetStarted(false))
                                    }
                                >
                                    Go Back
                                </Button>
                            </Box>
                            <AnimatePresence>
                                {true && (
                                    <motion.div
                                        style={{ height: '100%' }}
                                        initial={{
                                            opacity: 0,
                                            y: -1000,
                                        }} // Initial position of the element
                                        animate={{
                                            opacity: 1,

                                            y: lines.length > 0 ? 0 : '30vh',
                                        }} // Final position of the element (center of the screen)
                                        transition={{
                                            duration: 0.7,
                                            type: 'tween',
                                        }}
                                        exit={{
                                            opacity: 0,
                                            y: -1000,
                                            decelerate: 0.5,
                                        }} // Final position of the element (center of the screen)
                                    >
                                        <Box>
                                            <p
                                                style={{
                                                    fontSize: '1.5rem',
                                                    textAlign: 'center',
                                                    margin: '1rem',
                                                }}
                                            >
                                                How Many Lines
                                            </p>
                                            <LinesSelector />
                                        </Box>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <div>
                                <AnimateElementIf show={perksTotalAll() > 0}>
                                    <Button onClick={removeAllPerks}>
                                        Remove Perks
                                    </Button>
                                </AnimateElementIf>
                            </div>

                            <div>
                                <AnimateElementIf show={lines.length > 1}>
                                    <Grid
                                        container
                                        mt={2}
                                        direction={{ xs: 'column', sm: 'row' }}
                                        alignSelf={'center'}
                                        justifyContent={{
                                            xs: 'center',
                                            sm: 'space-evenly',
                                        }}
                                    >
                                        <Grid item>
                                            <Tooltip
                                                placement="top-start"
                                                title="Switch All LInes to Unlimited Plus"
                                            >
                                                <Button
                                                    onClick={() =>
                                                        onSwitchAllLines(
                                                            'Unlimited Plus'
                                                        )
                                                    }
                                                    color="success"
                                                    variant="text"
                                                >
                                                    Switch To Unlimited PLus
                                                </Button>
                                            </Tooltip>
                                        </Grid>
                                        <Grid item>
                                            <Tooltip
                                                placement="top-end"
                                                title="Switch All LInes to Unlimited Plus"
                                            >
                                                <Button
                                                    onClick={() =>
                                                        onSwitchAllLines(
                                                            'Unlimited Welcome'
                                                        )
                                                    }
                                                    color="warning"
                                                    variant="text"
                                                >
                                                    Switch To Unlimited Welcome
                                                </Button>
                                            </Tooltip>
                                        </Grid>
                                    </Grid>
                                </AnimateElementIf>

                                {lines.map((line, index) => {
                                    return (
                                        <LineItem
                                            lineNumber={index + 1}
                                            onSwitchBYOD={onSwitchBYOD}
                                            onSwitch={onSwitchLine}
                                            onClick={deleteLine}
                                            onSelectPerk={(perk: Perk) =>
                                                onSelectPerk(perk, line)
                                            }
                                            key={index}
                                            line={line}
                                        />
                                    );
                                })}
                            </div>
                            <AnimatePresence>
                                {lines.length > 0 && (
                                    <motion.div
                                        style={{
                                            width: '100%',
                                            marginBottom: '2rem',
                                        }}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                    >
                                        <TotalView
                                            lines={lines}
                                            onViewQouteClick={() =>
                                                setViewQuotes(true)
                                            }
                                        />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    )}
                </AnimatePresence>

                <ReviewModal />
                <PerkAlertModal
                    open={showPerkAlertModal}
                    onClose={() => setShowPerkAlertModal(false)}
                    perk={perkToAdd?.perK!}
                    onSubmitted={() => {
                        if (!perkToAdd) return;

                        addPerk(perkToAdd.line, perkToAdd.perK);
                        setShowPerkAlertModal(false);
                        //setPerkToAdd(undefined);
                    }}
                />
            </div>
            <div style={{ height: '100px' }}></div>
        </div>
    );
};

export default MyPlan;
