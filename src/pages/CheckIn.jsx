import { useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import Button from '../components/Button.jsx';
import FormInput from '../components/FormInput.jsx';
import PageHeader from '../components/PageHeader.jsx';
import { formatDate, formatTime } from '../utils/date.js';
import { addAttendance, getEventById } from '../utils/storage.js';

function CheckIn() {
  const { id } = useParams();
  const event = getEventById(id);
  const [formData, setFormData] = useState({ fullName: '', email: '', attendeeId: '' });
  const [message, setMessage] = useState(null);

  if (!event) return <Navigate to="/dashboard" replace />;

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function handleSubmit(event) {
    event.preventDefault();
    const fullName = formData.fullName.trim();
    const email = formData.email.trim();
    const attendeeId = formData.attendeeId.trim();

    if (!fullName || !email || !attendeeId) {
      setMessage({ type: 'error', text: 'Full name, email address and attendee ID are required.' });
      return;
    }

    if (!isValidEmail(email)) {
      setMessage({ type: 'error', text: 'Enter a valid email address.' });
      return;
    }

    const result = addAttendance({
      id: uuidv4(),
      eventId: id,
      fullName,
      email,
      attendeeId,
      checkInTime: new Date().toISOString(),
    });

    setMessage({ type: result.ok ? 'success' : 'error', text: result.message });
    if (result.ok) setFormData({ fullName: '', email: '', attendeeId: '' });
  }

  return (
    <>
      <PageHeader
        eyebrow="Check-in"
        title={event.eventName}
        description={`${event.eventLocation} | ${formatDate(event.eventDate)} at ${formatTime(event.eventTime)}`}
      />

      <form onSubmit={handleSubmit} className="mx-auto max-w-2xl rounded-lg border border-slate-200 bg-white p-5 shadow-soft sm:p-6">
        {message ? (
          <div
            className={`mb-5 rounded-md border px-4 py-3 text-sm font-semibold ${
              message.type === 'success'
                ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
                : 'border-red-200 bg-red-50 text-red-700'
            }`}
          >
            {message.text}
          </div>
        ) : null}

        <div className="space-y-5">
          <FormInput
            id="fullName"
            label="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Avery Johnson"
            required
          />
          <FormInput
            id="email"
            label="Email Address"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="avery@example.com"
            required
          />
          <FormInput
            id="attendeeId"
            label="Student ID / Attendee ID"
            value={formData.attendeeId}
            onChange={handleChange}
            placeholder="STU-10042"
            required
          />
        </div>

        <Button type="submit" className="mt-6 w-full sm:w-auto">
          Complete Check-in
        </Button>
      </form>
    </>
  );
}

export default CheckIn;
