import { Link } from 'react-router-dom';

const variants = {
  primary: 'bg-blue-700 text-white hover:bg-blue-800 active:bg-blue-900 active:text-white',
  dark: 'bg-blue-700 text-white hover:bg-blue-800 active:bg-blue-900 active:text-white',
  light: 'bg-white text-slate-700 ring-1 ring-slate-200 hover:bg-blue-50 hover:text-blue-800 active:bg-blue-100 active:text-blue-900',
  danger: 'bg-red-600 text-white hover:bg-red-700 active:bg-red-800 active:text-white',
};

function Button({ children, to, variant = 'primary', className = '', ...props }) {
  const classes = `inline-flex min-h-10 items-center justify-center rounded-md px-4 py-2 text-sm font-bold shadow-sm transition disabled:cursor-not-allowed disabled:opacity-60 ${variants[variant]} ${className}`;

  if (to) {
    return (
      <Link to={to} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}

export default Button;
