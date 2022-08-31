import React, {createContext, useState} from 'react';
import { FiSearch } from 'react-icons/fi';

const Search = ({onChangeSearch})=> {
    return (
        <>
            <div className='flex w-full h-12 relative'>
                <FiSearch color='#d1d5db' className='h-5 w-5 self-center absolute left-0 flex mx-4'/>
                <input onChange={(e) => onChangeSearch(e.target.value)} type="text" placeholder={'Search'} className='w-full text-opacity-95 py-3 px-10 rounded-xl shadow'/>
            </div>
        </>
    )
};

export default Search;