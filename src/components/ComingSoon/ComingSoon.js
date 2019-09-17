import React from 'react';
import Header from '../Header';

const ComingSoon = () => (
    <div className="coming-soon" style={{
        padding: '10rem 6rem',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
    }}>
        <h2 style={{ marginBottom: '4rem' }}>
            Coming Soon!
        </h2>

        <p style={{ fontSize: '1.25rem' }}>
            This page is currently under construction
        </p>
    </div>
);

export default Header(ComingSoon);