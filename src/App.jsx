import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import Attendance from './pages/Attendance.jsx';
import CheckIn from './pages/CheckIn.jsx';
import CreateEvent from './pages/CreateEvent.jsx';
import Dashboard from './pages/Dashboard.jsx';
import EditEvent from './pages/EditEvent.jsx';
import EventDetails from './pages/EventDetails.jsx';
import Home from './pages/Home.jsx';
import NotFound from './pages/NotFound.jsx';

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create-event" element={<CreateEvent />} />
        <Route path="/edit-event/:id" element={<EditEvent />} />
        <Route path="/event/:id" element={<EventDetails />} />
        <Route path="/checkin/:id" element={<CheckIn />} />
        <Route path="/attendance/:id" element={<Attendance />} />
        <Route path="/home" element={<Navigate to="/" replace />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
