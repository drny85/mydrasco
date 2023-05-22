import Head from 'next/head';
import React, { useState } from 'react';
import home5GPlans from '../home5GPlans';
import Home5GCard from './Home5GCard';
import MainContainer from './MainContainer';
import Switcher from './Switcher';

import useMediaQuery from '@mui/material/useMediaQuery';
import { useAppDispatch, useAppSelector } from '../redux/hooks/reduxHooks';
import {
    switch5GWirelessPlan,
    toogle5GACP,
    toogle5GAutoPay,
    toogle5GHasWireless,
} from '../redux/home5GSlide';
import { Wireless_Plan } from '../redux/home5GSlide';
import { motion } from 'framer-motion';
import { Button, Typography } from '@mui/material';
type Props = {};

const Home5G = (props: Props) => {
    const matches = useMediaQuery('(min-width:600px)');
    const theme = useAppSelector((state) => state.theme);

    const dispatch = useAppDispatch();

    const {
        home5GACPCustomer,
        home5GAutoPay,
        home5GHasWireless,
        wirelessPlan,
    } = useAppSelector((state) => state.home5G);

    const resetAll = () => {
        if (home5GAutoPay) {
            dispatch(toogle5GAutoPay());
        }
        if (home5GHasWireless) {
            dispatch(toogle5GHasWireless());
            dispatch(switch5GWirelessPlan());
        }
    };
    return (
        <MainContainer>
            <Head>
                <title>5G Home Internet</title>
            </Head>
            <div
                style={{
                    margin: '15px auto',
                    display: 'flex',
                    width: '100%',
                    height: '100%',
                    flexDirection: 'column',
                    maxWidth: '1080px',
                    alignItems: 'center',
                    padding: '0px 20px',
                    // backgroundColor: 'red',
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        alignSelf: 'flex-end',
                        alignItems: 'center',
                    }}
                >
                    <Switcher
                        text={'Qualified ACP Customer?'}
                        value={home5GACPCustomer}
                        checked={home5GACPCustomer}
                        onChange={() => {
                            dispatch(toogle5GACP());
                        }}
                    />
                </div>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-evenly',
                        backgroundColor: theme.CARD_BACKGROUND,
                        margin: '0.8rem 0rem',
                        padding: '1rem',
                        borderRadius: '1rem',
                        width: '100%',
                    }}
                >
                    <Switcher
                        text={'Auto Pay'}
                        value={home5GAutoPay}
                        checked={home5GAutoPay}
                        savingText={home5GAutoPay ? 10 : 0}
                        saving={home5GAutoPay}
                        onChange={() => {
                            dispatch(toogle5GAutoPay());
                        }}
                    />
                    <Switcher
                        text={'Wireless Customer'}
                        value={home5GHasWireless}
                        checked={home5GHasWireless}
                        onChange={() => {
                            if (home5GHasWireless) {
                                dispatch(switch5GWirelessPlan());
                            }
                            dispatch(toogle5GHasWireless());
                        }}
                    />
                    {home5GHasWireless && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                        >
                            <h3 style={{ textAlign: 'center' }}>
                                Please pick your plan
                            </h3>
                            <div
                                style={{
                                    display: 'grid',
                                    gridTemplateColumns: '1fr 1fr',
                                }}
                            >
                                <Switcher
                                    text={'Welcome'}
                                    value={wirelessPlan === 'welcome'}
                                    checked={wirelessPlan === 'welcome'}
                                    onChange={() => {
                                        dispatch(
                                            switch5GWirelessPlan('welcome')
                                        );
                                    }}
                                />
                                <Switcher
                                    text={'5G Start'}
                                    value={wirelessPlan === 'start'}
                                    checked={wirelessPlan === 'start'}
                                    onChange={() => {
                                        dispatch(switch5GWirelessPlan('start'));
                                    }}
                                />
                                <Switcher
                                    text={'5G Play More'}
                                    value={wirelessPlan === 'play_more'}
                                    checked={wirelessPlan === 'play_more'}
                                    onChange={() => {
                                        dispatch(
                                            switch5GWirelessPlan('play_more')
                                        );
                                    }}
                                />
                                <Switcher
                                    text={'5G Do More'}
                                    value={wirelessPlan === 'do_more'}
                                    checked={wirelessPlan === 'do_more'}
                                    onChange={() => {
                                        dispatch(
                                            switch5GWirelessPlan('do_more')
                                        );
                                    }}
                                />
                                <Switcher
                                    text={'5G Get More'}
                                    value={wirelessPlan === 'get_more'}
                                    checked={wirelessPlan === 'get_more'}
                                    onChange={() => {
                                        dispatch(
                                            switch5GWirelessPlan('get_more')
                                        );
                                    }}
                                />
                                <Switcher
                                    text={'One Unlimited'}
                                    value={wirelessPlan === 'one_unlimited'}
                                    checked={wirelessPlan === 'one_unlimited'}
                                    onChange={() => {
                                        dispatch(
                                            switch5GWirelessPlan(
                                                'one_unlimited'
                                            )
                                        );
                                    }}
                                />
                            </div>
                        </motion.div>
                    )}
                </div>
                <div
                    style={{
                        display: 'flex',
                        maxWidth: '1280px',
                        justifyContent: 'center',
                    }}
                >
                    {home5GPlans.map((p) => (
                        <motion.div
                            style={{ flex: 1, display: 'flex' }}
                            whileHover={{
                                scale: 1.01,
                                backgroundColor: theme.PRIMARY_BUTTON_COLOR,
                            }}
                        >
                            <Home5GCard
                                key={p.id}
                                title={p.name}
                                subtitle={p.subtitle}
                                price={p.id === 'home' ? 60 : 80}
                                id={p.id}
                                details={p.details}
                            />
                        </motion.div>
                    ))}
                </div>
                {home5GACPCustomer && (
                    <motion.div
                        initial={{ opacity: 0, translateY: -10 }}
                        animate={{ opacity: 1, translateY: 0 }}
                        style={{
                            display: 'flex',
                            width: '100%',
                            marginTop: '12px',
                        }}
                    >
                        <div
                            style={{
                                backgroundColor: theme.CARD_BACKGROUND,
                                padding: '1rem',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexGrow: 1,
                                width: '100%',
                            }}
                        >
                            <h2 style={{ textAlign: 'center' }}>Step 1</h2>
                            <Typography variant="subtitle2" paddingY={2}>
                                Apply to the Affordable Connectivity Program by
                                clicking here.
                            </Typography>

                            <Button
                                sx={{
                                    alignSelf: 'center',
                                    color: theme.TEXT_COLOR,
                                    backgroundColor: theme.BACKGROUND_COLOR,
                                    fontWeight: 'bold',
                                }}
                                LinkComponent="a"
                                target={'_blank'}
                                href="https://www.affordableconnectivity.gov"
                                variant="contained"
                            >
                                Click Here
                            </Button>
                        </div>
                        <div
                            style={{
                                backgroundColor: theme.CARD_BACKGROUND,
                                padding: '1rem',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexGrow: 1,
                                width: '100%',
                            }}
                        >
                            <h2 style={{ textAlign: 'center' }}>Step 2</h2>
                            <Typography variant="subtitle2" paddingY={2}>
                                Order 5G Home Internet service for your home
                                with your EM.
                            </Typography>
                        </div>
                        <div
                            style={{
                                backgroundColor: theme.CARD_BACKGROUND,
                                padding: '1rem',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexGrow: 1,
                                width: '100%',
                            }}
                        >
                            <h2 style={{ textAlign: 'center' }}>Step 3</h2>
                            <Typography variant="subtitle2" paddingY={2}>
                                Once installed, call 1.800.922.0204 or click
                                down here to get the discounts applied to your
                                bill.
                            </Typography>

                            <Button
                                sx={{
                                    alignSelf: 'center',
                                    color: theme.TEXT_COLOR,
                                    backgroundColor: theme.BACKGROUND_COLOR,
                                    fontWeight: 'bold',
                                }}
                                LinkComponent="a"
                                target={'_blank'}
                                href="https://secure.verizon.com/signin?&goto=http%3A%2F%2Fmyvpostpay.verizonwireless.com%3A443%2Fui%2Facct%2Fao%2Facb%2F"
                                variant="contained"
                            >
                                Click Here
                            </Button>
                        </div>
                    </motion.div>
                )}

                <div
                    style={{
                        alignSelf: 'center',
                        height: '2rem',
                        marginTop: '1rem',
                    }}
                >
                    <Button onClick={resetAll} variant="outlined">
                        Reset All
                    </Button>
                </div>
            </div>
        </MainContainer>
    );
};

export default Home5G;
