// src/pages/Calendar.jsx
import React from 'react';
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './Calendar.css';

const localizer = momentLocalizer(moment);

const events = [
  { title: 'Event 1', start: new Date(), end: new Date() },
  // Add more events as needed
];

export default function CalendarPage() {
  return (
    <div className="calendar-container">
      <BigCalendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
      />
    </div>
  );
}
