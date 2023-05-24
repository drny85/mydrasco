import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Fade from '@mui/material/Fade';
import Modal from '@mui/material/Modal';
import { useAppDispatch, useAppSelector } from '../../redux/hooks/reduxHooks';
import { setReviewModal } from '../../redux/wirelessSlide';
import TotalView from '../TotalView';
import { Quote } from '../../redux/quotesSlide';
import { v4 } from 'uuid';
import { useState } from 'react';
import { TextField } from '@mui/material';
import { isEmailValid } from '../../utils/isEmailValid';
import { db } from '../../firebase';
import { toast } from 'react-toastify';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 18,

    p: 3,
};

const ReviewModal = () => {
    const theme = useAppSelector((s) => s.theme);
    const userId = useAppSelector((s) => s.auth.user?.id);
    const dispatch = useAppDispatch();
    const { lines, expressHasFios, expressInternet, reviewModal } =
        useAppSelector((s) => s.wireless);
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [customerName, setCustomerName] = useState('');

    const saveQuote = async () => {
        if (!userId) return;
        if (!isEmailValid(email)) {
            toast.error('Please enter a valid email');
            return;
        }
        if (customerName.length < 2) {
            toast.error('Please enter a valid name');
            return;
        }
        try {
            const newQuote: Quote = {
                id: v4(),
                userId,
                lines,
                status: 'pending',
                hasFios: expressHasFios,
                hasGig: expressInternet === 'gig',
                email: email,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                message: message,
                customerName,
            };

            await db.collection('quotes').add({ ...newQuote });
            toast.success('Quote saved successfully');
            dispatch(setReviewModal());
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong');
        }
    };
    const setOpen = () => {
        if (reviewModal === 'review') {
            dispatch(setReviewModal('quote'));
        } else if (reviewModal === 'quote') {
            dispatch(setReviewModal('review'));
        } else {
            dispatch(setReviewModal());
        }
    };
    return (
        <div>
            {reviewModal === 'review' ? (
                <Modal
                    open={reviewModal === 'review'}
                    onClose={() => dispatch(setReviewModal('quote'))}
                    closeAfterTransition
                >
                    <Fade in={reviewModal === 'review'}>
                        <Box
                            width={{ xs: '90%', md: '70%' }}
                            //height={{ xs: '90%', md: '80%' }}
                            maxWidth={'880px'}
                            maxHeight={{ xs: '90%', md: '85%' }}
                            overflow={'auto'}
                            borderRadius={2}
                            sx={{
                                ...style,
                                backgroundColor: theme.BACKGROUND_COLOR,
                            }}
                        >
                            <div
                                style={{
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    flex: 1,
                                }}
                            >
                                <Button
                                    sx={{
                                        position: 'absolute',
                                        top: '1.5rem',
                                        right: '1.5rem',
                                    }}
                                    onClick={() => dispatch(setReviewModal())}
                                    variant="text"
                                >
                                    Close
                                </Button>
                                <div
                                    style={{
                                        flex: 0.7,
                                        display: 'flex',
                                        flexDirection: 'column',
                                    }}
                                >
                                    <h3
                                        style={{
                                            textAlign: 'center',
                                        }}
                                    >
                                        Order Review
                                    </h3>

                                    <Box my={2}>
                                        <h4 style={{ textAlign: 'center' }}>
                                            {lines.length}{' '}
                                            {lines.length > 1
                                                ? 'Lines'
                                                : 'Line'}
                                        </h4>
                                    </Box>
                                    <Box>
                                        {lines.map((line, index) => {
                                            return (
                                                <Box
                                                    sx={{
                                                        boxShadow:
                                                            '0px 0px 5px #ccc',
                                                    }}
                                                    p={2}
                                                    borderRadius={2}
                                                    key={line.id}
                                                >
                                                    <Box
                                                        sx={{
                                                            display: 'flex',
                                                            justifyContent:
                                                                'space-between',
                                                        }}
                                                    >
                                                        <h3>
                                                            {' '}
                                                            {index + 1} -{' '}
                                                            {line.name}
                                                        </h3>

                                                        <h3>${line.price}</h3>
                                                    </Box>
                                                    <Box p={1}>
                                                        {line.perks
                                                            .filter(
                                                                (perk) =>
                                                                    perk.selected
                                                            )
                                                            .map((p, i) => (
                                                                <Box
                                                                    my={1}
                                                                    display={
                                                                        'flex'
                                                                    }
                                                                    justifyContent={
                                                                        'space-between'
                                                                    }
                                                                    key={i}
                                                                >
                                                                    <p
                                                                        style={{
                                                                            fontSize:
                                                                                '0.8rem',
                                                                            textTransform:
                                                                                'capitalize',
                                                                        }}
                                                                    >
                                                                        {i + 1}.{' '}
                                                                        {p.name}{' '}
                                                                    </p>
                                                                    <Box
                                                                        display={
                                                                            'flex'
                                                                        }
                                                                    >
                                                                        <p
                                                                            style={{
                                                                                fontSize:
                                                                                    '0.8rem',
                                                                                marginRight:
                                                                                    '0.5rem',
                                                                                fontStyle:
                                                                                    'italic',
                                                                            }}
                                                                        >
                                                                            (value
                                                                            $
                                                                            {''}
                                                                            {
                                                                                p.value
                                                                            }
                                                                            )
                                                                        </p>
                                                                        <p>
                                                                            $
                                                                            {
                                                                                p.price
                                                                            }
                                                                        </p>
                                                                    </Box>
                                                                </Box>
                                                            ))}
                                                    </Box>
                                                </Box>
                                            );
                                        })}
                                    </Box>
                                </div>
                                <div
                                    style={{
                                        // flex: 0.3,
                                        width: '100%',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                    }}
                                >
                                    <Box width={'100%'} mb={2}>
                                        <TotalView
                                            lines={lines}
                                            modalView={true}
                                        />
                                    </Box>
                                </div>
                            </div>
                            <Box
                                justifyContent={'center'}
                                mt={2}
                                display={'flex'}
                                alignItems={'center'}
                                width={'100%'}
                            >
                                <Button onClick={setOpen} variant="contained">
                                    Save Quote
                                </Button>
                            </Box>
                        </Box>
                    </Fade>
                </Modal>
            ) : (
                <Modal
                    open={reviewModal === 'quote'}
                    onClose={() => dispatch(setReviewModal())}
                    closeAfterTransition
                >
                    <Fade in={reviewModal === 'quote'}>
                        <Box
                            width={{ xs: '90%', md: '70%' }}
                            //height={{ xs: '90%', md: '80%' }}
                            maxWidth={'880px'}
                            maxHeight={{ xs: '90%', md: '85%' }}
                            overflow={'auto'}
                            borderRadius={2}
                            sx={{
                                ...style,
                                backgroundColor: theme.BACKGROUND_COLOR,
                            }}
                        >
                            <div
                                style={{
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    flex: 1,
                                }}
                            >
                                <Button
                                    sx={{
                                        position: 'absolute',
                                        top: '1.5rem',
                                        right: '1.5rem',
                                    }}
                                    onClick={() => dispatch(setReviewModal())}
                                    variant="text"
                                >
                                    Close
                                </Button>
                                <div
                                    style={{
                                        flex: 0.7,
                                        display: 'flex',
                                        flexDirection: 'column',
                                    }}
                                >
                                    <h3
                                        style={{
                                            textAlign: 'center',
                                        }}
                                    >
                                        Saving Quote
                                    </h3>
                                </div>
                                <Box>
                                    <TextField
                                        fullWidth
                                        sx={{ margin: '0.5rem 0' }}
                                        placeholder="Please type customer's name"
                                        label="Customer's Name"
                                        value={customerName}
                                        autoCapitalize="words"
                                        type="text"
                                        onChange={(e) =>
                                            setCustomerName(e.target.value)
                                        }
                                        variant="outlined"
                                    />
                                    <TextField
                                        fullWidth
                                        sx={{ margin: '2rem 0' }}
                                        placeholder="Please enter an email"
                                        label="Email Address"
                                        value={email}
                                        autoCapitalize={'none'}
                                        type="email"
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                        variant="outlined"
                                    />
                                </Box>
                            </div>
                            <Box
                                justifyContent={'center'}
                                mt={2}
                                display={'flex'}
                                alignItems={'center'}
                                width={'100%'}
                            >
                                <Button
                                    sx={{ width: '60%' }}
                                    onClick={saveQuote}
                                    variant="contained"
                                >
                                    Save
                                </Button>
                            </Box>
                        </Box>
                    </Fade>
                </Modal>
            )}
        </div>
    );
};

export default ReviewModal;
