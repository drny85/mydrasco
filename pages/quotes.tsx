import React, { useEffect } from 'react';
import MainContainer from '../components/MainContainer';
import {
    Box,
    Button,
    List,
    ListItem,
    ListItemText,
    Paper,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '../redux/hooks/reduxHooks';
import Login from '.';
import { Quote } from '../redux/quotesSlide';
import { db } from '../firebase';
import { useRouter } from 'next/router';
import moment from 'moment';
import { setLinesData } from '../redux/wirelessSlide';

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
            const data = q.docs.map((doc) => ({ ...(doc.data() as Quote) }));
            setQuotes(data);
        } catch (error) {
            console.log(error);
        }
    };
    const goToQuote = (q: Quote) => {
        dispatch(setLinesData(q.lines));
        onGoBack();
    };

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
                        <List
                            sx={{
                                width: '100%',
                            }}
                        >
                            {quotes.map((quote, index) => (
                                <ListItem
                                    onClick={() => goToQuote(quote)}
                                    sx={{ cursor: 'pointer', margin: '1rem 0' }}
                                    key={quote.id}
                                >
                                    <Box
                                        display={'flex'}
                                        width={'100%'}
                                        px={3}
                                        py={2}
                                        borderRadius={1}
                                        boxShadow={
                                            '0px 0px 10px rgba(0,0,0,0.3)'
                                        }
                                        alignItems={'center'}
                                        justifyContent={'space-between'}
                                    >
                                        <h3>
                                            {index + 1} - {quote.customerName}
                                        </h3>
                                        <p>
                                            {moment(quote.createdAt).format(
                                                'lll'
                                            )}
                                        </p>
                                    </Box>
                                </ListItem>
                            ))}
                        </List>
                    </Box>
                </div>
            </div>
        </MainContainer>
    );
};

export default Quotes;
