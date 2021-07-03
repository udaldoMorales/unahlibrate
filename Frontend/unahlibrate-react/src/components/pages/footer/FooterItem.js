import React from 'react';

const FooterItem = ({ Icon, title, subtitle }) => {
    return (
        <>
            <p className='font-lg font-weight-bold'>
                <Icon size={26} className='mr-2' />{title}
            </p>
            <p className='mt-3 font-weight-normal'>{subtitle}</p>
        </>
    );
};

export default FooterItem;