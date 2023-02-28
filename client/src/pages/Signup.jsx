
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Image from '../assets/demo-image2.jpg'
import Header from "../Components/Header"
import axios from 'axios'
const Signup = () => {


   const [inputData, SetInputData] = useState({
    name:"",
    email:"",
    password:""
   }) 

   const [error, setError] = useState(false)
   const [error2, setError2] = useState(false)
   const navigate = useNavigate()
   const inputHandler = (e)=>{
    SetInputData({...inputData, [e.target.name]:e.target.value})

   }

   const submitHandler = async()=>{
   
    if(inputData.name ==='' || inputData.email ===''|| inputData.password ===''  ){
        setError(true)
    } else if(inputData.password.length < 6){
        setError2(true)
    }else{
         
      try {
        
      let res = await axios.post('http://localhost:5000/api/v1/signup',inputData)
      console.log(res.data)

      setTimeout(()=>{
        navigate('/user-login')
      },2000
    )

      } catch (error) {
        console.log('something went wrong try again'
          )
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
        <h3 className="block text-gray-700 text-sm font-bold mb-2 text-center  bg-gray-400 p-2"> Sign Up?</h3>
    </div>
     {error &&
     <div>
     <p className="text-red-500 text-xs italic text-center">please fills all inputs</p>
     </div>
     }
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" >
        Name
      </label>
      <input onChange={inputHandler} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="name" type="text" placeholder="full name"/>
    </div>
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
      <p className="text-red-500 text-xs italic">{!error2? 'Please choosea a 6 charactor password.':'your password is less than 6 chars' }</p>
    </div>
    <div className="flex items-center justify-between">
     
      <button  type='button' onClick={submitHandler} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
        Sign up
      </button>
     
      <button onClick={()=>navigate('/user-login')} className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" >
        Go to Login?
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

export default Signup