import { useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import Button from '../components/Button.jsx';
import PageHeader from '../components/PageHeader.jsx';
import QRDisplay from '../components/QRDisplay.jsx';
import { useAttendance } from '../hooks/useAttendance.js';
import { formatDate, formatTime } from '../utils/date.js';
import { getEventById } from '../utils/storage.js';

function EventDetails() {
  const { id } = useParams();
  const event = getEventById(id);
  const [copyMessage, setCopyMessage] = useState('');
  const { records: attendance } = useAttendance(id);

  if (!event) return <Navigate to="/dashboard" replace />;

  const checkInUrl = `${window.location.origin}/checkin/${event.id}`;

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(checkInUrl);
      setCopyMessage('Check-in link copied.');
    } catch {
      setCopyMessage('Copy is unavailable in this browser. Select and copy the link manually.');
    }
  }

  return (
    <>
      <PageHeader
        eyebrow="Event QR"
        title={event.eventName}
        description="Display this QR code at the event entrance or share the check-in link with attendees."
        action={<Button to={`/attendance/${event.id}`} variant="dark">View Attendance</Button>}
      />

      <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
        <QRDisplay
          value={checkInUrl}
          onCopy={copyLink}
          checkInPath={`/checkin/${event.id}`}
          copyMessage={copyMessage}
        />

        <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-soft">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <p className="text-sm font-bold text-slate-500">Date</p>
              <p className="mt-1 font-semibold text-slate-950">{formatDate(event.eventDate)}</p>
            </div>
            <div>
              <p className="text-sm font-bold text-slate-500">Time</p>
              <p className="mt-1 font-semibold text-slate-950">{formatTime(event.eventTime)}</p>
            </div>
            <div>
              <p className="text-sm font-bold text-slate-500">Location</p>
              <p className="mt-1 font-semibold text-slate-950">{event.eventLocation}</p>
            </div>
            <div>
              <p className="text-sm font-bold text-slate-500">Checked in</p>
              <p className="mt-1 font-semibold text-slate-950">{attendance.length} attendees</p>
            </div>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button to={`/edit-event/${event.id}`} variant="light">Edit Event</Button>
            <Button to="/dashboard" variant="light">Back to Dashboard</Button>
          </div>
        </section>
      </div>
    </>
  );
}

export default EventDetails;
