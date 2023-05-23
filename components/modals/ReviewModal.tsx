import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Fade from '@mui/material/Fade';
import Modal from '@mui/material/Modal';
import { useAppDispatch, useAppSelector } from '../../redux/hooks/reduxHooks';
import { setReviewModal } from '../../redux/wirelessSlide';
import TotalView from '../TotalView';

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
                                    // flex: 0.3,
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
                        <Box
                            justifyContent={'center'}
                            mt={2}
                            display={'flex'}
                            alignItems={'center'}
                            width={'100%'}
                        >
                            <Button
                                onClick={() => {
                                    alert(
                                        'Glad you want to save it but this function is not implemented yet. Please contact us for more information. Thank you for your patience. :)'
                                    );
                                }}
                                variant="contained"
                            >
                                Save Quote
                            </Button>
                        </Box>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
};

export default ReviewModal;
