export function formatDateTime(value) {
  if (!value) return 'Not scheduled';

  return new Intl.DateTimeFormat(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(value));
}

export function formatDate(value) {
  if (!value) return 'Not scheduled';

  return new Intl.DateTimeFormat(undefined, {
    dateStyle: 'medium',
  }).format(new Date(`${value}T00:00:00`));
}

export function formatTime(value) {
  if (!value) return 'Time TBD';

  return new Intl.DateTimeFormat(undefined, {
    hour: 'numeric',
    minute: '2-digit',
  }).format(new Date(`2000-01-01T${value}`));
}

export function formatEventDateTime(event) {
  if (!event?.eventDate || !event?.eventTime) return 'Not scheduled';
  return formatDateTime(`${event.eventDate}T${event.eventTime}`);
}
