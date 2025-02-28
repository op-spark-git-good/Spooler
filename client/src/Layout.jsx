import React from 'react';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div>
    <nav>Navigation Bar</nav>
    <main>
      <Outlet />
    </main>
  </div>
  );
};

export default Layout;
