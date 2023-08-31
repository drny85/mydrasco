import { Box, Grid } from '@mui/material';
import { useAppSelector } from '../redux/hooks/reduxHooks';
import HoverElement from './HoverElement';

import CellTowerIcon from '@mui/icons-material/CellTower';
import LockIcon from '@mui/icons-material/Lock';
import WatchIcon from '@mui/icons-material/Watch';
import WifiIcon from '@mui/icons-material/Wifi';
import AirplaneTicketIcon from '@mui/icons-material/AirplaneTicket';
import RouterIcon from '@mui/icons-material/Router';

interface CardProps {
    title: string;
    price: number;
    description?: string;
    onClick: () => void;
    selected: boolean;
}
const MyPlanCard = ({
    title,
    price,
    description,
    onClick,
    selected,
}: CardProps) => {
    const theme = useAppSelector((state) => state.theme);
    const hoverPlan = useAppSelector((state) => state.wireless.hoverPlan);

    return (
        <HoverElement selected={selected}>
            <Grid
                onClick={onClick}
                //minWidth={400}

                bgcolor={theme.mode === 'light' ? '#212121' : '#ffffff'}
                padding={2}
                borderRadius={2}
                minHeight={400}
                item
            >
                <Box
                    margin={2}
                    display={'flex'}
                    justifyContent={'space-between'}
                    alignItems={'center'}
                >
                    <h3
                        style={{
                            color:
                                theme.mode === 'light' ? '#ffffff' : '#212121',
                            fontSize: '1.5rem',
                        }}
                    >
                        {title}
                    </h3>
                    <h4
                        style={{
                            fontSize: '1.3rem',
                            color:
                                theme.mode === 'light' ? '#ffffff' : '#212121',
                        }}
                    >
                        ${price} / line
                    </h4>
                </Box>

                <Box margin={2}>
                    <p
                        style={{
                            fontSize: '1rem',
                            color:
                                theme.mode === 'light' ? '#ffffff' : '#212121',
                        }}
                    >
                        {description}
                    </p>
                </Box>
                {title.toLowerCase().includes('plus') ? (
                    <>
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                padding: '0.2rem  0.6rem',
                            }}
                        >
                            <CellTowerIcon
                                sx={{
                                    color:
                                        theme.mode === 'dark'
                                            ? '#212121'
                                            : '#ffffff',
                                }}
                            />
                            <p
                                style={{
                                    fontSize: '0.8rem',
                                    padding: '0.5rem',
                                    color:
                                        theme.mode === 'light'
                                            ? '#ffffff'
                                            : '#212121',
                                }}
                            >
                                5G Ultra Wideband
                            </p>
                        </div>
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                padding: '0.2rem  0.6rem',
                            }}
                        >
                            <WifiIcon
                                sx={{
                                    color:
                                        theme.mode === 'dark'
                                            ? '#212121'
                                            : '#ffffff',
                                }}
                            />
                            <p
                                style={{
                                    fontSize: '0.8rem',
                                    paddingLeft: '0.5rem',
                                    color:
                                        theme.mode === 'light'
                                            ? '#ffffff'
                                            : '#212121',
                                }}
                            >
                                30 GB premium mobile hotspot data
                            </p>
                        </div>
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                padding: '0.2rem  0.6rem',
                            }}
                        >
                            <WatchIcon
                                sx={{
                                    color:
                                        theme.mode === 'dark'
                                            ? '#212121'
                                            : '#ffffff',
                                }}
                            />
                            <p
                                style={{
                                    fontSize: '0.8rem',
                                    paddingLeft: '0.5rem',
                                    color:
                                        theme.mode === 'light'
                                            ? '#ffffff'
                                            : '#212121',
                                }}
                            >
                                Up to 50% off a watch, tablet, hotspot or Hum
                                plan
                            </p>
                        </div>
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                padding: '0.2rem  0.6rem',
                            }}
                        >
                            <LockIcon
                                sx={{
                                    color:
                                        theme.mode === 'dark'
                                            ? '#212121'
                                            : '#ffffff',
                                }}
                            />
                            <p
                                style={{
                                    fontSize: '0.8rem',
                                    paddingLeft: '0.5rem',
                                    color:
                                        theme.mode === 'light'
                                            ? '#ffffff'
                                            : '#212121',
                                }}
                            >
                                3-year Price Guarantee
                            </p>
                        </div>
                    </>
                ) : title.toLowerCase().includes('welcome') ? (
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            padding: '0.2rem  0.6rem',
                        }}
                    >
                        <CellTowerIcon
                            sx={{
                                color:
                                    theme.mode === 'dark'
                                        ? '#212121'
                                        : '#ffffff',
                            }}
                        />
                        <p
                            style={{
                                fontSize: '0.8rem',
                                paddingLeft: '0.5rem',
                                color:
                                    theme.mode === 'light'
                                        ? '#ffffff'
                                        : '#212121',
                            }}
                        >
                            5G
                        </p>
                    </div>
                ) : (
                    <>
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                padding: '0.2rem  0.6rem',
                            }}
                        >
                            <CellTowerIcon
                                sx={{
                                    color:
                                        theme.mode === 'dark'
                                            ? '#212121'
                                            : '#ffffff',
                                }}
                            />
                            <p
                                style={{
                                    fontSize: '0.8rem',
                                    padding: '0.5rem',
                                    color:
                                        theme.mode === 'light'
                                            ? '#ffffff'
                                            : '#212121',
                                }}
                            >
                                5G Ultra Wideband
                            </p>
                        </div>
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                padding: '0.2rem  0.6rem',
                            }}
                        >
                            <WifiIcon
                                sx={{
                                    color:
                                        theme.mode === 'dark'
                                            ? '#212121'
                                            : '#ffffff',
                                }}
                            />
                            <p
                                style={{
                                    fontSize: '0.8rem',
                                    paddingLeft: '0.5rem',
                                    color:
                                        theme.mode === 'light'
                                            ? '#ffffff'
                                            : '#212121',
                                }}
                            >
                                60 GB premium mobile hotspot data
                            </p>
                        </div>
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                padding: '0.2rem  0.6rem',
                            }}
                        >
                            <WatchIcon
                                sx={{
                                    color:
                                        theme.mode === 'dark'
                                            ? '#212121'
                                            : '#ffffff',
                                }}
                            />
                            <p
                                style={{
                                    fontSize: '0.8rem',
                                    paddingLeft: '0.5rem',
                                    color:
                                        theme.mode === 'light'
                                            ? '#ffffff'
                                            : '#212121',
                                }}
                            >
                                Up to 50% off 2 watch, tablet, hotspot or Hum
                                plan
                            </p>
                        </div>
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                padding: '0.2rem  0.6rem',
                            }}
                        >
                            <AirplaneTicketIcon
                                sx={{
                                    color:
                                        theme.mode === 'dark'
                                            ? '#212121'
                                            : '#ffffff',
                                }}
                            />
                            <p
                                style={{
                                    fontSize: '0.8rem',
                                    paddingLeft: '0.5rem',
                                    color:
                                        theme.mode === 'light'
                                            ? '#ffffff'
                                            : '#212121',
                                }}
                            >
                                High-speed international data, talk & text
                            </p>
                        </div>
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                padding: '0.2rem  0.6rem',
                            }}
                        >
                            <RouterIcon
                                sx={{
                                    color:
                                        theme.mode === 'dark'
                                            ? '#212121'
                                            : '#ffffff',
                                }}
                            />
                            <p
                                style={{
                                    fontSize: '0.8rem',
                                    paddingLeft: '0.5rem',
                                    color:
                                        theme.mode === 'light'
                                            ? '#ffffff'
                                            : '#212121',
                                }}
                            >
                                Home Internet as low as $25/mo,serivice
                                availability varies
                            </p>
                        </div>
                    </>
                )}
            </Grid>
        </HoverElement>
    );
};

export default MyPlanCard;
