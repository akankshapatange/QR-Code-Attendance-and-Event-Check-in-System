import EventForm from '../components/EventForm.jsx';
import PageHeader from '../components/PageHeader.jsx';
import { useEvents } from '../hooks/useEvents.js';

function CreateEvent() {
  const { upsertEvent } = useEvents();

  return (
    <>
      <PageHeader
        eyebrow="Create"
        title="Create a new event"
        description="Add event details once. The app will generate a unique QR check-in URL for attendees."
      />
      <EventForm onSave={upsertEvent} />
    </>
  );
}

export default CreateEvent;
