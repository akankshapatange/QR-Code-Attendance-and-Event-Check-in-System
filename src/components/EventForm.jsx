import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import Button from './Button.jsx';
import FormInput from './FormInput.jsx';

const emptyEvent = {
  eventName: '',
  eventDate: '',
  eventTime: '',
  eventLocation: '',
};

function EventForm({ initialEvent, onSave }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(() => ({
    ...emptyEvent,
    ...initialEvent,
  }));
  const [error, setError] = useState('');

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (
      !formData.eventName.trim() ||
      !formData.eventDate ||
      !formData.eventTime ||
      !formData.eventLocation.trim()
    ) {
      setError('Event name, date, time and location are required.');
      return;
    }

    const now = new Date().toISOString();
    const savedEvent = {
      id: initialEvent?.id || uuidv4(),
      eventName: formData.eventName.trim(),
      eventDate: formData.eventDate,
      eventTime: formData.eventTime,
      eventLocation: formData.eventLocation.trim(),
      createdAt: initialEvent?.createdAt || now,
    };

    onSave(savedEvent);
    navigate(`/event/${savedEvent.id}`);
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-lg border border-slate-200 bg-white p-5 shadow-soft sm:p-6">
      {error ? (
        <div className="mb-5 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
          {error}
        </div>
      ) : null}

      <div className="grid gap-5 md:grid-cols-2">
        <FormInput
          id="eventName"
          label="Event name"
          value={formData.eventName}
          onChange={handleChange}
          placeholder="Annual Tech Meetup"
        />

        <FormInput
          id="eventDate"
          label="Event date"
          type="date"
          value={formData.eventDate}
          onChange={handleChange}
        />

        <FormInput
          id="eventTime"
          label="Event time"
          type="time"
          value={formData.eventTime}
          onChange={handleChange}
        />

        <FormInput
          id="eventLocation"
          label="Event location"
          value={formData.eventLocation}
          onChange={handleChange}
          placeholder="Main Auditorium"
        />
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <Button type="submit">{initialEvent ? 'Update Event' : 'Create Event'}</Button>
        <Button type="button" variant="light" onClick={() => navigate('/dashboard')}>
          Cancel
        </Button>
      </div>
    </form>
  );
}

export default EventForm;
