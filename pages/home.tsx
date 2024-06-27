import { Box, Button, Hidden, Tab, Tabs } from '@mui/material';
import Head from 'next/head';
import MainContainer from '../components/MainContainer';
import { useAppDispatch, useAppSelector } from '../redux/hooks/reduxHooks';

import moment from 'moment';

import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import FiveGIcon from '@mui/icons-material/FiveG';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import NetworkCheckIcon from '@mui/icons-material/NetworkCheck';
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import AnimatedNumber from 'animated-number-react';
import { motion } from 'framer-motion';

import { setNumbersOfLines, setPlansPrice } from '../redux/dataSlide';

import React, { FC, useEffect, useState } from 'react';

import FiosCard from '../components/FiosCard';
import Gigabit from '../components/Gigabit';
import Home5G from '../components/Home5G';
import MyAlert from '../components/MyAlert';
import PlanLine from '../components/PlanLine';
import Switcher from '../components/Switcher';
import TvCard from '../components/TvCard';
import fiosPlans from '../fiosPlans';
import { useAuth } from '../hooks/useAuth';
import {
    fiosReset,
    setAcpCustomer,
    setFiosAutoPay,
    setFiosFirstResponder,
    setHasWireless,
    setIsUnlimited,
    setJustSignedUpForWireless,
    setWirelessWithin30Days,
} from '../redux/fiosData';
import {
    switch5GWirelessPlan,
    toogle5GACP,
    toogle5GAutoPay,
    toogle5GHasWireless,
} from '../redux/home5GSlide';
import {
    setExpressAutoPay,
    setExpressFirstResponder,
    setExpressHasFios,
    setExpressInternet,
    setExpressReset,
    setExpressWithin30Days,
    toogleBYOD,
} from '../redux/wirelessSlide';
import tvPlans from '../tvPlans';
import { firstResponderDiscount } from '../utils/firstResponderDiscount';
import {
    bonusOfferDiscount,
    mobilePlusHomeRewards,
} from '../utils/mobilePlusHomeRewards';

import { useRouter } from 'next/router';
import Login from '.';
import { db } from '../firebase';
import MyPlan from './myPlan';

interface Props {
    children: React.ReactChild;
    value: number;
    index: number;
    others?: any;
}
enum PlanId {
    welcome = 'welcome',
    start = 'start',
    play_more = 'play_more',
    do_more = 'do_more',
    get_more = 'get_more',
    one_unlimited = 'one_unlimited',
}

const TabPanel: FC<Props> = ({ children, others, value, index }) => {
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...others}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
};

const Plans = () => {
    const { loading } = useAuth();
    const { user } = useAppSelector((state) => state.auth);

    const [opacity, setOpacity] = useState(0);

    const [tvAutoPay, setTvAutoPay] = useState(true);

    const [showAlert, setShowAlert] = useState(false);
    const [alertTitle, setAlertTitle] = useState('');
    const [alertMessage, setAlertMessage] = useState('');
    const [lines, setLines] = useState(0);
    const [value, setValue] = useState(0);
    const [welcome, setWelcome] = useState(0);
    const [start, setStart] = useState(0);
    const [playMore, setPlayMore] = useState(0);
    const [doMore, setDoMore] = useState(0);
    const [getMore, setGetMore] = useState(0);
    const [oneUnlimited, setOneUnlimited] = useState(0);

    const { numberOfLines } = useAppSelector((state) => state.data);

    const { home5GACPCustomer, home5GHasWireless, home5GAutoPay } =
        useAppSelector((state) => state.home5G);
    const {
        hasWireless,
        isFiosFirstResponder,
        fiosPrice,
        fiosAutoPay,
        isUnlimited,
        acpCustomer,
    } = useAppSelector((state) => state.fiosData);
    const {
        expressAutoPay,
        expressFirstResponder,
        expressHasFios,
        expressInternet,
        expressWhithin30Days,
        expressBonus,
        BYOD,
    } = useAppSelector((state) => state.wireless);
    const theme = useAppSelector((state) => state.theme);
    const dispatch = useAppDispatch();

    const handleChange = (event: any, newValue: number) => {
        setValue(newValue);
    };

    const newDiscountPerLine = (
        internet_plan: '200' | '400' | 'gig' | '2gig' | undefined,
        hasInternet: boolean
    ): number => {
        if (lines === 0 || !expressWhithin30Days) return 0;
        return (internet_plan === 'gig' || internet_plan === '2gig') &&
            hasInternet
            ? 10
            : internet_plan !== 'gig' &&
              hasInternet &&
              internet_plan !== undefined
            ? 5
            : 0;
    };

    const plans = [
        {
            id: 'welcome',
            name: 'Welcome ',
            line: welcome,
            details: ['Unlimited 5G', '5G Nationwide'],
            price:
                (lines === 1
                    ? 75 - expressAutoPay
                    : lines === 2
                    ? 65 - expressAutoPay
                    : lines === 3
                    ? 50 - expressAutoPay
                    : lines === 4
                    ? 40 - expressAutoPay
                    : lines >= 5 - expressAutoPay
                    ? 35 - expressAutoPay
                    : 0) - newDiscountPerLine(expressInternet, expressHasFios),
        },
        {
            id: 'start',
            name: '5G Start',
            line: start,
            details: [
                '5G Access',
                '5G Nationwide',
                'Apple Arcade for 6 months on us',
                'Google Play Pass for 6 months on us',
                'Apple Music for 6 months on us',
                '5 GB premium mobile hostspot data, then unlimted lower-speed data',
            ],
            price:
                (lines === 1
                    ? 80 - expressAutoPay
                    : lines === 2
                    ? 70 - expressAutoPay
                    : lines === 3
                    ? 55 - expressAutoPay
                    : lines === 4
                    ? 45 - expressAutoPay
                    : lines >= 5
                    ? 40 - expressAutoPay
                    : 0) - newDiscountPerLine(expressInternet, expressHasFios),
        },
        {
            id: 'play_more',
            name: '5G Play More',
            line: playMore,
            details: [
                '5G Total Access',
                '5G Ultra Wideband',
                '5G Nationwide',
                '50 GB Premium Network Access',
                '25 GB premium mobile hotspot data, then unlimited lower-speed data',
                'Hulu, Disney+ and ESPN+ included',
                'Apple Arcade or Google Play Pass',
                'Apple Music for 6 months on us',
            ],
            price:
                (lines === 1
                    ? 90 - expressAutoPay
                    : lines === 2
                    ? 80 - expressAutoPay
                    : lines === 3
                    ? 65 - expressAutoPay
                    : lines === 4
                    ? 55 - expressAutoPay
                    : lines >= 5
                    ? 50 - expressAutoPay
                    : 0) - newDiscountPerLine(expressInternet, expressHasFios),
        },
        {
            id: 'do_more',
            name: '5G Do More',
            line: doMore,
            details: [
                '5G Total Access',
                '5G Ultra Wideband',
                '5G Nationwide',
                '50 GB Premium Network Access',
                '25 GB premium mobile hotspot data, then unlimited lower-speed data',
                '600 GB of Verizon Cloud Storage',
                '1 TravelPass day per month',
                'Up to 50% off select connected device plans ($5 Smart Watch / $10 Tablets)',
                'Apple Music, Disney+, Apple Arcade, and Google Play Pass for 6 months on us',
            ],
            price:
                (lines === 1
                    ? 90 - expressAutoPay
                    : lines === 2
                    ? 80 - expressAutoPay
                    : lines === 3
                    ? 65 - expressAutoPay
                    : lines === 4
                    ? 55 - expressAutoPay
                    : lines >= 5
                    ? 50 - expressAutoPay
                    : 0) - newDiscountPerLine(expressInternet, expressHasFios),
        },
        {
            id: 'get_more',
            name: '5G Get More',
            line: getMore,
            details: [
                '5G Total Access',
                '5G Ultra Wideband',
                '5G Nationwide',
                'Unlimited Premium Network Access',
                '50 GB premium mobile hotspot data, then unlimited lower-speed data',
                'Hulu, Disney+ and ESPN+ included',
                'Apple Arcade or Google Play Pass for 12 months on us',
                'Apple Music included',
                '1 TravelPass day per month',
                '600 GB of Verizon Cloud Storage',
                'Up to 50% off select connected device plans ($5 Smart Watch / $10 Tablets)',
            ],
            price:
                (lines === 1
                    ? 100 - expressAutoPay
                    : lines === 2
                    ? 90 - expressAutoPay
                    : lines === 3
                    ? 75 - expressAutoPay
                    : lines === 4
                    ? 65 - expressAutoPay
                    : lines >= 5
                    ? 60 - expressAutoPay
                    : 0) - newDiscountPerLine(expressInternet, expressHasFios),
        },
        {
            id: 'one_unlimited',
            name: 'One Unlimited',
            line: oneUnlimited,
            details: [
                '5G Ultra Wideband',
                '5G Nationwide',
                'Unlimited Premium Network Access',
                '25 GB premium mobile hotspot data, then unlimited lower-speed data',
                'Apple Music included',
                'Apple TV+',
                'Apple Arcade',
                'Apple iCloud+',
                'Up to 50% off select connected device plans ($5 Smart Watch / $10 Tablets)',
            ],
            price:
                (lines === 1
                    ? 100 - expressAutoPay
                    : lines === 2
                    ? 85 - expressAutoPay
                    : lines === 3
                    ? 70 - expressAutoPay
                    : lines === 4
                    ? 60 - expressAutoPay
                    : lines >= 5
                    ? 55 - expressAutoPay
                    : 0) - newDiscountPerLine(expressInternet, expressHasFios),
        },
    ];

    const allWelcome = Object.values(plans).some(
        (p) => p.id === 'welcome' && p.line > 0
    );
    const someStart = Object.values(plans).some(
        (p) => p.id === 'start' && p.line > 0
    );
    const allStart = Object.values(plans).some(
        (p) => p.id === 'start' && p.line === lines && lines > 0
    );

    const calculateGrandTotal = (lines: number, isFirst: boolean) => {
        const total = plans.reduce((pre, acc) => acc.line * acc.price + pre, 0);
        return total - firstResponderDiscount(lines, isFirst) - byodDiscount();
    };

    const byodDiscount = (): number =>
        BYOD
            ? plans
                  .map((p) => {
                      return {
                          discount:
                              p.line > 0
                                  ? p.id === 'start'
                                      ? (360 / 36) * p.line
                                      : p.id === 'welcome'
                                      ? (180 / 36) * p.line
                                      : (504 / 36) * p.line
                                  : 0,
                      };
                  })
                  .reduce((pre, curr) => curr.discount + pre, 0)
            : 0;

    const calculatePriceByLineMinus = (plan_id: PlanId) => {
        switch (plan_id) {
            case 'welcome':
                if (welcome > 0) {
                    setLines((prev) => prev - 1);
                    setWelcome((prev) => prev - 1);
                }
                break;
            case 'start':
                if (start > 0) {
                    setLines((prev) => prev - 1);
                    setStart((prev) => prev - 1);
                }
                break;
            case 'play_more':
                if (playMore > 0) {
                    setLines((prev) => prev - 1);
                    setPlayMore((prev) => prev - 1);
                }
                break;
            case 'do_more':
                if (doMore > 0) {
                    setLines((prev) => prev - 1);
                    setDoMore((prev) => prev - 1);
                }
                break;
            case 'get_more':
                if (getMore > 0) {
                    setLines((prev) => prev - 1);
                    setGetMore((prev) => prev - 1);
                }
                break;
            case 'one_unlimited':
                if (oneUnlimited > 0) {
                    setLines((prev) => prev - 1);
                    setOneUnlimited((prev) => prev - 1);
                }
                break;
            default:
                break;
        }
    };

    const calculatePriceByLinePlus = (plan_id: PlanId) => {
        switch (plan_id) {
            case 'welcome':
                if (welcome < 10) {
                    setLines((prev) => prev + 1);
                    setWelcome((prev) => prev + 1);
                }
                break;
            case 'start':
                if (start < 10) {
                    setStart((prev) => prev + 1);
                    setLines((prev) => prev + 1);
                }
                break;
            case 'play_more':
                if (playMore < 10) {
                    setPlayMore((prev) => prev + 1);
                    setLines((prev) => prev + 1);
                }
                break;
            case 'do_more':
                if (doMore < 10) {
                    setDoMore((prev) => prev + 1);
                    setLines((prev) => prev + 1);
                }
                break;
            case 'get_more':
                if (getMore < 10) {
                    setGetMore((prev) => prev + 1);
                    setLines((prev) => prev + 1);
                }
                break;
            case 'one_unlimited':
                if (oneUnlimited < 10) {
                    setOneUnlimited((prev) => prev + 1);
                    setLines((prev) => prev + 1);
                }
                break;
            default:
                break;
        }
    };
    const calculateTotalPriceBeforeTaxes = () => {
        return plans.reduce((pre, acc) => acc.line * acc.price + pre, 0);
    };

    const resetAll = () => {
        setPlayMore(0);
        setDoMore(0);
        setStart(0);
        setGetMore(0);
        setLines(0);
        setWelcome(0);
        setOneUnlimited(0);
    };

    useEffect(() => {
        if (allWelcome) {
            if (!home5GHasWireless) {
                dispatch(toogle5GHasWireless());
            }
            dispatch(switch5GWirelessPlan('welcome'));
        } else if (allStart) {
            dispatch(switch5GWirelessPlan('start'));
        } else {
            if (lines > 0) {
                dispatch(switch5GWirelessPlan('play_more'));
            }
        }
    }, [lines, allStart, allWelcome, someStart]);

    useEffect(() => {
        dispatch(
            setPlansPrice({
                get_more: 65,
                do_more: 55,
                play_more: 55,
                start: 45,
            })
        );
        dispatch(setNumbersOfLines(4));
    }, [dispatch]);

    useEffect(() => {
        if (user) {
            db.collection('users')
                .doc(user.id)
                .update({ lastLogin: new Date().toISOString() });
        }
    }, []);

    if (loading) return null;
    if (!user || !user.emailVerified) return <Login />;

    return (
        <MainContainer>
            <Head>
                <title>Plans</title>
            </Head>
            <div
                style={{
                    margin: '0 auto',
                    display: 'flex',
                    width: '100%',
                    height: '100%',
                    maxWidth: '1200px',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Box
                    alignItems="center"
                    width="100%"
                    justifyContent="center"
                    sx={{ borderBottom: 1, borderColor: 'divider' }}
                >
                    <Tabs
                        sx={{
                            backgroundColor: theme.BACKGROUND_COLOR,
                            color: theme.TEXT_COLOR,
                        }}
                        value={value}
                        variant="fullWidth"
                        onChange={handleChange}
                        aria-label="basic tabs example"
                    >
                        <Tab
                            icon={<NetworkCheckIcon />}
                            iconPosition="start"
                            label="Fios Internet"
                            sx={{ color: theme.TEXT_COLOR }}
                        />
                        <Tab
                            icon={<FiveGIcon />}
                            iconPosition="start"
                            label="Home"
                            sx={{ color: theme.TEXT_COLOR }}
                        />

                        <Tab
                            icon={<LiveTvIcon />}
                            iconPosition="start"
                            label="Fios TV"
                            sx={{
                                color: theme.TEXT_COLOR,
                                display: { xs: 'none', sm: 'block' },
                            }}
                        />

                        <Tab
                            icon={<SignalCellularAltIcon />}
                            iconPosition="start"
                            label="My Plan"
                            sx={{ color: theme.TEXT_COLOR }}
                        />
                    </Tabs>
                </Box>
                <TabPanel value={value} index={3}>
                    <MyPlan />
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <div
                        style={{
                            alignItems: 'center',
                            display: 'flex',
                        }}
                    >
                        <Home5G />
                    </div>
                </TabPanel>
                <TabPanel value={value} index={0}>
                    {/* INTERNET INFO */}
                    <div>
                        <Head>
                            <title>Fios Internet</title>
                        </Head>
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-evenly',
                                marginBottom: '10px',
                            }}
                        >
                            {/* <motion.div
                                className="forms"
                                style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    width: '18rem',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <motion.a
                                    whileHover={{
                                        scale: 1.05,
                                        backgroundColor: '#706e6eab',
                                    }}
                                    style={{
                                        padding: '0.5rem 0.8rem',
                                        fontSize: '1rem',
                                        backgroundColor: theme.CARD_BACKGROUND,
                                        borderRadius: '10px',
                                        cursor: 'pointer',

                                        alignItems: 'center',
                                        display: 'flex',
                                        width: '100%',
                                    }}
                                    href="MIX.pdf"
                                    target="_blank"
                                >
                                    Event Form
                                </motion.a>

                                <motion.a
                                    whileHover={{
                                        scale: 1.05,
                                        backgroundColor: '#706e6eab',
                                    }}
                                    style={{
                                        padding: '0.5rem 0.8rem',
                                        fontSize: '1rem',
                                        margin: '0.5rem 0.2rem',
                                        backgroundColor: theme.CARD_BACKGROUND,
                                        borderRadius: '10px',
                                        cursor: 'pointer',
                                        display: 'flex',

                                        alignItems: 'center',
                                        width: '100%',
                                    }}
                                    href="ACP.pdf"
                                    target="_blank"
                                >
                                    ACP Form
                                </motion.a>
                            </motion.div> */}

                            <h2
                                style={{
                                    textAlign: 'center',
                                }}
                                className="center"
                            >
                                Thank you for your interest in Verizon Fios
                                Internet
                            </h2>
                            <Switcher
                                value={acpCustomer}
                                checked={acpCustomer}
                                text={'ACP Qualified'}
                                onChange={() => {
                                    if (opacity === 1) {
                                        setOpacity(0);
                                    } else {
                                        setOpacity(1);
                                    }
                                    if (acpCustomer && home5GACPCustomer) {
                                        dispatch(toogle5GACP());
                                    } else if (
                                        !acpCustomer &&
                                        !home5GACPCustomer
                                    ) {
                                        dispatch(toogle5GACP());
                                    }
                                    dispatch(setAcpCustomer(!acpCustomer));

                                    dispatch(setFiosAutoPay(0));
                                }}
                            />
                        </div>

                        <div
                            style={{
                                display: 'flex',
                                flex: 1,
                                borderRadius: '15px',

                                backgroundColor: theme.CARD_BACKGROUND,
                                overflow: 'hidden',
                                marginBottom: '12px',
                                padding: '12px 2px',
                            }}
                        >
                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'flex-start',
                                    justifyContent: 'center',
                                    flex: '1',
                                }}
                            >
                                <div
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'space-evenly',
                                        alignItems: 'center',
                                        width: '100%',
                                    }}
                                >
                                    <Switcher
                                        acp={acpCustomer}
                                        value={fiosAutoPay}
                                        checked={fiosAutoPay === 10}
                                        text={'Auto Pay'}
                                        saving={fiosAutoPay === 10}
                                        savingText={10}
                                        onChange={() => {
                                            if (acpCustomer) return;
                                            dispatch(
                                                setFiosAutoPay(
                                                    fiosAutoPay === 0 ? 10 : 0
                                                )
                                            );
                                        }}
                                    />
                                    <Switcher
                                        acp={acpCustomer}
                                        value={isFiosFirstResponder}
                                        checked={isFiosFirstResponder}
                                        text={'  Is First Responder'}
                                        onChange={() =>
                                            dispatch(
                                                setFiosFirstResponder(
                                                    !isFiosFirstResponder
                                                )
                                            )
                                        }
                                        saving={isFiosFirstResponder}
                                        savingText={'Up to $15'}
                                    />
                                    <Switcher
                                        value={hasWireless}
                                        text="Has Verizon Wireless?"
                                        checked={hasWireless}
                                        onChange={() => {
                                            const d = dispatch(
                                                setHasWireless(!hasWireless)
                                            );
                                            if (!d.payload) {
                                                dispatch(
                                                    setWirelessWithin30Days(
                                                        false
                                                    )
                                                );
                                                dispatch(
                                                    setJustSignedUpForWireless(
                                                        false
                                                    )
                                                );
                                            }
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                        <div
                            style={{
                                display: 'flex',
                                width: '100%',
                                margin: '0 auto',
                                gap: '16px',
                                justifyContent: 'center',
                            }}
                        >
                            {fiosPlans.map((plan) => (
                                <FiosCard
                                    id={plan.id}
                                    subtitle={plan.subtitle}
                                    key={plan.id}
                                    // onClick={() => {
                                    //     if (plan.id === 'fiosGig') {
                                    //         setOpacityX((prev) =>
                                    //             prev === 1 ? 0 : 1
                                    //         );
                                    //     }
                                    // }}
                                    // onMouseEnter={() => {
                                    //     if (plan.id === 'fiosGig') {
                                    //         setOpacityX(1);
                                    //     }
                                    // }}
                                    price={
                                        fiosPrice[
                                            plan.id as
                                                | 'fios2Gig'
                                                | 'fiosGig'
                                                | 'fios200'
                                                | 'fios400'
                                        ]
                                    }
                                    title={plan.name}
                                    details={plan.details}
                                />
                            ))}
                        </div>

                        <div
                            style={{
                                transition: 'all 500ms ease-in-out',
                                opacity: opacity,
                                flexDirection: 'column',

                                height: opacity === 1 ? 'auto' : '50px',
                                transform: 'scale(' + opacity + ')',
                            }}
                        >
                            <div
                                style={{
                                    display: 'grid',
                                    opacity: opacity,
                                    width: '100%',
                                    gridTemplateColumns: '1fr 1fr 1fr',
                                    gap: '1rem',
                                    transition: 'all 1s ease-in',
                                    padding: '1rem',
                                    boxShadow: '3px 5px 6px rgba(0,0,0,0.236)',
                                    borderRadius: '0px 0px 25px 25px',
                                }}
                            >
                                <div
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        width: '50rem',
                                    }}
                                >
                                    <p style={{ paddingTop: '10px' }}>
                                        Verizon Forward provides qualifying
                                        customers with Verizon Home Internet
                                        services at a discounted price. If you
                                        participate in certain Federal
                                        Assistance programs such as SNAP, you
                                        may qualify for the Verizon Forward
                                        discount.
                                    </p>
                                    <div
                                        onClick={() =>
                                            window.open(
                                                'https://www.verizon.com/discounts/verizon-forward/?cmp=KNC_H_P_COE_GAW_FiOS_99_99_BP-9122&abr=CMOGBRPLUS&c=A005126&kpid=go_cmp-15621458569_adg-162371263185_ad-700875548523_kwd-1603736523561_dev-c_ext-_prd-_sig-CjwKCAjwm_SzBhAsEiwAXE2Cv_TxmmZs3wvkhD24qHz2sBgGRDfol6EKrjqp_BYT_t96AVbHiA9InBoCPp0QAvD_BwE&utm_source=google&gad_source=1&gclid=CjwKCAjwm_SzBhAsEiwAXE2Cv_TxmmZs3wvkhD24qHz2sBgGRDfol6EKrjqp_BYT_t96AVbHiA9InBoCPp0QAvD_BwE'
                                            )
                                        }
                                        style={{
                                            backgroundColor: '#373232',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            padding: '0.7rem 1rem',
                                            marginTop: '1.5rem',
                                            alignSelf: 'center',
                                            borderRadius: '35px',
                                            width: '20rem',
                                            maxWidth: '15rem',
                                            cursor: 'pointer',
                                            boxShadow: '-3px 6px 6px #4b3a3a27',
                                        }}
                                    >
                                        <p
                                            style={{
                                                fontWeight: 'bold',
                                                color: '#fff',
                                            }}
                                        >
                                            Get Started
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div
                                style={{
                                    display: 'flex',
                                    width: '100%',
                                    flex: 1,
                                    flexDirection: 'column',
                                    margin: '10px auto',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <h3>
                                    Fios Forward with ACP provides a truly FREE
                                    home internet service:
                                </h3>
                                <div
                                    style={{
                                        width: '100%',

                                        display: 'flex',
                                        justifyContent: 'center',
                                        gap: '1rem',
                                        paddingTop: '12px',
                                    }}
                                >
                                    <p>No taxes or fees</p>
                                    <p>Deposit Waived</p>
                                    <p>No service charges</p>
                                    <p>No equipment charges</p>
                                    <p>Autopay not required</p>
                                </div>
                            </div>
                        </div>

                        <div
                            style={{
                                display: 'flex',
                                padding: '10px',

                                gap: '1rem',
                                alignItems: 'center',
                                flexDirection: 'column',
                            }}
                        >
                            <div style={{ width: '80vw', padding: '10px' }}>
                                <h3 style={{ textAlign: 'center' }}>
                                    {' '}
                                    Savings
                                </h3>
                                <div
                                    style={{
                                        padding: '10px',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',

                                        width: '100%',
                                    }}
                                >
                                    {fiosAutoPay === 10 && (
                                        <p
                                            style={{
                                                color: '#ad4a4a',
                                                padding: '0px 10px',
                                            }}
                                        >
                                            <b>Auto Pay:</b>
                                            $10 for Auto Pay
                                        </p>
                                    )}
                                    {isFiosFirstResponder && (
                                        <p
                                            style={{
                                                color: '#ad4a4a',
                                                padding: '0px 10px',
                                            }}
                                        >
                                            Up to $15
                                        </p>
                                    )}

                                    {hasWireless && (
                                        <div
                                            style={{
                                                display: 'flex',

                                                alignItems: 'center',
                                            }}
                                        >
                                            <p
                                                style={{
                                                    color: '#ad4a4a',
                                                }}
                                            >
                                                <b>Mobile + Home 3.0, Up to</b>
                                            </p>
                                            <p
                                                style={{
                                                    color: '#ad4a4a',
                                                    padding: '0px 10px',
                                                }}
                                            >
                                                {isUnlimited ? '$25' : '$10'}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div
                                style={{ cursor: 'pointer' }}
                                onClick={() => dispatch(fiosReset())}
                            >
                                <p
                                    style={{
                                        color: '#445cc4',
                                        fontWeight: 'bold',
                                    }}
                                >
                                    Start Over
                                </p>
                            </div>
                        </div>
                    </div>
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <div>
                        <Head>
                            <title>Fios TV</title>
                        </Head>
                        <div>
                            <h2
                                style={{
                                    textAlign: 'center',
                                    padding: '1.3rem',
                                }}
                            >
                                Thank you for in interest in Fios TV
                            </h2>
                            <Switcher
                                text={'Auto Pay'}
                                value={tvAutoPay}
                                checked={tvAutoPay}
                                onChange={() => setTvAutoPay((prev) => !prev)}
                            />
                        </div>

                        <div
                            style={{
                                display: 'flex',
                                marginTop: '6px',
                                width: '100%',
                                margin: '0 auto',
                                justifyContent: 'center',
                                gap: '12px',
                            }}
                        >
                            {tvPlans.map((plan) => (
                                <TvCard
                                    perk={plan.perk}
                                    id={plan.id}
                                    subtitle={plan.subtitle}
                                    key={plan.id}
                                    price={plan.price - (tvAutoPay ? 10 : 0)}
                                    title={plan.name}
                                    details={plan.details}
                                />
                            ))}
                        </div>

                        <div
                            style={{
                                display: 'flex',
                                padding: '2rem',
                                justifyContent: 'center',
                                alignItems: 'center',
                                flexDirection: 'column',
                            }}
                        >
                            <h2>Fios TV Plans</h2>
                            <p style={{ padding: '1rem', fontSize: '1.2rem' }}>
                                Pick the package that works for you. And with no
                                surcharges, broadcast, regional sports network
                                fees, the price is the price.
                            </p>
                            <img
                                style={{
                                    width: '200px',
                                    height: '100px',
                                    aspectRatio: 'auto',
                                }}
                                src="https://ss7.vzw.com/is/image/VerizonWireless/fios-mixnmatch-200-062221-d?scl=1&extend=300,135,300,135&&bgc=f6f6f6"
                            />
                        </div>
                        <div>
                            <p
                                style={{
                                    padding: '12px 0px',
                                    fontSize: '1.1rem',
                                    fontWeight: 'bold',
                                }}
                            >
                                {' '}
                                Things you should know.
                            </p>
                            <p>
                                Fios TV Test Drive, You have access to all 425+
                                channels for 60 days with Test Drive. After 30
                                days we'll recommend a plan for you based on
                                your preferences. After the 60 days, you can
                                choose either the recommended plan or a
                                different one.
                            </p>
                        </div>
                    </div>
                </TabPanel>
            </div>
            <MyAlert
                open={showAlert}
                onClick={() => setShowAlert(false)}
                title={alertTitle}
                message={alertMessage}
            />
        </MainContainer>
    );
};

export default Plans;
