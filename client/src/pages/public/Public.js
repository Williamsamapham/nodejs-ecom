import React from 'react'
import { Outlet } from 'react-router-dom'
import { Header, Nav } from "../../components";
function Public() {
  return (
    <div className="w-full flex flex-col items-center">
      <Header />
      <Nav />
      <div className='w-main'>
        <Outlet />
      </div>
    </div>
  );
}

export default Public