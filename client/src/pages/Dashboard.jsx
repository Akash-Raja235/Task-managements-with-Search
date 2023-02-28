import { Avatar } from "@mui/material"
import AllList from "../Components/AllList"
import CreateList from "../Components/CreateList"
import { useNavigate } from "react-router-dom"

import axios from 'axios';
import { useEffect, useState } from 'react';



const Dashboard = () => {

  const navigate = useNavigate()
  const [name, setname] = useState()
  useEffect(() => {
    setname(sessionStorage.getItem("name"))

  }, [])
  const [AllLists, setAllLists] = useState([])
  async function getAllList() {
    let res = await axios.get('http://localhost:5000/api/v1/list/get-all-lists')

    setAllLists(res.data.lists)
  }
  return (
    <>
      <div className="flex justify-around items-center bg-gray-500 p-2">
        <div className="flex space-x-4 items-center">
          <h1 className="font-extrabold text-violet-200">WELCOME TO DASHBOARD </h1>
          <CreateList getAllList={getAllList} />
        </div>
        <div className="flex space-x-1 items-center" title="Logout" onClick={() => {
          navigate('/user-login')
          sessionStorage.clear()
        }} >
          <Avatar src='' />
          <h3>{name}</h3>
        </div>
      </div>

      <AllList getAllList={getAllList} AllLists={AllLists} setAllLists={setAllLists} />
    </>

  )
}

export default Dashboard