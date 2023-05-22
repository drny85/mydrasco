import { Button } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';
import MainContainer from '../components/MainContainer';

type Props = {};

export default function emailVerification({}: Props) {
    const router = useRouter();
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
                <h4 style={{ fontSize: '2rem', padding: '1rem' }}>
                    Thank you for creating your account
                </h4>
                <h2>Please check your email and verify it.</h2>
                <p style={{ margin: '1rem', fontSize: '1rem' }}>
                    Check in your spam or Junk folder
                </p>

                <Button
                    size="large"
                    variant="contained"
                    onClick={() => router.replace('/')}
                >
                    Login
                </Button>
            </div>
        </MainContainer>
    );
}
