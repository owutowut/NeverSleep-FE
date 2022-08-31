import React, {useEffect, useState} from 'react';
import Users from "../public/users.json";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import { darken, lighten } from '@mui/material/styles';

const users = Users.data.users
const totalData = {
    all: users.length,
    payment: users.filter(user=>user.status.name_status==='รอชำระเงิน').length,
    cancel: users.filter(user=>user.status.name_status==='ยกเลิก').length,
    review: users.filter(user=>user.status.name_status==='รอตรวจสอบ').length,
    failed: users.filter(user=>user.status.name_status==='ไม่สำเร็จ').length,
    success: users.filter(user=>user.status.name_status==='จ่ายแล้ว').length,
}

const getBackgroundColor = (color, mode) =>
    mode === 'dark' ? darken(color, 0.6) : lighten(color, 0.6);

const getHoverBackgroundColor = (color, mode) =>
    mode === 'dark' ? darken(color, 0.5) : lighten(color, 0.5);

const slipIcon = () => {
    return <span>&#128221;</span>
}

const DataTable = ({filterStatus, searchValue})=> {
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(10);

    const totalPage = totalData.all/pageSize
    const search = searchValue
    const status = filterStatus

    const onChangePage = (event, value) => {
        setPage(value-1);
    };

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
        { field: "code", headerName: "Code", width: "150", headerClassName: 'headerCSS', headerAlign: 'center', align: "center",
            renderCell: params => {
                return <div className='text-blue-400'>{params.row.code}</div>
            }
        },
        { field: "project_name", headerName: "Project Name", width: "160", headerClassName: 'headerCSS', headerAlign: 'center', align: "center",
            renderCell: params => {
                return <div className='text-blue-400'>{params.row.project_name}</div>
            }
        },
        { field: "data", headerName: "Date", width: "160", headerClassName: 'headerCSS', headerAlign: 'center', align: "center",
            renderCell: params => {
                return <div>{new Date(params.row.data).toLocaleDateString()}</div>
            }
        },
        { field: "name", headerName: "Customer Name", width: "180", headerClassName: 'headerCSS', headerAlign: 'center', align: "center"},
        { field: "payment", headerName: "Payment", width: "130",  headerClassName: 'headerCSS', headerAlign: 'center', align: "center",
            renderCell: params => {
                return <div className='text-red-400'>{params.row.payment.toLocaleString()}</div>
            }
        },
        { field: "slip", headerName: "Slip", width: "70", headerClassName: 'headerCSS', headerAlign: 'center', align: "center", renderCell: slipIcon},
        { field: "status", headerName: "Status", width: "160", headerClassName: 'headerCSS', rowClassName: 'rowCSS', headerAlign: 'center', align: "center",
            renderCell: params=> {
                switch (params.row.status) {
                    case 'รอชำระเงิน':
                        return <div className='py-1 mx-4 w-full text-center rounded-md bg-yellow-200'>รอชำระเงิน</div>
                    case 'รอตรวจสอบ':
                        return <div className='py-1 mx-4 w-full text-center rounded-md bg-purple-200'>รอตรวจสอบ</div>
                    case 'ไม่สำเร็จ':
                        return <div className='py-1 mx-4 w-full text-center rounded-md bg-gray-200'>ไม่สำเร็จ</div>
                    case 'ยกเลิก':
                        return <div className='py-1 mx-4 w-full text-center rounded-md bg-red-200'>ยกเลิก</div>
                    default:
                        return <div className='py-1 mx-4 w-full text-center rounded-md bg-green-200'>จ่ายแล้ว</div>
                }
            }
        }
    ]
    const totalPayment = (users.reduce((a,v) => a+v.payment , 0 )).toLocaleString()

    return (
        <div className='px-6'>
            <div className='mb-12 space-y-4 h-28 my-4 w-full lg:mb-4 lg:flex lg:justify-between'>
                <div className='flex self-end space-x-3'>
                    <p className='self-center'> Show </p>
                    <select onChange={handleChange} className='cursor-pointer px-4 py-1 bg-gray-100 rounded-md border border-gray-300 font-medium'>
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                        <option value={30}>30</option>
                    </select>
                    <p className='self-center'> Entries </p>
                </div>
                <div className='w-full py-2 px-4 text-center text-red-600 lg:flex lg:justify-end'>
                    <div className='space-y-1 bg-gray-100 rounded-xl lg:space-x-4 lg:flex lg:self-start lg:py-2 lg:px-10'>
                        <p className='lg:self-start lg:whitespace-nowrap'>ยอดชำระทั้งหมด</p>
                        <p className='text-xl font-bold lg:text-2xl lg:self-center'> {totalPayment}</p>
                        <p className='lg:self-end lg:whitespace-nowrap'>บาท</p>
                    </div>
                </div>
            </div>
            <div className='pb-2 flex justify-center overflow-hidden '>
                <Box
                    sx={{
                        height: 570,
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
                        hideFooter={true}
                    />
                </Box>
            </div>
            <div className='pb-6 w-full flex justify-center lg:pb-6'>
                <Stack spacing={2}>
                    <Pagination count={totalPage} color="primary" onChange={onChangePage}/>
                </Stack>
            </div>
        </div>
    )
}

const Table = ({searchValue}) => {
    const [status, setStatus] = useState('ทั้งหมด')

    const active = ()=> {
        const listNav = document.querySelectorAll('.listNav')
        for (let i=0; i<listNav.length; i++) {
            listNav[i].onclick = function () {
                let j=0;
                while (j < listNav.length) {
                    listNav[j++].className = 'listNav'
                }
                listNav[i].className = 'listNav active'
            }
        }
    }

    useEffect(()=>{
        active()
    },[status])

    return (
        <div className='overflow-hidden'>
            <div className='space-x-2'>
                <span className='opacity-90 font-bold text-xl'>Invoice</span>
                <span className='text-blue-500'>(ใบแจ้งหนี้)</span>
            </div>
            <div className='space-y-4 rounded-xl lg:relative lg:pb-2 lg:my-12'>
                <div className='w-full hidden lg:block'>
                    <div className='navbar lg:h-6'>
                        <span className='listNav active' onClick={()=>setStatus('ทั้งหมด')}>
                            <p className='all'>ทั้งหมด ({totalData.all})</p>
                        </span>
                        <span className='listNav' onClick={()=>setStatus('จ่ายแล้ว')}>
                            <p className='allPayment'>ชำระทั้งหมด ({totalData.payment})</p>
                        </span>
                        <span className='listNav' onClick={()=>setStatus('รอตรวจสอบ')}>
                            <p className='waitingReview'>รอตรวจสอบ ({totalData.review})</p>
                        </span>
                        <span className='listNav' onClick={()=>setStatus('จ่ายแล้ว')}>
                            <p className='success'>จ่ายแล้ว ({totalData.success})</p>
                        </span>
                        <span className='listNav' onClick={()=>setStatus('ไม่สำเร็จ')}>
                            <p className='failed'>ไม่สำเร็จ ({totalData.failed})</p>
                        </span>
                        <span className='listNav' onClick={()=>setStatus('ยกเลิก')}>
                            <p className='cancel'>ยกเลิก ({totalData.cancel})</p>
                        </span>
                    </div>
                </div>
                <div className='bg-white pt-4 rounded-xl shadow-md lg:pt-2'>
                    <div className='flex w-full justify-center lg:hidden'>
                        <select className='border border-gray-300 py-1 px-4 rounded-md' onChange={(e)=>setStatus(e.target.value)}>
                            <option value={'ทั้งหมด'}>ทั้งหมด ({totalData.all})</option>
                            <option value={'รอชำระเงิน'}>รอชำระเงิน ({totalData.payment})</option>
                            <option value={'รอตรวจสอบ'}>รอตรวจสอบ ({totalData.review})</option>
                            <option value={'จ่ายแล้ว'}>จ่ายแล้ว ({totalData.success})</option>
                            <option value={'ไม่สำเร็จ'}>ไม่สำเร็จ ({totalData.failed})</option>
                            <option value={'ยกเลิก'}>ยกเลิก ({totalData.cancel})</option>
                        </select>
                    </div>
                    <DataTable filterStatus={status} searchValue={searchValue}/>
                </div>
            </div>
        </div>
    );
};


export default Table;