import React from 'react';
import Search from '../components/Search'
import Profile from '../components/Profile'
import NavRoute from '../components/NavRoute'

const Top = ({onChangeSearch}) => {
    return (
        <>
            <div className='space-y-4 w-full lg:flex lg:justify-between lg:space-x-8 lg:space-y-0'>
                <div className='w-full space-y-4'>
                    <Search onChangeSearch={onChangeSearch}/>
                    <NavRoute/>
                </div>
                <Profile/>
            </div>
        </>
    );
};

export default Top;