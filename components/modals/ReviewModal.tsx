import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useAppDispatch, useAppSelector } from '../../redux/hooks/reduxHooks';
import { setReviewModal } from '../../redux/wirelessSlide';
import TotalView from '../TotalView';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,

    p: 4,
};

const ReviewModal = () => {
    const open = useAppSelector((s) => s.wireless.reviewModal);
    const theme = useAppSelector((s) => s.theme);
    const dispatch = useAppDispatch();
    const lines = useAppSelector((s) => s.wireless.lines);
    const setOpen = () => {
        dispatch(setReviewModal(false));
    };
    return (
        <div>
            <Modal open={open} onClose={setOpen} closeAfterTransition>
                <Fade in={open}>
                    <Box
                        width={{ xs: '90%', md: '70%' }}
                        height={{ xs: '90%', md: '80%' }}
                        maxWidth={'880px'}
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
                                onClick={setOpen}
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
                                        {lines.length > 1 ? 'Lines' : 'Line'}
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
                                                <Box p={4}>
                                                    {line.perks
                                                        .filter(
                                                            (perk) =>
                                                                perk.selected
                                                        )
                                                        .map((p, i) => (
                                                            <Box
                                                                my={1}
                                                                display={'flex'}
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
                                                                        (value $
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
                                    flex: 0.3,
                                    width: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                }}
                            >
                                <Box width={'100%'} mb={2}>
                                    <TotalView lines={lines} modalView={true} />
                                </Box>
                            </div>
                        </div>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
};

export default ReviewModal;
