import React from 'react';
import FiosCard from './FiosCard';

interface Props {
    opacity: number;
}

const Gigabit = ({ opacity }: Props) => {
    return (
        <div
            style={{
                display: 'flex',

                opacity: opacity,
                border: 'solid #8b8585 2px',
                transition: 'all 0.5s ease-in-out',
                height: opacity === 1 ? 'auto' : '0px',
                transform: 'scale(' + opacity + ')',
                borderRadius: '1rem',
                overflow: 'hidden',
            }}
        >
            <FiosCard
                title={'1 Gig - Streaming'}
                details={[
                    'Whole-Home Wi-Fi',
                    '2TB Verizon Cloud storage',
                    'Disney+ for 6 Months',
                    '4 yr Price Guarantee',
                ]}
                id="streaming"
                price={99.99}
            />
            <FiosCard
                title={'1 Gig - Gaming'}
                details={[
                    'Whole-Home Wi-Fi',
                    'Moca Ethernet Adapter',
                    '$50 Xbox Gift Card',
                    '4 yr Price Guarantee',
                ]}
                id="gaming"
                price={99.99}
            />
            <FiosCard
                title={'1 Gig - Complete Package'}
                details={[
                    'Whole-Home Wi-Fi Plus',
                    '2TB Verizon Cloud storage',
                    'Disney+ for 6 Months',
                    'Moca Ethernet Adapter',
                    '$50 Xbox Gift Card',
                    '4 yr Price Guarantee',
                ]}
                id="complete"
                price={109.99}
            />
        </div>
    );
};

export default Gigabit;
