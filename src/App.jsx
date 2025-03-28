import { useEffect, useState } from 'react'
import {useDispatch} from 'react-redux'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import authService from "./appwrite/Auth"
import { login, logout } from './store/authSlice'
import { Outlet } from 'react-router-dom'
import Header from './components/Header';
import Footer from'./components/Footer';
function App() {
 const [loading,setLoading]=useState(true);
 const dispatch=useDispatch();
 useEffect(()=>{
  authService.getCurrentUser()
  .then((userData)=>{
    if(userData){
      dispatch(login({userData}))
    }
    else{
      dispatch(logout())
    }
  }).finally(()=>setLoading(false))
 },[])


 return !loading ? (
  <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
    <div className='w-full block'>
      <Header />
      <main>
      TODO:  <Outlet />
      </main>
      <Footer />
    </div>
  </div>
) : (<>Loading..............</>)
}

export default App
