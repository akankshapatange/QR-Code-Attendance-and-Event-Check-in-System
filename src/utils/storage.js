const EVENTS_KEY = 'events';
const LEGACY_EVENTS_KEY = 'qr_attendance_events';
const ATTENDANCE_KEY = 'attendanceRecords';
const LEGACY_ATTENDANCE_KEY = 'qr_attendance_records';

const demoEvents = [
  {
    id: 'demo-tech-summit',
    eventName: 'Tech Innovation Summit',
    eventDate: '2026-06-12',
    eventTime: '10:00',
    eventLocation: 'Grand Convention Center',
    createdAt: '2026-05-28T09:00:00.000Z',
  },
  {
    id: 'demo-product-workshop',
    eventName: 'Product Strategy Workshop',
    eventDate: '2026-06-20',
    eventTime: '14:30',
    eventLocation: 'Downtown Business Hub',
    createdAt: '2026-05-28T09:05:00.000Z',
  },
];

function readCollection(key) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : [];
  } catch {
    return [];
  }
}

function writeCollection(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
  window.dispatchEvent(new Event('local-storage-update'));
}

function normalizeEvent(event) {
  if (!event) return null;

  const dateValue = event.eventDate || (event.dateTime ? event.dateTime.slice(0, 10) : '');
  const timeValue = event.eventTime || (event.dateTime ? event.dateTime.slice(11, 16) : '');

  return {
    id: event.id,
    eventName: event.eventName || event.name || '',
    eventDate: dateValue,
    eventTime: timeValue,
    eventLocation: event.eventLocation || event.venue || '',
    createdAt: event.createdAt || new Date().toISOString(),
  };
}

function normalizeAttendance(record) {
  if (!record) return null;

  return {
    id: record.id,
    eventId: record.eventId,
    fullName: record.fullName || record.name || '',
    email: record.email || '',
    attendeeId: record.attendeeId || record.phone || '',
    checkInTime: record.checkInTime || record.checkedInAt || new Date().toISOString(),
  };
}

function seedEventsIfNeeded() {
  const currentEvents = readCollection(EVENTS_KEY);
  if (currentEvents.length > 0) return currentEvents.map(normalizeEvent).filter(Boolean);

  const legacyEvents = readCollection(LEGACY_EVENTS_KEY);
  if (legacyEvents.length > 0) {
    const migratedEvents = legacyEvents.map(normalizeEvent).filter(Boolean);
    writeCollection(EVENTS_KEY, migratedEvents);
    return migratedEvents;
  }

  writeCollection(EVENTS_KEY, demoEvents);
  return demoEvents;
}

function getStoredAttendance() {
  const currentRecords = readCollection(ATTENDANCE_KEY);
  if (currentRecords.length > 0) return currentRecords.map(normalizeAttendance).filter(Boolean);

  const legacyRecords = readCollection(LEGACY_ATTENDANCE_KEY);
  if (legacyRecords.length > 0) {
    const migratedRecords = legacyRecords.map(normalizeAttendance).filter(Boolean);
    writeCollection(ATTENDANCE_KEY, migratedRecords);
    return migratedRecords;
  }

  return [];
}

export function getEvents() {
  return seedEventsIfNeeded().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

export function getEventById(id) {
  return getEvents().find((event) => event.id === id) || null;
}

export function saveEvent(event) {
  const events = getEvents();
  const normalizedEvent = normalizeEvent(event);
  const exists = events.some((item) => item.id === normalizedEvent.id);
  const nextEvents = exists
    ? events.map((item) => (item.id === normalizedEvent.id ? normalizedEvent : item))
    : [normalizedEvent, ...events];

  writeCollection(EVENTS_KEY, nextEvents);
  return normalizedEvent;
}

export function deleteEvent(id) {
  writeCollection(
    EVENTS_KEY,
    getEvents().filter((event) => event.id !== id),
  );
  writeCollection(
    ATTENDANCE_KEY,
    getAllAttendance().filter((record) => record.eventId !== id),
  );
}

export function getAllAttendance() {
  return getStoredAttendance().sort((a, b) => new Date(b.checkInTime) - new Date(a.checkInTime));
}

export function getAttendanceByEvent(eventId) {
  return getAllAttendance().filter((record) => record.eventId === eventId);
}

export function addAttendance(record) {
  const records = getAllAttendance();
  const normalizedRecord = normalizeAttendance(record);
  const isDuplicate = records.some(
    (item) =>
      item.eventId === normalizedRecord.eventId &&
      (item.email.trim().toLowerCase() === normalizedRecord.email.trim().toLowerCase() ||
        item.attendeeId.trim().toLowerCase() === normalizedRecord.attendeeId.trim().toLowerCase()),
  );

  if (isDuplicate) {
    return { ok: false, message: 'This email or attendee ID has already checked in for this event.' };
  }

  writeCollection(ATTENDANCE_KEY, [normalizedRecord, ...records]);
  return { ok: true, message: 'Check-in completed successfully.' };
}
