import React from 'react';
import MainContainer from '../components/MainContainer';

type Props = {};

export default function referrals({}: Props) {
    return (
        <div style={{ width: '100%', height: '100vh', position: 'relative' }}>
            {/* <iframe
                src="promo.pdf"
                name="report"
                style={{
                    width: '100%',

                    height: '100%',
                }}
            >
                <div>
                    <h2>Robert Melendez</h2>
                </div>
            </iframe> */}
            <object
                data="promo.pdf"
                type="application/pdf"
                // width="100%"
                // height="100%"
                style={{
                    position: 'absolute',
                    zIndex: 1,
                    objectFit: 'contain',
                    top: 0,
                    right: 0,
                    width: '100%',
                    height: '100%',
                    padding: 20,
                    left: 0,
                    bottom: 0,
                    overflow: 'hidden',
                }}
            ></object>
            <div
                style={{
                    position: 'absolute',
                    zIndex: 3,
                    top: 30,
                    left: 50,
                }}
            >
                <h3>Robert Melendez</h3>
            </div>
        </div>
    );
}
