import { Box, Grid } from '@mui/material';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks/reduxHooks';
import { perks } from '../perks';
import HoverElement from './HoverElement';
import {
    setExpressAutoPay,
    setGetStarted,
    setLinesData,
} from '../redux/wirelessSlide';
import { v4 } from 'uuid';

type Props = {};

const PopularPlans = (props: Props) => {
    const theme = useAppSelector((s) => s.theme);
    const lines = useAppSelector((s) => s.wireless.lines);
    const dispatch = useAppDispatch();

    return (
        <Grid container width={'100%'} spacing={2} sx={{ cursor: 'pointer' }}>
            <Grid
                onClick={() => {
                    dispatch(setExpressAutoPay(10));
                    dispatch(
                        setLinesData([
                            ...lines,
                            {
                                id: v4(),
                                name: 'Unlimited Plus',
                                price: 80,
                                byod: false,
                                perks: [
                                    ...perks.map((p) =>
                                        p.name === 'disney bundle' ||
                                        p.name === '100 GB mobile hotspot'
                                            ? { ...p, selected: true }
                                            : p
                                    ),
                                ],
                            },
                        ])
                    );
                    dispatch(setGetStarted(true));
                }}
                item
                xs={12}
                sm={6}
                md={6}
                lg={6}
            >
                <HoverElement>
                    <Box
                        borderRadius={2}
                        justifyContent="center"
                        bgcolor={theme.mode === 'dark' ? '#ffffff' : '#333'}
                        alignItems="center"
                        display="flex"
                        width={'100%'}
                        boxShadow={'0px 0px 10px rgba(0,0,0,0.1)'}
                        padding={2}
                        minWidth={300}
                        flexDirection="column"
                        p={2}
                    >
                        <Box
                            display={'flex'}
                            width={'100%'}
                            justifyContent={'space-between'}
                        >
                            <h2
                                style={{
                                    color:
                                        theme.mode === 'dark'
                                            ? '#333'
                                            : '#ffffff',
                                }}
                            >
                                Unlimited Plus
                            </h2>
                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'flex-end',
                                }}
                            >
                                <h2
                                    style={{
                                        color:
                                            theme.mode === 'dark'
                                                ? '#333'
                                                : '#ffffff',
                                    }}
                                >
                                    $100/mo
                                </h2>
                                <span
                                    style={{
                                        marginLeft: '0.5rem',
                                        fontSize: '0.8rem',
                                        color:
                                            theme.mode === 'dark'
                                                ? '#333'
                                                : '#ffffff',
                                    }}
                                >
                                    w/auto pay
                                </span>
                            </div>
                        </Box>

                        <p
                            style={{
                                color:
                                    theme.mode === 'dark' ? '#333' : '#ffffff',
                                margin: '1rem 0',
                            }}
                        >
                            If you love movies, series & more.
                        </p>
                        <Box ml={1}>
                            <li
                                style={{
                                    color:
                                        theme.mode === 'dark'
                                            ? '#33333340'
                                            : '#ffffff',
                                    margin: '0.5rem 0',
                                    fontSize: '0.8rem',
                                }}
                            >
                                5G Ultra Wideband
                            </li>
                            <li
                                style={{
                                    color:
                                        theme.mode === 'dark'
                                            ? '#333'
                                            : '#ffffff',
                                    margin: '0.5rem 0',
                                    fontSize: '0.8rem',
                                }}
                            >
                                30 GB premium mobile hotspot data
                            </li>
                        </Box>
                        <Box
                            display={'flex'}
                            height={'150px'}
                            width={'100%'}
                            mt={1}
                            justifyContent={'space-around'}
                        >
                            <div style={{ position: 'relative', width: '46%' }}>
                                <img
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        borderRadius: '1rem',
                                        objectFit: 'cover',
                                        //marginRight: '0.3rem',
                                    }}
                                    src={
                                        perks.find(
                                            (p) => p.name === 'disney bundle'
                                        )?.image
                                    }
                                    alt="disney plus"
                                />
                                <p
                                    style={{
                                        color:
                                            theme.mode === 'dark'
                                                ? '#333'
                                                : '#ffffff',
                                        margin: '0.5rem 0',
                                        fontSize: '1rem',
                                        fontWeight: 'bold',
                                        position: 'absolute',
                                        left: 10,
                                        top: 10,
                                        zIndex: 10,
                                    }}
                                >
                                    Disney Plus
                                </p>
                            </div>
                            <div style={{ position: 'relative', width: '46%' }}>
                                <img
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        borderRadius: '1rem',
                                        objectFit: 'cover',
                                        //marginLeft: '0.3rem',
                                    }}
                                    src={
                                        perks.find(
                                            (p) =>
                                                p.name ===
                                                '100 GB mobile hotspot'
                                        )?.image
                                    }
                                    alt="mobile hostspot"
                                />
                                <div
                                    style={{
                                        margin: '0.5rem 0',
                                        fontSize: '1rem',
                                        fontWeight: 'bold',
                                        position: 'absolute',
                                        left: 10,
                                        top: 10,
                                        zIndex: 10,
                                    }}
                                >
                                    <p
                                        style={{
                                            color:
                                                theme.mode === 'dark'
                                                    ? '#333'
                                                    : '#ffffff',
                                        }}
                                    >
                                        100 GB
                                    </p>
                                    <p
                                        style={{
                                            color:
                                                theme.mode === 'dark'
                                                    ? '#333'
                                                    : '#ffffff',
                                        }}
                                    >
                                        Mobile
                                    </p>
                                    <p
                                        style={{
                                            color:
                                                theme.mode === 'dark'
                                                    ? '#333'
                                                    : '#ffffff',
                                        }}
                                    >
                                        Hotspot
                                    </p>
                                </div>
                            </div>
                        </Box>
                    </Box>
                </HoverElement>
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6}>
                <HoverElement>
                    <Box
                        onClick={() => {
                            dispatch(setExpressAutoPay(10));
                            dispatch(
                                setLinesData([
                                    ...lines,
                                    {
                                        id: v4(),
                                        name: 'Unlimited Plus',
                                        price: 80,
                                        byod: false,
                                        perks: [
                                            ...perks.map((p) =>
                                                p.name === 'apple one'
                                                    ? { ...p, selected: true }
                                                    : p
                                            ),
                                        ],
                                    },
                                ])
                            );
                            dispatch(setGetStarted(true));
                        }}
                        borderRadius={2}
                        justifyContent="center"
                        bgcolor={theme.mode === 'dark' ? '#ffffff' : '#333'}
                        alignItems="center"
                        display="flex"
                        width={'100%'}
                        boxShadow={'0px 0px 10px rgba(0,0,0,0.1)'}
                        padding={2}
                        minWidth={300}
                        flexDirection="column"
                        p={2}
                    >
                        <Box
                            display={'flex'}
                            width={'100%'}
                            justifyContent={'space-between'}
                        >
                            <h2
                                style={{
                                    color:
                                        theme.mode === 'dark'
                                            ? '#333'
                                            : '#ffffff',
                                }}
                            >
                                Unlimited Plus
                            </h2>
                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'flex-end',
                                }}
                            >
                                <h2
                                    style={{
                                        color:
                                            theme.mode === 'dark'
                                                ? '#333'
                                                : '#ffffff',
                                    }}
                                >
                                    $90/mo
                                </h2>
                                <span
                                    style={{
                                        marginLeft: '0.5rem',
                                        fontSize: '0.8rem',
                                        color:
                                            theme.mode === 'dark'
                                                ? '#333'
                                                : '#ffffff',
                                    }}
                                >
                                    w/auto pay
                                </span>
                            </div>
                        </Box>
                        <p
                            style={{
                                color:
                                    theme.mode === 'dark' ? '#333' : '#ffffff',
                                margin: '1rem 0',
                            }}
                        >
                            If you love your Apple favorites, all together.
                        </p>
                        <Box ml={1}>
                            <li
                                style={{
                                    color:
                                        theme.mode === 'dark'
                                            ? '#33333340'
                                            : '#ffffff',
                                    margin: '0.5rem 0',
                                    fontSize: '0.8rem',
                                }}
                            >
                                5G Ultra Wideband
                            </li>
                            <li
                                style={{
                                    color:
                                        theme.mode === 'dark'
                                            ? '#333'
                                            : '#ffffff',
                                    margin: '0.5rem 0',
                                    fontSize: '0.8rem',
                                }}
                            >
                                30 GB premium mobile hotspot data
                            </li>
                        </Box>
                        <Box
                            display={'flex'}
                            height={'150px'}
                            width={'100%'}
                            position={'relative'}
                            justifyContent={'space-around'}
                        >
                            <img
                                style={{
                                    width: '80%',
                                    height: '100%',
                                    borderRadius: '1rem',
                                    objectFit: 'cover',
                                    //marginRight: '0.3rem',
                                }}
                                src={
                                    perks.find((p) => p.name === 'apple one')
                                        ?.image
                                }
                                alt="disney plus"
                            />

                            <div
                                style={{
                                    position: 'absolute',
                                    left: 50,
                                    top: 8,
                                    zIndex: 10,
                                }}
                            >
                                <p
                                    style={{
                                        color: theme.TEXT_COLOR,

                                        fontSize: '1rem',
                                        fontWeight: 'bold',
                                    }}
                                >
                                    Apple One
                                </p>
                            </div>
                        </Box>
                    </Box>
                </HoverElement>
            </Grid>
        </Grid>
    );
};

export default PopularPlans;
