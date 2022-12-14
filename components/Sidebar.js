import React, {useEffect, useState} from 'react';
import {BsFillBookmarkDashFill} from 'react-icons/bs'
import {MdPeople} from 'react-icons/md'
import {FaFileInvoiceDollar} from 'react-icons/fa'

const Sidebar = () => {
    const [isActive, setIsActive] = useState(false)

    const Active = ()=> {
        const list = document.querySelectorAll('.list')
        for (let i=0; i<list.length; i++) {
            list[i].onclick = function () {
                let j=0;
                while (j < list.length) {
                    list[j++].className = 'list'
                }
                list[i].className = 'list active'
            }
        }
    }

    useEffect(()=>{
        Active()
    },[isActive])

    return (
        <div className='lg:col-span-1 text-white w-full h-full lg:relative'>
            <div className='sidebar'>
                <header className='whitespace-nowrap text-3xl px-8 py-14'>NVSL - IMS</header>
                <ul className='space-y-4'>
                    <li onClick={()=>setIsActive(true)} className='list'>
                        <b></b>
                        <b></b>
                        <div className='text-center flex relative'>
                            <BsFillBookmarkDashFill className='self-center mx-4'/>
                            <a className='cursor-pointer'>Dashboard</a>
                        </div>
                    </li>
                    <li onClick={()=>setIsActive(true)} className='list'>
                        <b></b>
                        <b></b>
                        <div className='text-center flex relative'>
                            <MdPeople className='self-center mx-4'/>
                            <a className='cursor-pointer'>Partner</a>
                        </div>
                    </li>
                    <li onClick={()=>setIsActive(true)} className='list active'>
                        <b></b>
                        <b></b>
                        <div className='text-center flex relative'>
                            <FaFileInvoiceDollar className='self-center mx-4'/>
                            <a className='cursor-pointer'>Invoice</a>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;