import { NavLink } from 'react-router-dom';

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'Dashboard', to: '/dashboard' },
  { label: 'Create Event', to: '/create-event' },
];

function getNavLinkClass(isActive) {
  const baseClasses = 'rounded-md px-3 py-2 text-sm font-semibold transition';
  const activeClasses = 'bg-blue-700 text-white shadow-sm hover:bg-blue-800 active:bg-blue-900 active:text-white';
  const inactiveClasses = 'text-slate-600 hover:bg-blue-50 hover:text-blue-800 active:bg-blue-100 active:text-blue-900';

  return `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`;
}

function Navbar() {
  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between lg:px-6">
        <NavLink to="/" className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-lg bg-blue-700 text-lg font-bold text-white">
            QR
          </span>
          <span>
            <span className="block text-base font-bold text-slate-950">Event Check-in</span>
            <span className="block text-xs font-medium text-slate-500">QR attendance system</span>
          </span>
        </NavLink>

        <div className="flex flex-wrap gap-2">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => getNavLinkClass(isActive)}
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
