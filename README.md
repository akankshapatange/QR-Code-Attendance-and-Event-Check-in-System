# QR Code Attendance and Event Check-in System

A production-ready React.js web application for creating events, generating QR check-in links, recording attendee check-ins, and exporting attendance reports. The app is fully client-side and stores data in the browser with LocalStorage.

## Features

- Create, edit, and delete events
- Demo event data on first load
- Responsive organizer dashboard
- Total events and total checked-in attendees summary cards
- Unique check-in URL for every event
- QR code generation with `qrcode.react`
- Mobile-friendly attendee check-in form
- Required field validation and email validation
- Duplicate check-in prevention by email or attendee ID
- Attendance list per event
- Search attendees by name or email
- CSV export with event and attendee details
- LocalStorage persistence with no backend, Firebase, Redux, or TypeScript

## Installation

Install Node.js, then run:

```bash
npm install
```

## NPM Commands

Start the local development server:

```bash
npm run dev
```

Create a production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## How To Run Locally

1. Open a terminal in the project folder.
2. Run `npm install`.
3. Run `npm run dev`.
4. Open the local URL shown by Vite, usually `http://localhost:5173`.
5. Create an event from the dashboard or use the demo events.
6. Open an event QR page and use the check-in link to submit attendance.

## Folder Structure

```text
src/
  assets/
  components/
    AttendanceTable.jsx
    Button.jsx
    ConfirmationModal.jsx
    EmptyState.jsx
    EventCard.jsx
    EventForm.jsx
    FormInput.jsx
    Layout.jsx
    Navbar.jsx
    PageHeader.jsx
    QRDisplay.jsx
  hooks/
    useAttendance.js
    useEvents.js
  pages/
    Attendance.jsx
    CheckIn.jsx
    CreateEvent.jsx
    Dashboard.jsx
    EditEvent.jsx
    EventDetails.jsx
    Home.jsx
    NotFound.jsx
  styles/
    index.css
  utils/
    date.js
    storage.js
    text.js
  App.jsx
  main.jsx
```

## Routes

- `/` - Home page
- `/dashboard` - Organizer dashboard
- `/create-event` - Create event form
- `/edit-event/:id` - Edit event form
- `/event/:id` - Event QR page
- `/checkin/:id` - Attendee check-in form
- `/attendance/:id` - Event attendance list and CSV export

## Libraries Used

- React.js
- Vite
- React Router DOM
- Tailwind CSS
- qrcode.react
- react-csv
- uuid

## LocalStorage Explanation

The app uses browser LocalStorage only. Data is stored on the same device and browser where the app is used.

LocalStorage keys:

- `events` stores event records
- `attendanceRecords` stores attendee check-in records

Event object:

```js
{
  id,
  eventName,
  eventDate,
  eventTime,
  eventLocation,
  createdAt
}
```

Attendance object:

```js
{
  id,
  eventId,
  fullName,
  email,
  attendeeId,
  checkInTime
}
```

Because there is no backend, clearing browser storage removes events and attendance records. The app also includes a small compatibility migration for older local keys used during development.

## CSV Export

Attendance CSV files are exported from the event attendance page using this filename format:

```text
attendance-eventname.csv
```

Each CSV includes:

- Event Name
- Event Date
- Event Time
- Event Location
- Attendee Name
- Email
- Attendee ID
- Check-in Time

## Production Notes

- The application uses functional components and React Hooks only.
- All routes are handled by React Router DOM.
- Styling is built with Tailwind CSS.
- No backend, Firebase, Redux, or TypeScript is required.
- The UI is responsive for desktop and mobile screens.
