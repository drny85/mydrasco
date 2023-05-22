import React, { useState } from 'react';
import { motion } from 'framer-motion';
import MainContainer from './MainContainer';
import Head from 'next/head';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

import { useAppSelector } from '../redux/hooks/reduxHooks';

const MobileHome = () => {
    const [service, setService] = useState<'fios' | 'wireless' | null>(null);
    const [wirelessPlan, setWirelessPlan] = useState<
        | '5G Start'
        | '5G Do More'
        | '5G Play More'
        | '5G Get More'
        | 'Other'
        | null
    >(null);
    const [internet, setInternet] = useState<'300' | '500' | '1GB' | null>(
        null
    );
    const theme = useAppSelector((state) => state.theme);

    const handleSubmit = () => {
        if (
            (service === null && internet === null) ||
            (service === null && wirelessPlan === null)
        )
            return;

        window.open(
            'https://www.verizon.com/digital/nsa/secure/ui/mhdiscount/#/landing'
        );
    };
    return (
        <MainContainer>
            <Head>
                <title>Mobile + Home</title>
            </Head>
            <div
                style={{
                    margin: '15px auto',
                    display: 'flex',
                    width: '100vh',
                    height: '100%',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    padding: '0px 20px',
                }}
            >
                <div
                    style={{
                        height: '100vh',
                        width: '100%',
                    }}
                >
                    <motion.h2
                        animate={{ opacity: 1, y: 4 }}
                        initial={{ opacity: 0, y: -200 }}
                        transition={{ type: 'spring', duration: 1.2 }}
                        style={{
                            padding: '2rem',
                            textAlign: 'center',
                            fontSize: '2.1rem',
                        }}
                    >
                        Thanks for being part of the Verizon Family
                    </motion.h2>
                    <motion.div
                        initial={{ x: -300, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{
                            type: 'spring',
                            delay: 0.8,
                            duration: 1.5,
                        }}
                    >
                        <p
                            style={{
                                textAlign: 'center',
                                padding: '1.2rem',
                                fontWeight: 'bold',
                                fontSize: '1.5rem',
                            }}
                        >
                            Please let us know which service did you just signed
                            up for.
                        </p>
                    </motion.div>
                    <motion.div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            minWidth: '60vw',
                            alignSelf: 'center',
                            width: '100%',
                        }}
                    >
                        <FormControl style={{ width: '300px' }}>
                            <InputLabel id="demo-simple-select-label">
                                Pick a Service
                            </InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={service}
                                label="Service"
                                onChange={(v) => {
                                    setService(
                                        v.target.value as
                                            | 'fios'
                                            | 'wireless'
                                            | null
                                    );
                                }}
                            >
                                <MenuItem value={'wireless'}>
                                    Verizon Wireless
                                </MenuItem>
                                <MenuItem value={'fios'}>
                                    Verizon Fios Internet
                                </MenuItem>
                            </Select>
                        </FormControl>
                    </motion.div>
                    <motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{
                                opacity: service !== null ? 1 : 0,
                                y: service !== null ? 0 : -20,
                            }}
                            transition={{
                                type: 'spring',
                                duration: 0.7,
                                delay: 0.6,
                            }}
                        >
                            {service === 'wireless' ? (
                                <motion.div>
                                    <motion.p
                                        style={{
                                            textAlign: 'center',
                                            padding: '1.1rem',
                                            fontStyle: 'italic',
                                            fontSize: '1.2rem',
                                        }}
                                    >
                                        This mean you are an existing Verizon
                                        Fios Customer!
                                    </motion.p>
                                    <motion.p
                                        style={{
                                            textAlign: 'center',
                                            padding: '1.2rem',
                                            fontWeight: 'bold',
                                            fontSize: '1.5rem',
                                        }}
                                    >
                                        Please tell us which internet you
                                        currently have.
                                    </motion.p>
                                    <motion.div
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            minWidth: '60vw',
                                            alignSelf: 'center',
                                            width: '100%',
                                        }}
                                    >
                                        <FormControl style={{ width: '300px' }}>
                                            <InputLabel id="demo-simple-select-label">
                                                Pick a Internet
                                            </InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={internet}
                                                label="Internet"
                                                onChange={(v) => {
                                                    setInternet(
                                                        v.target
                                                            .value as typeof internet
                                                    );
                                                }}
                                            >
                                                <MenuItem value={'300'}>
                                                    300 Mbps
                                                </MenuItem>
                                                <MenuItem value={'500'}>
                                                    500 Mbps
                                                </MenuItem>
                                                <MenuItem value={'1GB'}>
                                                    1 GB
                                                </MenuItem>
                                            </Select>
                                        </FormControl>
                                    </motion.div>
                                    <motion.div
                                        style={{
                                            boxShadow:
                                                '-4px -4px 6px 2px rgba(0,0,0,0.23)',
                                            borderRadius: '1rem',
                                            margin: '12px 0px',
                                        }}
                                        initial={{ opacity: 0, y: -20 }}
                                        animate={{
                                            opacity: internet !== null ? 1 : 0,
                                            y: internet !== null ? 2 : -20,
                                        }}
                                        transition={{ type: 'just' }}
                                    >
                                        <motion.p
                                            initial={{ opacity: 0, y: -20 }}
                                            animate={{
                                                opacity:
                                                    internet !== null ? 1 : 0,
                                                y: internet !== null ? 2 : -20,
                                            }}
                                            transition={{
                                                type: 'spring',
                                                duration: 0.5,
                                                delay: 0.3,
                                            }}
                                            style={{
                                                textAlign: 'center',
                                                padding: '1.2rem',
                                                fontStyle: 'italic',
                                                fontSize: '1.5rem',
                                                textDecoration: 'underline',
                                            }}
                                        >
                                            This is what we got so far based on
                                            your responses.
                                        </motion.p>
                                        <motion.p
                                            initial={{ opacity: 0, y: -20 }}
                                            animate={{
                                                opacity:
                                                    internet !== null ? 1 : 0,
                                                y: internet !== null ? 2 : -20,
                                            }}
                                            transition={{
                                                type: 'spring',
                                                duration: 0.5,
                                                delay: 0.3,
                                            }}
                                            style={{
                                                textAlign: 'center',
                                                padding: '0.5rem',
                                                fontStyle: 'italic',
                                                fontSize: '1.1rem',
                                            }}
                                        >
                                            1) - You are a current (
                                            {internet === '1GB'
                                                ? 'Gigabit'
                                                : `${internet} Mbps`}
                                            ) Verizon Fios Internet customer or
                                            just became one.
                                        </motion.p>
                                        <motion.p
                                            initial={{ opacity: 0, y: -20 }}
                                            animate={{
                                                opacity:
                                                    internet !== null ? 1 : 0,
                                                y: internet !== null ? 2 : -20,
                                            }}
                                            transition={{
                                                type: 'spring',
                                                duration: 0.5,
                                                delay: 0.6,
                                            }}
                                            style={{
                                                textAlign: 'center',
                                                padding: '0.6rem',
                                                fontStyle: 'italic',
                                                fontSize: '1.1rem',
                                            }}
                                        >
                                            2) - You just signed for Verizon
                                            Wireless and want to get your
                                            discount for being part of the
                                            family.
                                        </motion.p>
                                    </motion.div>
                                    <motion.div
                                        initial={{ opacity: 0, y: -20 }}
                                        animate={{
                                            opacity: internet !== null ? 1 : 0,
                                            y: internet !== null ? 2 : -20,
                                        }}
                                        style={{
                                            boxShadow:
                                                '-4px -4px 6px 2px rgba(0,0,0,0.23)',
                                            borderRadius: '1rem',
                                            margin: '12px 0px',
                                        }}
                                    >
                                        <motion.p
                                            style={{
                                                textAlign: 'center',
                                                padding: '0.5rem',
                                                fontStyle: 'italic',
                                                fontSize: '1.5rem',
                                                fontWeight: 'bold',
                                                textDecoration: 'underline',
                                            }}
                                        >
                                            Discount you might qualify for:
                                        </motion.p>
                                        <motion.p
                                            style={{
                                                textAlign: 'center',
                                                padding: '0.5rem',

                                                fontSize: '1.3rem',
                                            }}
                                        >
                                            {internet === '1GB'
                                                ? '$10 per line'
                                                : '$5 per line'}
                                        </motion.p>
                                        {internet && internet !== '1GB' && (
                                            <motion.p
                                                style={{
                                                    textAlign: 'center',
                                                    padding: '0.5rem',

                                                    fontSize: '1.1rem',
                                                }}
                                            >
                                                We strongly recommend you
                                                switching the 1 Gib Internet so
                                                you can get $10 per line
                                            </motion.p>
                                        )}
                                    </motion.div>
                                </motion.div>
                            ) : (
                                <motion.div>
                                    <motion.p
                                        style={{
                                            textAlign: 'center',
                                            padding: '1.2rem',
                                        }}
                                    >
                                        This mean you are an existing Verizon
                                        Wireless Customer!
                                    </motion.p>
                                    <motion.p
                                        style={{
                                            textAlign: 'center',
                                            padding: '1.2rem',
                                            fontWeight: 'bold',
                                            fontSize: '1.5rem',
                                        }}
                                    >
                                        Please tell us which Verizon Wireless
                                        Plan you currently have.
                                    </motion.p>
                                    <motion.div
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            minWidth: '60vw',
                                            alignSelf: 'center',
                                            width: '100%',
                                        }}
                                    >
                                        <FormControl style={{ width: '300px' }}>
                                            <InputLabel id="demo-simple-select-label">
                                                Pick a Plan
                                            </InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={wirelessPlan}
                                                label="Wireless Plan"
                                                onChange={(v) => {
                                                    setWirelessPlan(
                                                        v.target
                                                            .value as typeof wirelessPlan
                                                    );
                                                }}
                                            >
                                                <MenuItem value="5G Get More">
                                                    5G Get More
                                                </MenuItem>
                                                <MenuItem value="5G Play More">
                                                    5G Play More
                                                </MenuItem>
                                                <MenuItem value={'5G Do More'}>
                                                    5G Do More
                                                </MenuItem>
                                                <MenuItem value={'5G Start'}>
                                                    5G Start
                                                </MenuItem>
                                                <MenuItem value={'Other'}>
                                                    Other
                                                </MenuItem>
                                            </Select>
                                        </FormControl>
                                    </motion.div>
                                    <motion.div
                                        style={{
                                            boxShadow:
                                                '-4px -4px 6px 2px rgba(0,0,0,0.23)',
                                            borderRadius: '1rem',
                                            margin: '12px 0px',
                                        }}
                                        initial={{ opacity: 0, y: -20 }}
                                        animate={{
                                            opacity:
                                                wirelessPlan !== null ? 1 : 0,
                                            y: wirelessPlan !== null ? 2 : -20,
                                        }}
                                        transition={{ type: 'just' }}
                                    >
                                        <motion.p
                                            initial={{ opacity: 0, y: -20 }}
                                            animate={{
                                                opacity:
                                                    wirelessPlan !== null
                                                        ? 1
                                                        : 0,
                                                y:
                                                    wirelessPlan !== null
                                                        ? 2
                                                        : -20,
                                            }}
                                            transition={{
                                                type: 'spring',
                                                duration: 0.5,
                                                delay: 0.3,
                                            }}
                                            style={{
                                                textAlign: 'center',
                                                padding: '1.2rem',
                                                fontStyle: 'italic',
                                                fontSize: '1.5rem',
                                                textDecoration: 'underline',
                                            }}
                                        >
                                            This is what we got so far based on
                                            your responses.
                                        </motion.p>
                                        <motion.p
                                            initial={{ opacity: 0, y: -20 }}
                                            animate={{
                                                opacity:
                                                    wirelessPlan !== null
                                                        ? 1
                                                        : 0,
                                                y:
                                                    wirelessPlan !== null
                                                        ? 2
                                                        : -20,
                                            }}
                                            transition={{
                                                type: 'spring',
                                                duration: 0.5,
                                                delay: 0.3,
                                            }}
                                            style={{
                                                textAlign: 'center',
                                                padding: '0.5rem',
                                                fontStyle: 'italic',
                                                fontSize: '1.1rem',
                                            }}
                                        >
                                            1) - You are a current (
                                            {wirelessPlan}) Verizon Wireless
                                            customer or just became one.
                                        </motion.p>
                                        <motion.p
                                            initial={{ opacity: 0, y: -20 }}
                                            animate={{
                                                opacity:
                                                    wirelessPlan !== null
                                                        ? 1
                                                        : 0,
                                                y:
                                                    wirelessPlan !== null
                                                        ? 2
                                                        : -20,
                                            }}
                                            transition={{
                                                type: 'spring',
                                                duration: 0.5,
                                                delay: 0.6,
                                            }}
                                            style={{
                                                textAlign: 'center',
                                                padding: '0.6rem',
                                                fontStyle: 'italic',
                                                fontSize: '1.1rem',
                                            }}
                                        >
                                            2) - You just signed for Verizon
                                            Fios Internet and want to get your
                                            discount for being part of the
                                            family.
                                        </motion.p>
                                    </motion.div>
                                    <motion.div
                                        initial={{ opacity: 0, y: -20 }}
                                        animate={{
                                            opacity:
                                                wirelessPlan !== null ? 1 : 0,
                                            y: wirelessPlan !== null ? 2 : -20,
                                        }}
                                        style={{
                                            boxShadow:
                                                '-4px -4px 6px 2px rgba(0,0,0,0.23)',
                                            borderRadius: '1rem',
                                            margin: '12px 0px',
                                        }}
                                    >
                                        <motion.p
                                            style={{
                                                textAlign: 'center',
                                                padding: '0.5rem',
                                                fontStyle: 'italic',
                                                fontSize: '1.5rem',
                                                fontWeight: 'bold',
                                                textDecoration: 'underline',
                                            }}
                                        >
                                            Discount you might qualify for:
                                        </motion.p>
                                        <motion.p
                                            style={{
                                                textAlign: 'center',
                                                padding: '0.5rem',

                                                fontSize: '1.3rem',
                                            }}
                                        >
                                            {wirelessPlan === 'Other'
                                                ? '$10 off Internet'
                                                : '$25 off Internet'}
                                        </motion.p>
                                        {wirelessPlan &&
                                            wirelessPlan === 'Other' && (
                                                <motion.p
                                                    style={{
                                                        textAlign: 'center',
                                                        padding: '0.5rem',

                                                        fontSize: '1.1rem',
                                                    }}
                                                >
                                                    We strongly recommend you
                                                    switching to a Premium
                                                    Unlimited wireless plan to
                                                    get $25 off the internet
                                                </motion.p>
                                            )}
                                    </motion.div>
                                </motion.div>
                            )}

                            <motion.p
                                initial={{ opacity: 0, y: -20 }}
                                animate={{
                                    opacity: service !== null ? 1 : 0,
                                    y: service !== null ? 0 : -20,
                                }}
                                transition={{
                                    type: 'spring',
                                    duration: 0.7,
                                    delay: 0.6,
                                }}
                                style={{
                                    textAlign: 'center',
                                    padding: '1.5rem',
                                    fontStyle: 'italic',
                                }}
                            >
                                <span style={{ fontWeight: 'bold' }}>
                                    Note:{' '}
                                </span>
                                Keep in mind: It can take 1-2 billing periods
                                for your bill credits to appear.
                            </motion.p>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: '100vh' }}
                            animate={{
                                opacity:
                                    (service !== null && internet !== null) ||
                                    (service !== null && wirelessPlan !== null)
                                        ? 1
                                        : 0,
                                y:
                                    (service !== null && internet !== null) ||
                                    (service !== null && wirelessPlan !== null)
                                        ? 1
                                        : 0,
                            }}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexDirection: 'column',
                                height: '200px',
                                width: '100%',
                            }}
                        >
                            <div>
                                <motion.p
                                    style={{
                                        textAlign: 'left',
                                        padding: '12px 0px',
                                    }}
                                >
                                    • Log in to your Verizon account.
                                </motion.p>
                                <motion.p style={{ textAlign: 'left' }}>
                                    • Click ‘Join Now’.
                                </motion.p>
                                <motion.p
                                    style={{
                                        textAlign: 'left',
                                        padding: '6px 0px',
                                    }}
                                >
                                    {service === 'fios'
                                        ? ' • Make sure your internet is already installed'
                                        : ' • Make sure your Wireless service is already activated'}
                                </motion.p>
                            </div>

                            <motion.div
                                onClick={handleSubmit}
                                whileHover={{ scale: 1.05, opacity: 0.5 }}
                                style={{
                                    alignSelf: 'center',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    display: 'flex',
                                    margin: '1.5rem auto',
                                    cursor: 'pointer',
                                    borderRadius: '2rem',
                                    width: '100%',
                                    backgroundColor:
                                        theme.mode === 'dark'
                                            ? '#ffffff'
                                            : '#212121',
                                    maxWidth: '40vw',
                                    padding: '1rem 2rem',
                                }}
                            >
                                <motion.p
                                    style={{
                                        color:
                                            theme.mode === 'light'
                                                ? '#ffffff'
                                                : '#212121',
                                        fontWeight: 'bold',
                                    }}
                                >
                                    Enroll Now
                                </motion.p>
                            </motion.div>
                            <motion.div
                                onClick={() => {
                                    setInternet(null);
                                    setWirelessPlan(null);
                                    setService(null);
                                }}
                                whileHover={{ scale: 1.05, cursor: 'pointer' }}
                                style={{ margin: '1rem' }}
                            >
                                Start Over
                            </motion.div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </MainContainer>
    );
};

export default MobileHome;
