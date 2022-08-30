import React from 'react';
import Search from '../components/Search'
import Profile from '../components/Profile'
import NavRoute from '../components/NavRoute'

const Top = () => {
    return (
        <div>
            <div className='flex w-full space-x-8'>
                <div className='w-full space-y-2'>
                    <Search/>
                    <NavRoute/>
                </div>
                <Profile/>
            </div>
        </div>
    );
};

export default Top;