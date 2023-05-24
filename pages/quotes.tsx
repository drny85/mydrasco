import React, { useEffect } from 'react';
import MainContainer from '../components/MainContainer';
import { Box, List, ListItem, ListItemText, Paper } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../redux/hooks/reduxHooks';
import Login from '.';
import { Quote } from '../redux/quotesSlide';
import { db } from '../firebase';
import { useRouter } from 'next/router';

const Quotes = () => {
    const user = useAppSelector((s) => s.auth.user);

    const dispatch = useAppDispatch();
    const [quotes, setQuotes] = React.useState<Quote[]>([]);
    if (!user) return <Login />;

    const loadQuotes = async () => {
        try {
            const q = await db.collection('quotes').get();
            const data = q.docs.map((doc) => ({ ...(doc.data() as Quote) }));
            setQuotes(data);
        } catch (error) {
            console.log(error);
        }
    };
    const goToQuote = () => {};

    console.log(quotes);
    useEffect(() => {
        loadQuotes();
    }, [user]);
    return (
        <MainContainer>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    margin: '1rem auto',
                }}
            >
                <div>
                    <h2 style={{ textAlign: 'center', marginBottom: '1rem' }}>
                        Quotes
                    </h2>
                    <Paper
                        elevation={3}
                        sx={{ width: '100%', height: '100%', minWidth: '40vw' }}
                    >
                        <List>
                            {quotes.map((quote) => (
                                <ListItem
                                    onClick={goToQuote}
                                    sx={{ cursor: 'pointer' }}
                                    key={quote.id}
                                >
                                    <ListItemText
                                        primary={quote.customerName}
                                    />
                                </ListItem>
                            ))}
                        </List>
                    </Paper>
                </div>
            </div>
        </MainContainer>
    );
};

export default Quotes;
