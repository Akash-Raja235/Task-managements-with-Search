import Header from "../Components/Header"

import demo from '../assets/demo-image-removebg-preview.png'
import { Button } from "@mui/material"
import { useNavigate } from "react-router-dom"


const Home = () => {

   const navigate= useNavigate() 
  return (
    <>
    <Header/>
    <div className="flex justify-around items-center pt-2 px-2 h-screen bg-gray-800">

        <div>
            <h1 className="font-bold font-sans text-4xl mb-10 text-white"> Let's Create Modern Todo list !!</h1>
          <Button onClick={()=>navigate('/user-signup')} variant="contained">Let's Start..</Button>
        </div>
        <div>
            <img src={demo} alt="image" width={500} height={500} />
        </div>
    </div>
    </>
  )
}

export default Home