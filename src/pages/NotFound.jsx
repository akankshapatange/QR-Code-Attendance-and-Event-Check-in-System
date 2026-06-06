import EmptyState from '../components/EmptyState.jsx';

function NotFound() {
  return (
    <EmptyState
      title="Page not found"
      description="The page you opened does not exist in this local attendance app."
      actionLabel="Go to Dashboard"
      actionTo="/dashboard"
    />
  );
}

export default NotFound;
