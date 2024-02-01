import React from 'react'
import { NavLink } from 'react-router-dom'
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
const Navbar = () => {
  return (
    <>
    <nav className="border border-r-gray-400 h-screen px-7">


        <ul className='flex flex-col justify-between h-full pb-5'>
        <img src="logo.png" alt="logo" width="60%" className='py-5' />
          <li>
            <span> <HomeIcon /> </span> <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <span> <SearchIcon/> </span> <span>Search</span>
          </li>
          <li>
            <NavLink to="/explore">Explore</NavLink>
          </li>
          <li>
            <NavLink to="/reels">Reels</NavLink>
          </li>
          <li>
            <NavLink to="/messages">Messages</NavLink>
          </li>
          <li>
            <NavLink to="/notifications">Notifications</NavLink>
          </li>
          <li>
            <span>Create Post</span>
          </li>
          <li>
            <span>More</span>
          </li>
        </ul>
      </nav>
    </>
  )
}

export default Navbar