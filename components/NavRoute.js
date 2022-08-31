import React from 'react';

const NavRoute = () => {
    return (
        <div className='flex space-x-3 text-blue-500'>
            <label className='cursor-pointer'>Project management</label>
            <label> &gt; </label>
            <label className='cursor-pointer'>Invoice</label>
        </div>
    );
};

export default NavRoute;