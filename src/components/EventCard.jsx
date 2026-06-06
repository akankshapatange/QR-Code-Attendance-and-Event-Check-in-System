import { Link } from 'react-router-dom';
import { formatDate, formatTime } from '../utils/date.js';
import Button from './Button.jsx';

function EventCard({ event, attendanceCount = 0, onDelete }) {
  return (
    <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-soft">
      <div className="flex flex-col gap-4">
        <div>
          <div className="mb-3 flex flex-wrap gap-2">
            <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">
              {attendanceCount} checked in
            </span>
            <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">
              {event.eventLocation || 'Location TBD'}
            </span>
          </div>
          <Link to={`/event/${event.id}`} className="text-xl font-bold text-slate-950 hover:text-blue-700">
            {event.eventName}
          </Link>
          <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-3">
            <div>
              <dt className="font-bold text-slate-500">Date</dt>
              <dd className="mt-1 font-semibold text-slate-950">{formatDate(event.eventDate)}</dd>
            </div>
            <div>
              <dt className="font-bold text-slate-500">Time</dt>
              <dd className="mt-1 font-semibold text-slate-950">{formatTime(event.eventTime)}</dd>
            </div>
            <div>
              <dt className="font-bold text-slate-500">Location</dt>
              <dd className="mt-1 font-semibold text-slate-950">{event.eventLocation}</dd>
            </div>
          </dl>
        </div>

        <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">
          <Button to={`/event/${event.id}`} variant="dark" className="w-full sm:w-auto">
            QR
          </Button>
          <Button to={`/attendance/${event.id}`} variant="light" className="w-full sm:w-auto">
            Attendance
          </Button>
          <Button to={`/edit-event/${event.id}`} variant="light" className="w-full sm:w-auto">
            Edit
          </Button>
          <Button type="button" variant="danger" className="w-full sm:w-auto" onClick={() => onDelete(event.id)}>
            Delete
          </Button>
        </div>
      </div>
    </article>
  );
}

export default EventCard;
