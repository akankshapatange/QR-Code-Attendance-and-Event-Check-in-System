import { formatDateTime } from '../utils/date.js';

function AttendanceTable({ records }) {
  return (
    <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-soft">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
            <tr>
              <th className="px-4 py-3">Full Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Attendee ID</th>
              <th className="px-4 py-3">Check-in Time</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {records.map((record) => (
              <tr key={record.id} className="hover:bg-slate-50">
                <td className="px-4 py-4 font-semibold text-slate-950">{record.fullName}</td>
                <td className="px-4 py-4 text-slate-600">{record.email}</td>
                <td className="px-4 py-4 text-slate-600">{record.attendeeId}</td>
                <td className="px-4 py-4 text-slate-600">{formatDateTime(record.checkInTime)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AttendanceTable;
