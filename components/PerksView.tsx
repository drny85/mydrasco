import { Box } from '@mui/material';
import React from 'react';
import PerkCard from './PerkCard';
import { Line } from '../redux/wirelessSlide';
import { useAppSelector } from '../redux/hooks/reduxHooks';

export type PerkName =
    | 'disney bundle'
    | 'apple one'
    | 'apple music family'
    | '2 TB cloud storage'
    | '+play monthly credit'
    | 'walmart+ membership'
    | '100 GB mobile hotspot'
    | '3 TravelPass Days'
    | 'smartwatch data & safety';

export interface Perk {
    name: PerkName;
    price: number;
    image: string;
    description: string;
    sharabled: boolean;
    value: number;
    selected: boolean;
}
type Props = {
    perks: Perk[];
    line: Line;
    onChange: (perk: Perk) => void;
};

function PerksView({ perks, onChange, line }: Props) {
    const lines = useAppSelector((s) => s.wireless.lines);
    return (
        <Box
            flexWrap={'wrap'}
            display={'flex'}
            gap={'1rem'}
            justifyContent={'center'}
            alignItems={'center'}
            width={'100%'}
        >
            {perks.map((perk, index) => (
                <PerkCard
                    onChange={onChange}
                    line={line}
                    key={perk.name}
                    perk={perk}
                />
            ))}
        </Box>
    );
}

export default PerksView;
