import React, {useState} from 'react';
import Search from '../components/Search'
import Profile from '../components/Profile'
import NavRoute from '../components/NavRoute'

const Top = ({onChangeSearch}) => {
    return (
        <>
            <div className='flex justify-between w-full space-x-8'>
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