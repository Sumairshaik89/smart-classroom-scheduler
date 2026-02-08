import React, { useEffect, useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import dayGridPlugin from '@fullcalendar/daygrid'
import { api } from '../services/mockApi'
import { Card } from '../components/UI'

export default function CalendarView(){
  const [events,setEvents]=useState([])

  useEffect(()=>{
    const { schedules, courses } = api.getState()
    const ev = schedules.map(s=>{
      const course = courses.find(c=>c.id===s.courseId) || {name:'Course'}
      const dayMap = { Monday:'2026-02-02', Tuesday:'2026-02-03', Wednesday:'2026-02-04', Thursday:'2026-02-05', Friday:'2026-02-06' }
      const date = dayMap[s.day] || '2026-02-02'
      return { title: course.name, start: `${date}T${s.start}`, end: `${date}T${s.end}` }
    })
    setEvents(ev)
  },[])

  return (
    <div className="main-shell" style={{gap:12}}>
      <div className="page-head">
        <div>
          <div className="page-title">Timetable (Calendar)</div>
          <div className="page-subtitle">Week view of every scheduled session.</div>
        </div>
      </div>
      <Card>
        <FullCalendar plugins={[dayGridPlugin,timeGridPlugin]} initialView="timeGridWeek" events={events} height={640} />
      </Card>
    </div>
  )
}
