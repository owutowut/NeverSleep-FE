import React, {useState} from 'react';
import Users from "../public/users.json";
import MdOutlineTopic from 'react-icons/md'
import {DataGrid, GridActionsCellItem} from "@mui/x-data-grid";

const users = Users.data.users

const DataTable = ()=> {
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const handleChange = (event) => {
        setPageSize(event.target.value)
    }
    const row = users.map((user)=> {
        return {
            id: user.id,
            code: user.code,
            project_name: user.project_name,
            data: user.data,
            first_name: user.first_name+' '+user.last_name,
            payment: user.payment,
            slip: '',
            status: user.status.name_status,
        }
    })

    const columns = [
        { field: "id", headerName: "No.", width: "80"},
        { field: "code", headerName: "Code", width: "150"},
        { field: "project_name", headerName: "Project Name", width: "150"},
        { field: "data", headerName: "Date", width: "150"},
        { field: "first_name", headerName: "Customer Name", width: "150"},
        { field: "payment", headerName: "Payment Amount", width: "150"},
        { field: "slip", headerName: "Slip", width: "100", hideable: false, getActions: () => <GridActionsCellItem icon={<MdOutlineTopic />}/>},
        { field: "status", headerName: "Status", width: "150"},
    ]

    const totalPayment = (users.reduce((a,v) => a+v.payment , 0 )).toLocaleString()

    return (
        <div>
            <div className='flex w-full justify-between py-2'>
                <div className='flex self-center space-x-3'>
                    <p className='self-center'> Show </p>
                    <select onChange={handleChange} className='cursor-pointer px-4 py-1 bg-gray-100 rounded-md border border-gray-300 font-medium'>
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                        <option value={30}>30</option>
                    </select>
                    <p className='self-center'> Entries </p>
                </div>
                <div className='flex self-center text-red-600 bg-gray-100 space-x-2 py-4 px-3 rounded-xl'>
                    <p className='self-center'>ยอดชำระทั้งหมด</p>
                    <p className='text-2xl font-medium self-center'> {totalPayment}</p>
                    <p className='self-center'>บาท</p>
                </div>
            </div>
            <div className='w-full h-[600px] flex justify-center overflow-hidden'>
                <DataGrid
                    disableColumnMenu
                    disableSelectionOnClick
                    page={page}
                    onPageChange={(newPage) => setPage(newPage)}
                    getRowId={Object.keys[users]}
                    rows={row}
                    columns={columns}
                    rowHeight={49}
                    pageSize={pageSize}
                    onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                    rowsPerPageOptions={[10,20,30]}
                />
            </div>
        </div>
    )
}

const Table = () => {
    return (
        <div className='bg-white my-4 px-8 py-14 shadow rounded-xl space-y-2'>
            <DataTable/>
        </div>
    );
};


export default Table;