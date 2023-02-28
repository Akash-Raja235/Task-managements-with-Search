

import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { useEffect, useState } from 'react';
import UpdateList from './UpdateList';


const columns = [
    { field: 'id', headerName: 'ID', width: 90 },

    {
        field: 'name',
        headerName: 'Name',
        width: 150,
        editable: true,
    },
    {
        field: 'price',
        headerName: 'Price',
        type: 'number',
        width: 110,
        editable: true,
    },
    {
        field: 'discription',
        headerName: 'Discription',
        sortable: false,
        width: 160,
    }
];

const rows = [
    { id: 1, name: 'Snow', discription: 'Jon', price: 35 },
    { id: 2, name: 'Lannister', discription: 'Cersei', price: 42 },
    { id: 3, name: 'Lannister', discription: 'Jaime', price: 45 },
    { id: 4, name: 'Stark', discription: 'Arya', price: 16 },
    { id: 5, name: 'Targaryen', discription: 'Daenerys', price: 45 },
    { id: 6, name: 'Melisandre', discription: null, price: 150 },
    { id: 7, name: 'Clifford', discription: 'Ferrara', price: 44 },
    { id: 8, name: 'Frances', discription: 'Rossini', price: 36 },
    { id: 9, name: 'Roxie', discription: 'Harvey', price: 65 },
];

export default function AllList({ setAllLists, AllLists, getAllList }) {

    const [editdata, seteditdata] = useState()
    const [ids, setIds] = useState([])


    useEffect(() => {
        getAllList()
    }, [])


    const deleteList = async () => {

        try {
            console.log(ids)
            let res = await axios.delete(`http://localhost:5000/api/v1/list/delete/${ids}`)
            console.log(res)
            getAllList()
        } catch (error) {
            console.log(error
            )
        }

    }

    const handler = async (e) => {
        // setinp(e.target.value)
        if (e.target.value == "") {

            getAllList()
            return
        }
        try {
            console.log(ids)
            let res = await axios.get(`http://localhost:5000/api/v1/list/search/${e.target.value}`)
            console.log(res)
            setAllLists(res.data.lists)
        } catch (error) {
            console.log(error
            )
        }
    }
    const editList = async (e) => {
       
        // try {
        //     console.log(ids)
        //     let res = await axios.get(`http://localhost:5000/api/v1/list/search/${e.target.value}`)
        //     console.log(res)
        //     setAllLists(res.data.lists)
        // } catch (error) {
        //     console.log(error
        //     )
        // }
    }
    return (

        <>
            <div className='flex justify-around items-center'>
                <div className="ml-4 mb-4" >
                    <label className="block text-gray-700 text-sm font-bold mb-2" >
                        Serach By Name
                    </label>
                    <input onChange={handler} className="shadow appearance-none border border-gray-500 rounded w-400 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="email" type="name" placeholder="Search" />

                </div>

            </div>
            <div className='flex space-x-2'>
            {!(ids.length < 1) &&
                <Button onClick={deleteList} variant='contained'>delete </Button>
            }
            {(ids.length == 1) &&
                <UpdateList ids={ids[0]} getAllList={getAllList} />
            }
            </div>
            <div className='h-[400px] w-[100%]'>
                <DataGrid
                    rows={AllLists}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    checkboxSelection
                    disableSelectionOnClick

                    experimentalFeatures={{ newEditingApi: true }}
                    onSelectionModelChange={(ids) => {
                        setIds(ids)

                    }}

                />
            </div>
        </>
    );
}