


import Button from '@mui/material/Button';

import Modal from '@mui/material/Modal';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';




export default function UpdateList({ids, getAllList}) {
  const [open, setOpen] = useState(false);
  const [searchedData, setsearchedData] = useState();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [list, setList] = useState({
    id:null,
    name:"",
    price:null,
    discription:""
  })

  const [error, seterror] = useState(false)
  const navigate = useNavigate()
  const inputHandler =(e)=>{
    setList({...list, [e.target.name]:e.target.value})
  }

  
  const submitHandler = async()=>{

     if(list.id === null|| list.name ==='' || list.price ===null || list.discription ==='' ){
      seterror(true)
     }else{
        try {
            
          let res = await axios.put('http://localhost:5000/api/v1/list/update',list)
           
          console.log(res.data)
          setTimeout(()=>{
            navigate('/dashboard')
            getAllList()
            setOpen(false)
          },200)

        } catch (error) {
            console.log(error)
        }
     }
  }

  
  useEffect(()=>{

    const getlistByIds = async()=>{
        let res = await axios.get(`http://localhost:5000/api/v1/list/getbyid/${ids}`)
        console.log(res)
        setList(res.data.lists)
    }
    getlistByIds()
  },[])
  return (
    <div>
      <Button onClick={handleOpen} variant='contained'>Edit</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {/* <div className='absolute top-20 left-64 w-[500px] h-auto p-4 border border-gray-500 shadow-sm bg-slate-300'> */}
         
          
         <div className=" absolute top-20 left-[27%] justify-center w-full max-w-xs item-center">
       <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
    <div>
        <h3 className="block text-gray-700 text-sm font-bold mb-2 text-center  bg-gray-400 p-2">Update Data</h3>
    </div>
    

    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" >
        ID
      </label>
      <input onChange={inputHandler} disabled value={list.id} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="id" type="number" placeholder="1001.."/>
    </div>
    <div className="mb-6">
      <label className="block text-gray-700 text-sm font-bold mb-2" >
        name
      </label>
      <input onChange={inputHandler} value={list.name} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" name="name" type="text" placeholder="name"/>
    </div>
    
    <div className="mb-6">
      <label className="block text-gray-700 text-sm font-bold mb-2" >
        Price
      </label>
      <input onChange={inputHandler} value={list.price} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" name="price" type="number" placeholder="Price"/>
    </div>
    <div className="mb-6">
      <label className="block text-gray-700 text-sm font-bold mb-2" >
        Discriptions
      </label>
      <input onChange={inputHandler} value={list.discription} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" name="discription" type="text" placeholder="discription"/>
    </div>
    <div className="flex items-center justify-between">
     
      <button  type='button' onClick={submitHandler} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
       Update List
      </button>
     
     
    </div>
  </div>
 
</div>

       
      </Modal>
    </div>
  );
}