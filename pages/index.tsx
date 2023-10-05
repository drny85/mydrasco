import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
    Button,
    FormControl,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import MainContainer from '../components/MainContainer';
import { isValidEmail } from '../utils/isValidEmail';
import { auth, db } from '../firebase';
import { useRouter } from 'next/router';

import { useAppDispatch, useAppSelector } from '../redux/hooks/reduxHooks';
import { AppUser, setUser } from '../redux/authSlide';
import { useAuth } from '../hooks/useAuth';
import MyAlert from '../components/MyAlert';

type Props = {};

function Login({}: Props) {
    const { user } = useAppSelector((state) => state.auth);
    const [agreed, setAgreed] = useState(false);
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState('');
    const [message, setMessage] = useState('');
    const router = useRouter();

    const { loading } = useAuth();
    const [email, setEmail] = useState('');
    const dispatch = useAppDispatch();
    const { replace } = useRouter();
    const [mode, setMode] = useState<'login' | 'signup'>('login');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        event.preventDefault();
    };

    const createUser = async (userData: AppUser) => {
        try {
            const u: AppUser = {
                ...userData,
            };
            await db
                .collection('users')
                .doc(userData.id)
                .set({ ...u });
        } catch (error) {
            console.log(error);
        }
    };

    // if (!user || !user.emailVerified) return <Plans />;

    const handleSubmit = async () => {
        try {
            if (!isValidEmail(email)) {
                setOpen(true);
                setMessage('Email is not valid');
                return;
            }

            if (password.length < 6) {
                setOpen(true);
                setMessage('Password must be at least 6 characters long');
                return;
            }
            if (mode === 'signup') {
                if (password !== confirm) {
                    setOpen(true);
                    setMessage('Password does not match');
                    return;
                }
                const { user } = await auth.createUserWithEmailAndPassword(
                    email,
                    password
                );
                if (user) {
                    user.sendEmailVerification();
                    const userData: AppUser = {
                        id: user.uid,
                        email: user.email!,
                        emailVerified: user.emailVerified,
                        createdAt: new Date().toISOString(),
                    };
                    await createUser(userData);
                    replace('/emailVerification');
                }
            } else if (mode === 'login') {
                const { user } = await auth.signInWithEmailAndPassword(
                    email,
                    password
                );
                if (!user) return;
                if (!user?.emailVerified) {
                    setOpen(true);
                    setMessage(
                        'Please verify your  email before signing in, Check your junk or spam folder'
                    );
                    return;
                }
                const userRef = await db
                    .collection('users')
                    .doc(user.uid)
                    .get();
                const data = userRef.data();
                const userData: AppUser = {
                    id: user.uid,
                    email: user.email!,
                    emailVerified: user.emailVerified,
                    lastLogin: new Date().toISOString(),
                    ...data,
                };
                await createUser(userData);
                dispatch(setUser(userData));
            }
        } catch (error) {
            const err = error as any;
            setOpen(true);
            setTitle('Error');
            setMessage(err.message);
            //alert(err.message);
        }
    };

    const toogle = () => {
        if (mode === 'login') {
            setMode('signup');
        } else {
            setMode('login');
        }
    };

    useEffect(() => {
        if (!user) return;
        if (user.emailVerified) replace('/home');
    }, [user]);

    useEffect(() => {
        const t = localStorage.getItem('agreed_terms');
        if (t !== null && t !== undefined) {
            const r = JSON.parse(t) as { agreed: boolean };
            console.log(t);
            if (r.agreed) {
                setAgreed(true);
            }
        }
    }, []);

    if (loading) return null;

    if (!agreed)
        return (
            <MainContainer>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: '100vw',
                        height: '100%',
                        margin: '3rem auto',
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: '2rem',
                    }}
                >
                    <h1>Disclaimer</h1>
                    <p
                        style={{
                            fontSize: '1.5rem',
                            lineHeight: 1.5,
                            padding: '1rem',
                        }}
                    >
                        Please be advised that this website is owned and
                        operated by Drasco, LLC, and is not an official website
                        of Verizon Communications Inc. The purpose of this
                        website is to provide information and resources to
                        Drasco employees for work-related purposes.
                    </p>
                    <p
                        style={{
                            fontSize: '1.5rem',
                            lineHeight: 1.5,
                            padding: '1rem',
                        }}
                    >
                        Access to this website is restricted to authorized
                        Drasco employees only. Any unauthorized access or use of
                        this website is strictly prohibited and may result in
                        disciplinary action or legal consequences.
                    </p>
                    <p
                        style={{
                            fontSize: '1.5rem',
                            lineHeight: 1.5,
                            padding: '1rem',
                        }}
                    >
                        The information and content provided on this website are
                        for informational purposes only and should not be
                        construed as legal or professional advice. Drasco makes
                        no representations or warranties of any kind, express or
                        implied, regarding the accuracy, reliability, or
                        completeness of the information provided on this
                        website.
                    </p>
                    <p
                        style={{
                            fontSize: '1.5rem',
                            lineHeight: 1.5,
                            padding: '1rem',
                        }}
                    >
                        By accessing and using this website, you agree to be
                        bound by these terms and conditions. If you do not agree
                        to these terms, please refrain from using this website.
                    </p>
                    <p
                        style={{
                            fontSize: '1.5rem',
                            lineHeight: 1.5,
                            padding: '1rem',
                            margin: '2rem',
                        }}
                    >
                        Thank you for your cooperation and understanding.
                    </p>
                    <Button
                        onClick={() => {
                            localStorage.setItem(
                                'agreed_terms',
                                JSON.stringify({ agreed: true })
                            );
                            setAgreed(true);
                        }}
                        size="large"
                        variant="contained"
                    >
                        Accept and Agree Terms
                    </Button>
                    <div style={{ marginTop: '20px' }}></div>
                </div>
            </MainContainer>
        );
    return (
        <MainContainer>
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto',
                    height: '100vh',
                    width: '100vw',
                    flexDirection: 'column',
                    maxWidth: '1080px',
                }}
            >
                <div
                    style={{
                        width: '100%',
                        maxWidth: '500px',
                        alignSelf: 'center',
                    }}
                >
                    <Typography
                        textAlign={'center'}
                        style={{ marginBottom: '2rem' }}
                        variant="h4"
                    >
                        {mode === 'login' ? 'Login' : 'Sign Up'}
                    </Typography>
                    <FormControl
                        sx={{ m: 1, width: '100%', marginBottom: '1.5rem' }}
                        variant="outlined"
                    >
                        <InputLabel htmlFor="outlined-adornment-password">
                            Email Address
                        </InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password8"
                            label="Email Address"
                            type="email"
                            value={email}
                            onChange={(e) =>
                                setEmail(e.target.value.toLowerCase())
                            }
                        />
                    </FormControl>
                    <FormControl
                        sx={{ m: 1, width: '100%' }}
                        variant="outlined"
                    >
                        <InputLabel htmlFor="outlined-adornment-password3">
                            Password
                        </InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type={showPassword ? 'text' : 'password'}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {showPassword ? (
                                            <VisibilityOff />
                                        ) : (
                                            <Visibility />
                                        )}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="Password"
                        />
                        {mode === 'login' && (
                            <div
                                onClick={() => router.push('/resetPassword')}
                                style={{
                                    display: 'flex',
                                    justifyContent: 'flex-end',
                                    paddingTop: '12px',
                                    cursor: 'pointer',
                                }}
                            >
                                Forgot password?
                            </div>
                        )}
                    </FormControl>
                    {mode === 'signup' && (
                        <FormControl
                            sx={{ m: 1, width: '100%' }}
                            variant="outlined"
                        >
                            <InputLabel htmlFor="outlined-adornment-password2">
                                Confirm Password
                            </InputLabel>
                            <OutlinedInput
                                color="success"
                                id="outlined-adornment-password9"
                                value={confirm}
                                onChange={(e) => setConfirm(e.target.value)}
                                type={showPassword ? 'text' : 'password'}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={
                                                handleMouseDownPassword
                                            }
                                            edge="end"
                                        >
                                            {showPassword ? (
                                                <VisibilityOff />
                                            ) : (
                                                <Visibility />
                                            )}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Confirm Password"
                            />
                        </FormControl>
                    )}
                </div>
                <Box
                    alignItems={'center'}
                    justifyContent="center"
                    alignSelf={'center'}
                >
                    <Button
                        onClick={handleSubmit}
                        size="large"
                        style={{ marginTop: '2rem' }}
                        variant="contained"
                    >
                        {mode === 'login' ? 'Login' : 'Sign Up'}
                    </Button>
                </Box>
                <div style={{ cursor: 'pointer' }} onClick={toogle}>
                    {mode === 'login' ? (
                        <p style={{ margin: '2rem' }}>
                            Do not have an account{' '}
                            <b
                                style={{
                                    textDecoration: 'underline',
                                    paddingLeft: '8px',
                                }}
                            >
                                Create One
                            </b>
                        </p>
                    ) : (
                        <p style={{ margin: '2rem' }}>
                            Have an account?{' '}
                            <b
                                style={{
                                    textDecoration: 'underline',
                                    paddingLeft: '8px',
                                }}
                            >
                                Sign in
                            </b>
                        </p>
                    )}
                </div>
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

export default Login;
