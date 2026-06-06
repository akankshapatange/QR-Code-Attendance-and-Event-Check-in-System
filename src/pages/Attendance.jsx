import { useMemo, useState } from 'react';
import { CSVLink } from 'react-csv';
import { Navigate, useParams } from 'react-router-dom';
import AttendanceTable from '../components/AttendanceTable.jsx';
import Button from '../components/Button.jsx';
import EmptyState from '../components/EmptyState.jsx';
import FormInput from '../components/FormInput.jsx';
import PageHeader from '../components/PageHeader.jsx';
import { useAttendance } from '../hooks/useAttendance.js';
import { formatDate, formatDateTime, formatTime } from '../utils/date.js';
import { getEventById } from '../utils/storage.js';
import { slugify } from '../utils/text.js';

function Attendance() {
  const { id } = useParams();
  const event = getEventById(id);
  const [searchTerm, setSearchTerm] = useState('');
  const { records } = useAttendance(id);

  if (!event) return <Navigate to="/dashboard" replace />;

  const filteredRecords = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    if (!query) return records;

    return records.filter(
      (record) =>
        record.fullName.toLowerCase().includes(query) ||
        record.email.toLowerCase().includes(query),
    );
  }, [records, searchTerm]);

  const csvData = records.map((record) => ({
    'Event Name': event.eventName,
    'Event Date': formatDate(event.eventDate),
    'Event Time': formatTime(event.eventTime),
    'Event Location': event.eventLocation,
    'Attendee Name': record.fullName,
    Email: record.email,
    'Attendee ID': record.attendeeId,
    'Check-in Time': formatDateTime(record.checkInTime),
  }));
  const csvFilename = `attendance-${slugify(event.eventName)}.csv`;

  return (
    <>
      <PageHeader
        eyebrow="Attendance"
        title={event.eventName}
        description={`${records.length} attendee${records.length === 1 ? '' : 's'} checked in for this event.`}
        action={
          records.length > 0 ? (
            <CSVLink
              data={csvData}
              filename={csvFilename}
              className="inline-flex min-h-10 w-full items-center justify-center rounded-md bg-blue-700 px-4 py-2 text-sm font-bold text-white shadow-sm transition hover:bg-blue-800 active:bg-blue-900 active:text-white sm:w-auto"
            >
              Export CSV
            </CSVLink>
          ) : null
        }
      />

      <section className="mb-6 grid gap-4 lg:grid-cols-[0.7fr_1.3fr]">
        <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-soft">
          <p className="text-sm font-bold uppercase tracking-wide text-slate-500">Total checked in</p>
          <p className="mt-3 text-4xl font-extrabold text-slate-950">{records.length}</p>
          <p className="mt-2 text-sm font-semibold text-slate-500">
            {event.eventName}
          </p>
        </div>

        <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-soft">
          <FormInput
            id="attendanceSearch"
            label="Search attendee by name or email"
            value={searchTerm}
            onChange={(inputEvent) => setSearchTerm(inputEvent.target.value)}
            placeholder="Search attendees"
          />
        </div>
      </section>

      {records.length === 0 ? (
        <EmptyState
          title="No check-ins yet"
          description="Open the event QR page and share the check-in link with attendees."
          actionLabel="View Event QR"
          actionTo={`/event/${event.id}`}
        />
      ) : filteredRecords.length === 0 ? (
        <EmptyState
          title="No attendees found"
          description="Try a different name or email search."
        />
      ) : (
        <AttendanceTable records={filteredRecords} />
      )}

      <div className="mt-5 flex flex-wrap gap-3">
        <Button to={`/event/${event.id}`} variant="light">View Event QR</Button>
        <Button to="/dashboard" variant="light">Back to Dashboard</Button>
      </div>
    </>
  );
}

export default Attendance;
