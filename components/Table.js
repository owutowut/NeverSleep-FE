import React, {useState} from 'react';
import Users from "../public/users.json";
import MdOutlineTopic from 'react-icons/md'
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import { darken, lighten } from '@mui/material/styles';

const users = Users.data.users
const totalUsers = users.length

const getBackgroundColor = (color, mode) =>
    mode === 'dark' ? darken(color, 0.6) : lighten(color, 0.6);

const getHoverBackgroundColor = (color, mode) =>
    mode === 'dark' ? darken(color, 0.5) : lighten(color, 0.5);

const DataTable = ({filterStatus, searchValue})=> {
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(10);

    const search = searchValue
    const status = filterStatus

    const handleChange = (event) => {setPageSize(event.target.value)}
    const row = users.map((user)=> {
        return {
            id: user.id,
            code: user.code,
            project_name: user.project_name,
            data: user.data,
            name: user.first_name + ' ' + user.last_name,
            payment: user.payment,
            slip: user.slip,
            status: user.status.name_status,
        }
    })

    const columns = [
        { field: "id", headerName: "No.", width: "100", headerClassName: 'headerCSS', headerAlign: 'center', align: "center"},
        { field: "code", headerName: "Code", width: "150", headerClassName: 'headerCSS', headerAlign: 'center', align: "center"},
        { field: "project_name", headerName: "Project Name", width: "160", headerClassName: 'headerCSS', headerAlign: 'center', align: "center"},
        { field: "data", headerName: "Date", width: "160", headerClassName: 'headerCSS', headerAlign: 'center', align: "center"},
        { field: "name", headerName: "Customer Name", width: "180", headerClassName: 'headerCSS', headerAlign: 'center', align: "center"},
        { field: "payment", headerName: "Payment", width: "130",  headerClassName: 'headerCSS', headerAlign: 'center', align: "center"},
        { field: "slip", headerName: "Slip", width: "70", headerClassName: 'headerCSS', headerAlign: 'center', align: "center",},
        { field: "status", headerName: "Status", width: "160", headerClassName: 'headerCSS', rowClassName: 'rowCSS', headerAlign: 'center', align: "center"}
    ]
    const totalPayment = (users.reduce((a,v) => a+v.payment , 0 )).toLocaleString()

    return (
        <div className='px-8'>
            <div className='flex w-full justify-between h-28 my-4'>
                <div className='flex self-end space-x-3'>
                    <p className='self-center'> Show </p>
                    <select onChange={handleChange} className='cursor-pointer px-4 py-1 bg-gray-100 rounded-md border border-gray-300 font-medium'>
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                        <option value={30}>30</option>
                    </select>
                    <p className='self-center'> Entries </p>
                </div>
                <div className='flex self-start text-red-600 bg-gray-100 space-x-4 py-4 px-8 rounded-xl'>
                    <p className='self-start'>ยอดชำระทั้งหมด</p>
                    <p className='text-2xl font-bold self-center'> {totalPayment}</p>
                    <p className='self-end'>บาท</p>
                </div>
            </div>
            <div className='flex justify-center overflow-hidden'>
                <Box
                    sx={{
                        height: 600,
                        width: '100%',
                        '& .even': {
                            bgcolor: (theme) =>
                                getBackgroundColor('#fff', theme.palette.mode),
                            '&:hover': {
                                bgcolor: (theme) =>
                                    getHoverBackgroundColor(
                                        theme.palette.info.main,
                                        theme.palette.mode
                                    ),
                            },
                        },
                        '& .odd': {
                            bgcolor: (theme) =>
                                getBackgroundColor('#bfdbfe', theme.palette.mode),
                            '&:hover': {
                                bgcolor: (theme) =>
                                    getHoverBackgroundColor(
                                        theme.palette.primary.light,
                                        theme.palette.mode,
                                    ),
                            },
                        },
                    }}
                >
                    <DataGrid
                        sx={{ borderRadius: 4, border: 'none',
                            '& .headerCSS': {
                                backgroundColor: 'rgb(191 219 254)',
                            },
                            '& .rowCSS': {
                                backgroundColor: '#FFFFFF',
                            },
                        }}
                        getRowClassName={(params) =>
                            params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
                        }
                        disableColumnMenu
                        disableSelectionOnClick
                        page={page}
                        onPageChange={(newPage) => setPage(newPage)}
                        getRowId={Object.keys[users]}
                        rows={row.filter(user=>
                            search!==''||status==='ทั้งหมด'? user.name.toLowerCase().includes(search.toLowerCase()):user
                            &&
                            status==='ทั้งหมด'||search===''? user.status===status:user
                        )}
                        columns={columns}
                        rowHeight={49}
                        pageSize={pageSize}
                        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                    />
                </Box>
            </div>
        </div>
    )
}

const Table = ({searchValue}) => {
    const [status, setStatus] = useState('ทั้งหมด')

    const filterAll = () => {
        setStatus('ทั้งหมด');
    };
    const filterSuccess = () => {
        setStatus('จ่ายแล้ว');
    };
    const filterPendingPayment = () => {
        setStatus('รอชำระเงิน');
    };
    const filterCancel = () => {
        setStatus('ยกเลิก');
    };
    const filterFailed = () => {
        setStatus('ไม่สำเร็จ');
    };
    const filterPendingReview = () => {
        setStatus('รอตรวจสอบ');
    };

    return (
        <div className='overflow-hidden'>
            <div className='space-x-2'>
                <span className='opacity-90 font-bold text-xl'>Invoice</span>
                <span className='text-blue-500'>(ใบแจ้งหนี้)</span>
            </div>
            <div className='main bg-white pb-2 shadow rounded-xl space-y-2 relative my-4'>
                <div className='navbar w-full flex justify-center'>
                    <div className='flex space-x-8 border-t rounded-xl shadow-top bg-white p-6'>
                        <div onClick={filterAll} className='whitespace-nowrap px-8 py-2 bg-blue-400 text-white rounded-md cursor-pointer'>
                            <p>ทั้งหมด ({totalUsers})</p>
                        </div>
                        <div onClick={filterPendingPayment} className='whitespace-nowrap px-8 py-2 bg-blue-400 text-white rounded-md cursor-pointer'>
                            <p>ชำระทั้งหมด ({totalUsers})</p>
                        </div>
                        <div onClick={filterPendingReview} className='whitespace-nowrap px-8 py-2 bg-blue-400 text-white rounded-md cursor-pointer'>
                            <p>รอตรวจสอบ ({totalUsers})</p>
                        </div>
                        <div onClick={filterSuccess} className='whitespace-nowrap px-8 py-2 bg-blue-400 text-white rounded-md cursor-pointer'>
                            <p>จ่ายแล้ว ({totalUsers})</p>
                        </div>
                        <div onClick={filterFailed} className='whitespace-nowrap px-8 py-2 bg-blue-400 text-white rounded-md cursor-pointer'>
                            <p>ไม่สำเร็จ ({totalUsers})</p>
                        </div>
                        <div onClick={filterCancel} className='whitespace-nowrap px-12 py-2 bg-blue-400 text-white rounded-md cursor-pointer'>
                            <p>ยกเลิก ({totalUsers})</p>
                        </div>
                    </div>
                </div>
                <DataTable filterStatus={status} searchValue={searchValue}/>
            </div>
        </div>
    );
};


export default Table;