import React from 'react';
import { FiSearch } from 'react-icons/fi';

const Search = () => {
    return (
        <div>
            <div className='flex w-full relative'>
                <FiSearch color='#d1d5db' className='h-5 w-5 self-center absolute left-0 flex mx-4'/>
                <input placeholder={'Search'} className='w-full text-opacity-95 py-3 px-10 rounded-xl shadow'/>
            </div>
        </div>
    )
};

export default Search;