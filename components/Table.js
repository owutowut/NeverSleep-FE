import React from 'react';
import Users from "../public/users.json";
import {MdOutlineTopic} from 'react-icons/md'

const users = Users.data.users

const Table = () => {
    return (
        <div className='bg-white my-4 px-8 py-14 shadow rounded-xl space-y-2'>
            <div className='space-x-2'>
                <span>Show</span>
                <span className='font-medium bg-gray-100 border border-gray-200 px-4 rounded-md'>10</span>
                <span>Entries</span>
            </div>
            <table className='w-full text-center'>
                <tbody>
                    <tr>
                        <th className='rounded-tl-xl'>No.</th>
                        <th>Code</th>
                        <th>Project Name</th>
                        <th>Date</th>
                        <th>Customer Name</th>
                        <th>Payment Amount</th>
                        <th>Slip</th>
                        <th className='rounded-tr-xl'>Status</th>
                    </tr>
                    {users && users.map((user)=>(
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.code}</td>
                            <td>{user.project_name}</td>
                            <td>{user.data.substring(0,10)}</td>
                            <td>{user.first_name}</td>
                            <td>{user.payment}</td>
                            <td className='flex w-full justify-center'><MdOutlineTopic/></td>
                            <td>{user.status.name_status}</td>
                        </tr>
                    ))}
                <tbody>
            </table>
        </div>
    );
};

export default Table;