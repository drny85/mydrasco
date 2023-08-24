import { Box, Button, List, ListItem } from '@mui/material';
import moment from 'moment';
import React, { useEffect } from 'react';
import Login from '.';
import MainContainer from '../components/MainContainer';
import { db } from '../firebase';
import { useAppDispatch, useAppSelector } from '../redux/hooks/reduxHooks';
import { Quote } from '../redux/quotesSlide';
import {
    setExpressAutoPay,
    setExpressFirstResponder,
    setExpressHasFios,
    setExpressInternet,
    setLinesData,
    setReviewModal,
} from '../redux/wirelessSlide';
import QuotesData from '../components/QuotesData';

interface Props {
    onGoBack: () => void;
}
const Quotes = ({ onGoBack }: Props) => {
    const user = useAppSelector((s) => s.auth.user);

    const dispatch = useAppDispatch();
    const [quotes, setQuotes] = React.useState<Quote[]>([]);
    if (!user) return <Login />;

    const loadQuotes = async () => {
        try {
            const q = await db.collection('quotes').get();
            const data = q.docs.map((doc) => ({
                ...(doc.data() as Quote),
                id: doc.id,
            }));
            setQuotes(data);
        } catch (error) {
            console.log(error);
        }
    };
    const goToQuote = (quoteId: string) => {
        const q = quotes.find((q) => q.id === quoteId);
        if (!q) return;
        dispatch(setExpressAutoPay(q.isAutoPay ? 10 : 0));
        dispatch(setExpressFirstResponder(q.isFirstResponder));
        dispatch(setExpressHasFios(q.hasFios));
        dispatch(setExpressInternet(q.hasGig ? 'gig' : '200'));
        dispatch(setLinesData(q.lines));
        onGoBack();
    };

    useEffect(() => {
        loadQuotes();
    }, [user]);

    if (!quotes.length)
        return (
            <MainContainer>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        margin: '1rem auto',
                        justifyContent: 'center',
                        width: '100%',
                    }}
                >
                    <h2
                        style={{
                            textAlign: 'center',
                            marginBottom: '1rem',
                        }}
                    >
                        No Quotes Saved
                    </h2>
                </div>
            </MainContainer>
        );
    return (
        <MainContainer>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    margin: '1rem auto',
                    width: '100%',
                }}
            >
                <div>
                    <Box
                        minWidth={{
                            xs: '100%',
                            sm: '100%',
                            md: 500,
                            lg: '100%',
                            xl: '100%',
                        }}
                        display={'flex'}
                        justifyContent={'space-between'}
                        alignItems={'center'}
                    >
                        <Button variant="text" onClick={onGoBack}>
                            Back
                        </Button>
                        <h2
                            style={{
                                textAlign: 'center',
                                marginBottom: '1rem',
                            }}
                        >
                            Quotes
                        </h2>
                        <div></div>
                    </Box>

                    <Box width={'100%'}>
                        <QuotesData
                            onDelete={(id) => {
                                alert(id);
                            }}
                            onViewClick={(id) => goToQuote(id)}
                            onSummaryView={() => {
                                onGoBack();
                                dispatch(setReviewModal('review'));
                            }}
                        />
                    </Box>
                </div>
            </div>
            1
        </MainContainer>
    );
};

export default Quotes;
