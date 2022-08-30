import React from 'react';

const Profile = () => {
    return (
        <div className='flex w-2/5 p-4 space-x-4 bg-gray-100 rounded-xl shadow'>
            <div className='self-center'>
                <img className='h-10 w-10' src="/neverSleepIcon.png" alt='Profile'/>
            </div>
            <div className='self-center'>
                <p className='text-gray-400'>Accounting Manager</p>
                <p>Sarawut Bunmee</p>
            </div>
        </div>
    );
};

export default Profile;