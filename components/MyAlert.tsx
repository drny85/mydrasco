import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from '@mui/material';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks/reduxHooks';
import { toogleShake } from '../redux/wirelessSlide';

type Props = {
    open: boolean;
    title: string;
    message: string;
    onClick: (value: boolean) => void;
};

function MyAlert({ open, title, message, onClick }: Props) {
    const dispatch = useAppDispatch();
    const shake = useAppSelector((state) => state.wireless.shake);

    return (
        <Dialog
            open={open}
            onClose={() => onClick(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {message}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={() => {
                        onClick(false);
                        if (shake) {
                            dispatch(toogleShake());
                        }
                    }}
                    autoFocus
                >
                    Ok, Got it!
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default MyAlert;
