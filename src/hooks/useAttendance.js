import { useCallback, useEffect, useState } from 'react';
import { getAllAttendance, getAttendanceByEvent } from '../utils/storage.js';

export function useAttendance(eventId) {
  const [records, setRecords] = useState([]);

  const refreshAttendance = useCallback(() => {
    setRecords(eventId ? getAttendanceByEvent(eventId) : getAllAttendance());
  }, [eventId]);

  useEffect(() => {
    refreshAttendance();

    window.addEventListener('storage', refreshAttendance);
    window.addEventListener('local-storage-update', refreshAttendance);

    return () => {
      window.removeEventListener('storage', refreshAttendance);
      window.removeEventListener('local-storage-update', refreshAttendance);
    };
  }, [refreshAttendance]);

  return { records, refreshAttendance };
}
