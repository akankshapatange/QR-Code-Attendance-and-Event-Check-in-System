import { useCallback, useEffect, useState } from 'react';
import { deleteEvent, getEvents, saveEvent } from '../utils/storage.js';

export function useEvents() {
  const [events, setEvents] = useState([]);

  const refreshEvents = useCallback(() => {
    setEvents(getEvents());
  }, []);

  useEffect(() => {
    refreshEvents();

    window.addEventListener('storage', refreshEvents);
    window.addEventListener('local-storage-update', refreshEvents);

    return () => {
      window.removeEventListener('storage', refreshEvents);
      window.removeEventListener('local-storage-update', refreshEvents);
    };
  }, [refreshEvents]);

  const upsertEvent = useCallback(
    (event) => {
      const saved = saveEvent(event);
      refreshEvents();
      return saved;
    },
    [refreshEvents],
  );

  const removeEvent = useCallback(
    (id) => {
      deleteEvent(id);
      refreshEvents();
    },
    [refreshEvents],
  );

  return { events, refreshEvents, upsertEvent, removeEvent };
}
