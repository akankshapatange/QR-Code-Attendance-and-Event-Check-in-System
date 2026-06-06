import { Link } from 'react-router-dom';
import Button from '../components/Button.jsx';
import { useAttendance } from '../hooks/useAttendance.js';
import { useEvents } from '../hooks/useEvents.js';

function Home() {
  const { events } = useEvents();
  const { records } = useAttendance();
  const attendanceCount = records.length;

  return (
    <section className="grid gap-8 py-4 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
      <div>
        <p className="mb-3 text-sm font-bold uppercase tracking-wide text-blue-700">LocalStorage QR attendance</p>
        <h1 className="max-w-3xl text-4xl font-extrabold leading-tight text-slate-950 sm:text-5xl">
          QR Code Attendance and Event Check-in System
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
          Create events, generate check-in QR codes, collect attendee records and export attendance as CSV without a backend.
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <Button to="/create-event">Create Event</Button>
          <Button to="/dashboard" variant="light">
            Open Dashboard
          </Button>
        </div>
      </div>

      <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-soft">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-lg bg-slate-50 p-5">
            <p className="text-sm font-bold text-slate-500">Events</p>
            <p className="mt-2 text-4xl font-extrabold text-slate-950">{events.length}</p>
          </div>
          <div className="rounded-lg bg-slate-50 p-5">
            <p className="text-sm font-bold text-slate-500">Check-ins</p>
            <p className="mt-2 text-4xl font-extrabold text-slate-950">{attendanceCount}</p>
          </div>
        </div>
        <div className="mt-5 rounded-lg bg-[#12355b] p-5 text-white">
          <p className="text-sm font-semibold text-blue-100">Fast workflow</p>
          <ol className="mt-4 space-y-3 text-sm leading-6">
            <li>1. Create an event from the dashboard.</li>
            <li>2. Share or display the generated QR code.</li>
            <li>3. Export attendance records whenever needed.</li>
          </ol>
        </div>
        {events[0] ? (
          <Link to={`/event/${events[0].id}`} className="mt-4 block text-sm font-bold text-blue-700 hover:text-blue-800">
            Continue with {events[0].eventName}
          </Link>
        ) : null}
      </div>
    </section>
  );
}

export default Home;
