import React from 'react'
import Container from './Container'
import Logo from './Logo'
import LogoutBtn from './LogoutBtn'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
function Header() {
  const authStatus=useSelector(
    (state)=>state.status
  )//here auth refers to name in authSlice
  const navigate=useNavigate();
  const Items=[
    {
      name: 'Home',
      slug: "/",
      active: true
    }, 
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
  },
  {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
  },
  {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
  },
  {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
  },
  ]
  return (
    <header className='py-3 shadow bg-gray-500'>
      <Container>
        <nav className='flex'>
          <div className='mr-4'>
            <Link to='/'>
              <Logo width='70px'/>
            </Link>
          </div>
          <ul className='flex ml-auto'>
           {Items.map((item)=>   item.active?(
            <li key={item.slug}>
              <button className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
               onClick={()=>navigate(item.slug)}>{item.name}</button>
            </li>
         ): null
           )}
           {authStatus &&(
            <li><LogoutBtn/></li>
           )} 
          </ul>
        </nav>
      </Container>
    </header>
  )
}

export default Header
