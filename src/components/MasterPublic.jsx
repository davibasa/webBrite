import React from 'react';
import { Outlet } from 'react-router-dom';
import NavbarPublic from './NavbarPublic';
import Footer from './Footer';

const MasterPublic = () => {
  return (
    <div>
      <NavbarPublic />
      <Outlet />
      <Footer />
    </div>
  )
}

export default MasterPublic
