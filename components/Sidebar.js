import React from 'react';
import {BsFillBookmarkDashFill} from 'react-icons/bs'
import {MdPeople} from 'react-icons/md'
import {FaFileInvoiceDollar} from 'react-icons/fa'

const Sidebar = () => {
    return (
        <div className='text-white flex justify-center w-[300px] h-screen'>
            <div>
                <div className='text-3xl px-8 py-14'>NVSL - IMS</div>
                <div className='w-full flex justify-center'>
                    <div className='space-y-4 w-full ml-6'>
                        <ul className='cursor-pointer text-center flex relative py-2 bg-blue-100 rounded-bl-full rounded-tl-full text-gray-800'>
                            <BsFillBookmarkDashFill className='self-center mx-4'/>
                            <div>Dashboard</div>
                        </ul>
                        <ul className='text-gray-100 cursor-pointer text-center flex relative py-2 rounded-bl-full rounded-tl-full text-gray-800'>
                            <MdPeople color='#d1d5db' className='self-center mx-4'/>
                            <label className='cursor-pointer'>Partner</label>
                        </ul>
                        <ul className='text-gray-100 cursor-pointer text-center flex relative py-2 rounded-bl-full rounded-tl-full text-gray-800'>
                            <FaFileInvoiceDollar color='#d1d5db' className='self-center mx-4'/>
                            <label className='cursor-pointer'>Invoice</label>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;