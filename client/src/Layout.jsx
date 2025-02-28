import React from 'react';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div>
    <header>My App Header</header>
    <nav>Navigation Bar</nav>
    <main>
      <Outlet />
    </main>
    <footer>My App Footer</footer>
  </div>
  );
};

export default Layout;
