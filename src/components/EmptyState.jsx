import Button from './Button.jsx';

function EmptyState({ title, description, actionLabel, actionTo }) {
  return (
    <div className="rounded-lg border border-dashed border-slate-300 bg-white px-6 py-12 text-center shadow-soft">
      <h2 className="text-xl font-bold text-slate-950">{title}</h2>
      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-600">{description}</p>
      {actionLabel && actionTo ? (
        <Button to={actionTo} className="mt-6">
          {actionLabel}
        </Button>
      ) : null}
    </div>
  );
}

export default EmptyState;
