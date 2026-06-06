function FormInput({ label, id, error, className = '', ...props }) {
  return (
    <label className={`block ${className}`}>
      <span className="text-sm font-bold text-slate-700">{label}</span>
      <input
        id={id}
        name={id}
        className={`mt-2 w-full rounded-md border bg-white px-3 py-3 text-slate-950 shadow-sm transition ${
          error ? 'border-red-300' : 'border-slate-300 focus:border-blue-700'
        }`}
        {...props}
      />
      {error ? <span className="mt-1 block text-xs font-semibold text-red-600">{error}</span> : null}
    </label>
  );
}

export default FormInput;
