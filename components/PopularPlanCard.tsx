import { Box, Grid } from '@mui/material';
import { v4 } from 'uuid';
import { perks } from '../perks';
import { useAppDispatch, useAppSelector } from '../redux/hooks/reduxHooks';
import {
    Line,
    setExpressAutoPay,
    setGetStarted,
    setLinesData,
} from '../redux/wirelessSlide';
import HoverElement from './HoverElement';
import { Perk } from './PerksView';

type Props = {
    title: Line['name'];
    linePrice: number;
    totalPrice: number;
    description: string;
    benefits: string[];
    perks: Perk[];
};

const PopularPlanCard = (props: Props) => {
    const dispatch = useAppDispatch();
    const theme = useAppSelector((s) => s.theme);
    const lines = useAppSelector((s) => s.wireless.lines);
    return (
        <Grid
            onClick={() => {
                dispatch(setExpressAutoPay(10));
                dispatch(
                    setLinesData([
                        ...lines,
                        {
                            id: v4(),
                            name: props.title,
                            price: props.linePrice,
                            byod: false,
                            perks: [
                                ...perks.map((p) =>
                                    props.perks.includes(p)
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
                    minWidth={250}
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
                                    theme.mode === 'dark' ? '#333' : '#ffffff',
                            }}
                        >
                            {props.title}
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
                                ${props.totalPrice}/mo
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
                            color: theme.mode === 'dark' ? '#333' : '#ffffff',
                            margin: '1rem 0',
                        }}
                    >
                        {props.description}
                    </p>
                    <Box flexDirection={'column'} display={'flex'}>
                        {props.benefits.map((b, index) => (
                            <li
                                key={b}
                                style={{
                                    color:
                                        theme.mode === 'dark'
                                            ? '#33333340'
                                            : '#ffffff',
                                    margin:
                                        props.benefits.length === 1
                                            ? '1.5rem 0'
                                            : '0.2rem 0',
                                    fontSize: '0.8rem',
                                }}
                            >
                                {b}
                            </li>
                        ))}
                    </Box>
                    <Box
                        display={'flex'}
                        height={'150px'}
                        width={'100%'}
                        mt={1}
                        justifyContent={'space-around'}
                    >
                        <div
                            style={{
                                position: 'relative',
                                display: 'flex',
                                justifyContent: 'space-between',

                                width: props.perks.length === 1 ? '80%' : '96%',
                            }}
                        >
                            {props.perks.map((p, index) => (
                                <div
                                    key={index.toString()}
                                    style={{
                                        position: 'relative',
                                        width: '100%',
                                        height: '100%',
                                        margin: '0 .5rem',
                                    }}
                                >
                                    <img
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            borderRadius: '1rem',
                                            objectFit: 'cover',
                                            //marginLeft: '0.3rem',
                                        }}
                                        src={p.image}
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
                                                textTransform: 'capitalize',
                                                color:
                                                    p.name ===
                                                        '3 TravelPass Days' ||
                                                    p.name ===
                                                        'disney bundle' ||
                                                    p.name ===
                                                        '100 GB mobile hotspot'
                                                        ? '#ffffff'
                                                        : undefined,
                                            }}
                                        >
                                            {p.name}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Box>
                </Box>
            </HoverElement>
        </Grid>
    );
};

export default PopularPlanCard;
