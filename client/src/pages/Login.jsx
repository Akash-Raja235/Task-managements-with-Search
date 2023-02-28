

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Image from '../assets/demo-image2.jpg'
import Header from "../Components/Header"
import axios from "axios"
import { useDispatch } from "react-redux"
import { fulfilled, loginFailure, loginStart, loginSuccess } from "../redux/UserSclice"
import { storeToken } from "../service/utils"
const Login = () => {


   const [inputData, SetInputData] = useState({
    
    email:"",
    password:""
   }) 

    const dispatch = useDispatch()
   const [error, setError] = useState(false)

   
   const navigate = useNavigate()
   const inputHandler = (e)=>{
    SetInputData({...inputData, [e.target.name]:e.target.value})

   }
   
   const submitHandler = async()=>{
   
    if( inputData.email ===''|| inputData.password ===''  ){
        setError(true)
    }else{
        
      dispatch(loginStart())
      try {
        let res = await axios.post('http://localhost:5000/api/v1/signin',inputData)
        
        console.log(res)
        dispatch(loginSuccess(res.data))
        storeToken(res.data.token) 
        sessionStorage.setItem("name", res.data.user.name)
        setTimeout(()=>{navigate('/dashboard')},2000)

      } catch (error) {
        dispatch(loginFailure())
        alert('Invalid email or password')
      }
       
    }
    
    
    
   }
  
  return (

<>
<Header/>

    <div className="flex justify-around items-center mt-5 ">



<div className="w-full max-w-xs">
  <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
    <div>
        <h3 className="block text-gray-700 text-sm font-bold mb-2 text-center  bg-gray-400 p-2">Login?</h3>
    </div>
     {error &&
     <div>
     <p className="text-red-500 text-xs italic text-center">please fills all inputs</p>
     </div>
     }
    
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" >
        Email
      </label>
      <input onChange={inputHandler} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="email" type="email" placeholder="Email"/>
    </div>
    <div className="mb-6">
      <label className="block text-gray-700 text-sm font-bold mb-2" >
        Password
      </label>
      <input onChange={inputHandler} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" name="password" type="password" placeholder="******************"/>
     
    </div>
    <div className="flex items-center justify-between">
     
      <button  type='button' onClick={submitHandler} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
       Login
      </button>
     
      <button onClick={()=>navigate('/user-signup')} className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" >
        Go to Sign up?
      </button>
    </div>
  </div>
  <p className="text-center text-gray-500 text-xs">
    &copy;2020 Acme Corp. All rights reserved.
  </p>
</div>

        <div>
            <img src={Image} alt="image" width={500} height={500} />
        </div>
    </div>
</>
   
  )
}

export default Login