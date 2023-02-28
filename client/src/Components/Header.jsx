import {Button} from '@mui/material'
import {useNavigate} from 'react-router-dom'

const Header = () => {

   const navigate = useNavigate() 
  return (
    <div className="flex bg-gray-500 justify-around items-center py-2">
        <div>
            <h3 className="font-extrabold font text-yellow-600">My Todo</h3>
        </div>
        <div className="flex space-x-10">
            {/* <button className="text-gray-700 focus-visible:text-">Login</button>
            <button>Signup</button> */}
            <Button onClick={()=>navigate('/user-login')} variant='contained' >Login</Button>
            <Button onClick={()=>navigate('/user-signup')} variant='contained' >sign Up</Button>



        </div>
    </div>
  )
}

export default Header