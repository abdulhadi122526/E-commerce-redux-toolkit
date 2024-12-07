
import { Outlet } from 'react-router-dom'
import Navbar from './components/navbar'
import 'animate.css';

const Layout = () => {
  return (
    <>
    <Navbar/>
    <Outlet/>
    
    </>
  )
}

export default Layout