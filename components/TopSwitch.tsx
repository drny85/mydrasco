import { Grid } from '@mui/material';
import Switcher from './Switcher';
import { useAppDispatch, useAppSelector } from '../redux/hooks/reduxHooks';
import { AnimatePresence } from 'framer-motion';
import { motion } from 'framer-motion';
import {
    setExpressAutoPay,
    setExpressFirstResponder,
    setExpressHasFios,
    setExpressInternet,
    toggleIsWelcomeQualified,
} from '../redux/wirelessSlide';

const TopSwicher = () => {
    const theme = useAppSelector((state) => state.theme);
    const dispatch = useAppDispatch();
    const {
        expressAutoPay,
        expressHasFios,
        expressFirstResponder,
        expressInternet,
        isWelcomeQualified,
    } = useAppSelector((state) => state.wireless);
    return (
        <Grid
            style={{
                borderRadius: '1rem',
                backgroundColor: theme.BACKGROUND_COLOR,
                marginBottom: '.5rem',
                boxShadow:
                    '-4px 6px 8px 4px rgba(0, 0, 0, 0.10), 3px 8px 16px 4px rgba(0, 0, 0, 0.10),  3px 8px 16px 4px rgba(0, 0, 0, 0.10)',
            }}
            container
            padding={2}
            direction={'row'}
            justifyContent={'center'}
        >
            <Grid item>
                <Switcher
                    text={'Auto Pay & Paper-free billing'}
                    checked={expressAutoPay === 10}
                    value={expressAutoPay}
                    onChange={() => {
                        if (expressAutoPay === 0) {
                            dispatch(setExpressAutoPay(10));
                        } else {
                            dispatch(setExpressAutoPay(0));
                        }
                    }}
                />
            </Grid>
            <Grid item>
                <Switcher
                    text={'First Responder Discount'}
                    checked={expressFirstResponder}
                    value={expressFirstResponder}
                    onChange={() => {
                        if (isWelcomeQualified && expressFirstResponder) {
                            dispatch(toggleIsWelcomeQualified());
                        } else {
                            dispatch(
                                setExpressFirstResponder(!expressFirstResponder)
                            );
                        }
                    }}
                />
            </Grid>
            <Grid item>
                <Switcher
                    text={'Mobile + Home Discount'}
                    checked={expressHasFios}
                    value={expressHasFios}
                    onChange={() => {
                        if (expressHasFios) {
                            dispatch(setExpressInternet());
                        }

                        dispatch(setExpressHasFios(!expressHasFios));
                    }}
                />
                <AnimatePresence>
                    {expressHasFios && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <Switcher
                                text={'1 GIG Internet?'}
                                checked={expressInternet === 'gig'}
                                value={
                                    expressInternet === 'gig' ? 'gig' : '200'
                                }
                                onChange={() => {
                                    dispatch(
                                        setExpressInternet(
                                            expressInternet === 'gig'
                                                ? '200'
                                                : 'gig'
                                        )
                                    );
                                }}
                            />
                            <Switcher
                                text={'2 GIG Internet?'}
                                checked={expressInternet === '2gig'}
                                value={
                                    expressInternet === '2gig' ? 'gig' : '200'
                                }
                                onChange={() => {
                                    dispatch(
                                        setExpressInternet(
                                            expressInternet === '2gig'
                                                ? '200'
                                                : '2gig'
                                        )
                                    );
                                }}
                            />
                        </motion.div>
                    )}
                </AnimatePresence>
            </Grid>
        </Grid>
    );
};

export default TopSwicher;
