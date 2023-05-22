import { Box, Switch } from '@mui/material';
import React from 'react';
import { Perk } from './PerksView';
import { useAppSelector } from '../redux/hooks/reduxHooks';
import { Line } from '../redux/wirelessSlide';
import HoverElement from './HoverElement';

type Props = {
    perk: Perk;
    line: Line;
    onChange: (perk: Perk, line: Line) => void;
};

const PerkCard = ({ perk, onChange, line }: Props) => {
    const theme = useAppSelector((s) => s.theme);

    return (
        <HoverElement>
            <Box
                sx={{
                    minWidth: 150,
                    width: '12rem',
                    height: '12rem',
                    overflow: 'hidden',
                    borderRadius: '0.5rem',
                    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
                    backgroundColor: theme.SHADOW_COLOR,
                    position: 'relative',
                }}
            >
                <Box
                    bgcolor={theme.BACKGROUND_COLOR}
                    position={'absolute'}
                    top={0}
                    display={'flex'}
                    width={'100%'}
                    alignItems={'center'}
                    justifyContent={'space-between'}
                    overflow={'hidden'}
                    borderRadius={'0.0rem,  0.5rem, 0.5rem, 0.5rem'}
                    zIndex={20}
                >
                    <p
                        style={{
                            color: theme.TEXT_COLOR,
                            fontSize: '1.1rem',
                            textTransform: 'capitalize',
                            paddingLeft: '0.2rem',
                        }}
                    >
                        {perk.name}
                    </p>
                    <Switch
                        color="success"
                        checked={perk.selected}
                        value={perk.selected}
                        onChange={() => onChange(perk, line)}
                    />
                </Box>
                <img
                    src={perk.image}
                    alt="card image"
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        overflow: 'hidden',
                        borderRadius: '0.5rem',
                        marginTop: '0.5rem',
                    }}
                />
            </Box>
        </HoverElement>
    );
};
export default PerkCard;
