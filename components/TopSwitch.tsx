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
} from '../redux/wirelessSlide';

const TopSwicher = () => {
    const theme = useAppSelector((state) => state.theme);
    const dispatch = useAppDispatch();
    const {
        expressAutoPay,
        expressHasFios,
        expressFirstResponder,
        expressInternet,
    } = useAppSelector((state) => state.wireless);
    return (
        <Grid
            style={{
                borderRadius: '1rem',
                backgroundColor: theme.BACKGROUND_COLOR,
                boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.25)',
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
                    onChange={() =>
                        dispatch(
                            setExpressFirstResponder(!expressFirstResponder)
                        )
                    }
                />
            </Grid>
            <Grid item>
                <Switcher
                    text={'Mobile + Home Discount'}
                    checked={expressHasFios}
                    value={expressHasFios}
                    onChange={() =>
                        dispatch(setExpressHasFios(!expressHasFios))
                    }
                />
                <AnimatePresence>
                    {expressHasFios && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <Switcher
                                text={'Gigabit Fios Internet?'}
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
                        </motion.div>
                    )}
                </AnimatePresence>
            </Grid>
        </Grid>
    );
};

export default TopSwicher;
