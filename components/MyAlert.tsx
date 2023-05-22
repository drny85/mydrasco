import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from '@mui/material';
import React from 'react';

type Props = {
    open: boolean;
    title: string;
    message: string;
    onClick: (value: boolean) => void;
};

function MyAlert({ open, title, message, onClick }: Props) {
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
                <Button onClick={() => onClick(false)} autoFocus>
                    Ok, Got it!
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default MyAlert;
