import React from 'react';
import Image from 'next/image'

const Profile = () => {
    return (
        <div className='flex p-4 space-x-4 bg-gray-100 rounded-xl shadow lg:w-2/5 lg:self-center'>
            <div className='self-center'>
                <Image width={50} height={50} src="/neverSleepIcon.png" alt='Profile'/>
            </div>
            <div className='self-center'>
                <p className='text-gray-400'>Accounting Manager</p>
                <p>Sarawut Bunmee</p>
            </div>
        </div>
    );
};

export default Profile;