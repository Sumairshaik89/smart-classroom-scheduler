import React, { useEffect, useState } from 'react'
import { api } from '../services/mockApi'
import { Card, Field, Small } from '../components/UI'

export default function Scheduling(){
  const [classrooms,setClassrooms]=useState([])
  const [faculty,setFaculty]=useState([])
  const [courses,setCourses]=useState([])
  const [schedules,setSchedules]=useState([])

  const [courseId,setCourseId]=useState('')
  const [facultyId,setFacultyId]=useState('')
  const [roomId,setRoomId]=useState('')
  const [day,setDay]=useState('Monday')
  const [start,setStart]=useState('09:00')
  const [end,setEnd]=useState('10:00')
  const [msg,setMsg]=useState('')

  useEffect(()=>{
    setClassrooms(api.getClassrooms())
    setFaculty(api.getFaculty())
    setCourses(api.getCourses())
    setSchedules(api.getSchedules())
  },[])

  function add(e){
    e.preventDefault()
    if(!courseId||!facultyId||!roomId) { setMsg('Select course, faculty and room'); return }
    const obj = { courseId, facultyId, roomId, day, start, end }
    api.addSchedule(obj)
    setSchedules(api.getSchedules())
    setMsg('Schedule added')
    setTimeout(()=>setMsg(''),1800)
  }

  return (
    <div className="main-shell" style={{gap:12}}>
      <div className="page-head">
        <div>
          <div className="page-title">Scheduling</div>
          <div className="page-subtitle">Build the weekly grid with courses, faculty, and rooms.</div>
        </div>
      </div>

      <div className="split-grid">
        <Card>
          <form onSubmit={add} style={{display:'grid', gap:10}}>
            <Field label="Course">
              <select className="input" value={courseId} onChange={e=>setCourseId(e.target.value)}>
                <option value="">Select</option>
                {courses.map(c=> <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </Field>

            <Field label="Faculty">
              <select className="input" value={facultyId} onChange={e=>setFacultyId(e.target.value)}>
                <option value="">Select</option>
                {faculty.map(f=> <option key={f.id} value={f.id}>{f.name}</option>)}
              </select>
            </Field>

            <Field label="Room">
              <select className="input" value={roomId} onChange={e=>setRoomId(e.target.value)}>
                <option value="">Select</option>
                {classrooms.map(r=> <option key={r.id} value={r.id}>{r.name} ({r.type})</option>)}
              </select>
            </Field>

            <div className="form-row" style={{alignItems:'flex-end'}}>
              <Field className="form-field">
                <label className="small">Day</label>
                <select className="input" value={day} onChange={e=>setDay(e.target.value)}>
                  <option>Monday</option>
                  <option>Tuesday</option>
                  <option>Wednesday</option>
                  <option>Thursday</option>
                  <option>Friday</option>
                </select>
              </Field>
              <Field>
                <label className="small">Start</label>
                <input className="input" type="time" value={start} onChange={e=>setStart(e.target.value)} />
              </Field>
              <Field>
                <label className="small">End</label>
                <input className="input" type="time" value={end} onChange={e=>setEnd(e.target.value)} />
              </Field>
            </div>

            <div style={{display:'flex',gap:10,alignItems:'center'}}>
              <button className="btn">Add Schedule</button>
              <div className="small">{msg}</div>
            </div>
          </form>
        </Card>

        <Card>
          <h4 style={{marginTop:0}}>Existing Schedules</h4>
          <table className="table">
            <thead><tr><th>Course</th><th>Faculty</th><th>Room</th><th>Day</th><th>Time</th></tr></thead>
            <tbody>
              {schedules.length===0 && <tr><td colSpan={5}><div className="empty-state">No schedules yet.</div></td></tr>}
              {schedules.map(s=> (
                <tr key={s.id}><td>{(courses.find(c=>c.id===s.courseId)||{}).name}</td><td>{(faculty.find(f=>f.id===s.facultyId)||{}).name}</td><td>{(classrooms.find(r=>r.id===s.roomId)||{}).name}</td><td>{s.day}</td><td>{s.start} - {s.end}</td></tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>
    </div>
  )
}
