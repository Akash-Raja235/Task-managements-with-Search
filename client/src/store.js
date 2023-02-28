

import { configureStore } from '@reduxjs/toolkit'
import UserSclice from './redux/UserSclice'
export const store = configureStore({
  reducer: {user:UserSclice},
})


export default store