import { Navigate, useParams } from 'react-router-dom';
import EventForm from '../components/EventForm.jsx';
import PageHeader from '../components/PageHeader.jsx';
import { useEvents } from '../hooks/useEvents.js';
import { getEventById } from '../utils/storage.js';

function EditEvent() {
  const { id } = useParams();
  const { upsertEvent } = useEvents();
  const event = getEventById(id);

  if (!event) return <Navigate to="/dashboard" replace />;

  return (
    <>
      <PageHeader
        eyebrow="Edit"
        title="Update event details"
        description="Changes are saved locally in this browser and keep the same QR check-in link."
      />
      <EventForm initialEvent={event} onSave={upsertEvent} />
    </>
  );
}

export default EditEvent;
