import { Outlet } from 'react-router-dom';
import Navbar from './Navbar.jsx';

function Layout() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="mx-auto w-full max-w-6xl px-4 py-6 sm:py-8 lg:px-6">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
