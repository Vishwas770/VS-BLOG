import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { logout } from './redux/user/slice.js'
import { useDispatch } from 'react-redux';

function Header(props) {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  async function handleLogout(e) {
    e.preventDefault();
    try {
      const res = await fetch('/api/user/logout');
      const data = await res.json();

      dispatch(logout());
    } catch (error) {
      console.log(error);
    }

  }

  return (

    <header className="flex justify-between items-center shadow-md p-4">
      <Link className="font-bold flex font-sans text-2xl" to={'/'}>
        <img src="./public/logo.png" alt="Description of Image" width="100" height="20"></img>
      </Link>
      <nav className="flex">
        {!currentUser ? (
          <div className='flex gap-4 text-lg  '>
            <Link className='text-amber-600 hover:underline hover:font-semibold' to={'/login'}>Login</Link>
            <Link className='text-amber-600 hover:underline hover:font-semibold' to={'/register'} >Register</Link>
          </div>
        ) :
          <div className='flex gap-4 text-lg'>
            <Link className='text-amber-600  hover:underline hover:font-semibold' to={'/create'}>Create Post</Link>
            <span className='text-amber-600  hover:underline cursor-pointer hover:font-semibold' onClick={handleLogout}>Logout</span>
          </div>
        }
      </nav>
    </header>
  );
}

export default Header;