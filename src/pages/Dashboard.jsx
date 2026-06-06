import { useMemo, useState } from 'react';
import Button from '../components/Button.jsx';
import ConfirmationModal from '../components/ConfirmationModal.jsx';
import EmptyState from '../components/EmptyState.jsx';
import EventCard from '../components/EventCard.jsx';
import PageHeader from '../components/PageHeader.jsx';
import { useAttendance } from '../hooks/useAttendance.js';
import { useEvents } from '../hooks/useEvents.js';

function Dashboard() {
  const { events, removeEvent } = useEvents();
  const { records } = useAttendance();
  const [eventToDelete, setEventToDelete] = useState(null);
  const totalAttendees = useMemo(() => records.length, [records]);

  function handleDelete(id) {
    setEventToDelete(events.find((event) => event.id === id) || null);
  }

  function confirmDelete() {
    if (!eventToDelete) return;
    removeEvent(eventToDelete.id);
    setEventToDelete(null);
  }

  return (
    <>
      <PageHeader
        eyebrow="Dashboard"
        title="Manage events and attendance"
        description="View event QR codes, open check-in pages, edit details and export attendee records."
        action={<Button to="/create-event">New Event</Button>}
      />

      <section className="mb-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-soft">
          <p className="text-sm font-bold uppercase tracking-wide text-slate-500">Total events</p>
          <p className="mt-3 text-4xl font-extrabold text-slate-950">{events.length}</p>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-soft">
          <p className="text-sm font-bold uppercase tracking-wide text-slate-500">Total attendees checked in</p>
          <p className="mt-3 text-4xl font-extrabold text-slate-950">{totalAttendees}</p>
        </div>
      </section>

      {events.length === 0 ? (
        <EmptyState
          title="No events yet"
          description="Create your first event to generate a QR check-in link and start recording attendance."
          actionLabel="Create Event"
          actionTo="/create-event"
        />
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {events.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              attendanceCount={records.filter((record) => record.eventId === event.id).length}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      <ConfirmationModal
        isOpen={Boolean(eventToDelete)}
        title="Delete event?"
        message={`This will permanently delete "${eventToDelete?.eventName || 'this event'}" and its attendance records from this browser.`}
        confirmLabel="Delete Event"
        onCancel={() => setEventToDelete(null)}
        onConfirm={confirmDelete}
      />
    </>
  );
}

export default Dashboard;
