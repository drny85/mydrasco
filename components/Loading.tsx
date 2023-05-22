import React from 'react';

export const Loading = () => {
    return (
        <div
            style={{
                width: '100vw',
                height: '100vh',
                justifyContent: 'center',
                alignItems: 'center',
                display: 'flex',
            }}
        >
            <iframe
                style={{
                    width: '100%',
                    height: '100%',
                }}
                allowFullScreen
                src="https://embed.lottiefiles.com/animation/99833"
            ></iframe>
        </div>
    );
};
