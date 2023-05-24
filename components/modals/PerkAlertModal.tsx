import { Box, Button, Modal } from '@mui/material';
import React from 'react';
import { Perk } from '../PerksView';
import { useAppSelector } from '../../redux/hooks/reduxHooks';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,

    p: 4,
};

type Props = {
    onClose: () => void;
    open: boolean;
    perk: Perk;
    onSubmitted: () => void;
};

const PerkAlertModal = ({ onClose, open, perk, onSubmitted }: Props) => {
    const theme = useAppSelector((state) => state.theme);

    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box
                width={{ xs: '90%', md: '50%' }}
                borderRadius={4}
                sx={{ ...style, backgroundColor: theme.BACKGROUND_COLOR }}
            >
                <h3 style={{ textAlign: 'center', marginBottom: 12 }}>
                    Perk Warning
                </h3>
                <Box padding={4}>
                    <p style={{ fontSize: '1.2rem' }}>
                        {' '}
                        <span
                            style={{
                                fontWeight: 'bold',
                                textTransform: 'capitalize',
                            }}
                        >
                            {perk?.name}
                        </span>{' '}
                        is already included in another line and can be shared
                        with other family members
                    </p>
                    <p style={{ fontSize: '1.2rem', margin: '1.5rem 0' }}>
                        Do you want to add it to this line?
                    </p>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Button
                        sx={{ marginRight: 4 }}
                        variant="text"
                        onClick={onClose}
                    >
                        Cancel
                    </Button>
                    <Button
                        sx={{ marginLeft: 4 }}
                        variant="outlined"
                        onClick={onSubmitted}
                    >
                        Add It
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default PerkAlertModal;
