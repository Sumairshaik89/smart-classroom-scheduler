import React from 'react'
import { Card } from '../components/UI'

export default function Dashboard(){
  return (
    <div className="main-shell" style={{gap:12}}>
      <div className="page-head">
        <div>
          <div className="page-title">Dashboard</div>
          <div className="page-subtitle">Control center for scheduling, rooms, faculty, conflicts and calendar.</div>
        </div>
        <div style={{display:'flex', gap:8, flexWrap:'wrap'}}>
          <button className="btn">Quick Schedule</button>
          <button className="btn secondary">View Calendar</button>
        </div>
      </div>

      <div className="stat-grid">
        {[
          {label:'Rooms', value:'Classrooms & Labs'},
          {label:'People', value:'Faculty & Courses'},
          {label:'Schedules', value:'Sessions by day'},
          {label:'Conflicts', value:'Resolve issues fast'},
        ].map((item,i)=>(
          <div key={i} className="stat-card">
            <div className="small" style={{textTransform:'uppercase', letterSpacing:'0.06em'}}>{item.label}</div>
            <div className="kpi">{item.value}</div>
          </div>
        ))}
      </div>

      <Card>
        <p className="small">Use the left navigation to manage rooms, faculty, courses, schedules and conflict detection. Generate schedules, inspect the week view, and keep data in sync — all within this demo UI.</p>
      </Card>
    </div>
  )
}
