import { Button, TextField } from '@mui/material';
import { margin } from '@mui/system';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import MainContainer from '../components/MainContainer';
import MyAlert from '../components/MyAlert';
import { auth } from '../firebase';
import { isValidEmail } from '../utils/isValidEmail';

type Props = {};

export default function resetPassword({}: Props) {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [open, setOpen] = useState(false);
    const [title, setTtitle] = useState('Error');
    const [message, setMessage] = useState('');
    const handleReset = async () => {
        try {
            if (!isValidEmail(email)) {
                setOpen(true);
                setTtitle('Email error');
                setMessage('Invalid email');
                return;
            }
            await auth.sendPasswordResetEmail(email);
            router.back();
        } catch (error) {
            const err = error as any;
            setOpen(true);
            setMessage(err.message);
        }
    };
    return (
        <MainContainer>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                    height: '100vh',
                    width: '100vw',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <h1 style={{ margin: '2rem' }}>Reset Password</h1>

                <TextField
                    label="Email Address"
                    value={email}
                    style={{ width: '60%', maxWidth: '500px' }}
                    onChange={(e) => setEmail(e.target.value.toLowerCase())}
                />

                <Button
                    onClick={handleReset}
                    style={{ marginTop: '1.5rem' }}
                    size="large"
                    variant="contained"
                >
                    Reset
                </Button>
            </div>
            <MyAlert
                open={open}
                message={message}
                title={title}
                onClick={() => {
                    setOpen(false);
                }}
            />
        </MainContainer>
    );
}
