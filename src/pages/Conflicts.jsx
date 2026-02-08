import React, { useState, useEffect } from 'react'
import { api } from '../services/mockApi'
import { Card } from '../components/UI'

export default function Conflicts(){
  const [data,setData]=useState({conflicts:[]})

  function refresh(){ setData(api.detectConflicts()) }
  useEffect(()=>{ refresh() },[])

  return (
    <div className="main-shell" style={{gap:12}}>
      <div className="page-head">
        <div>
          <div className="page-title">Conflict Detection</div>
          <div className="page-subtitle">Detect overlaps by room or faculty and resolve quickly.</div>
        </div>
        <button className="btn" onClick={refresh}>Detect Conflicts</button>
      </div>

      <Card>
        {data.conflicts.length===0 ? <div className="empty-state">No conflicts detected.</div> : (
          <table className="table">
            <thead><tr><th>Type</th><th>Schedule A</th><th>Schedule B</th></tr></thead>
            <tbody>
              {data.conflicts.map((c,i)=> (
                <tr key={i}>
                  <td style={{textTransform:'capitalize'}}>{c.type}</td>
                  <td>{formatEntry(c.a,data)}</td>
                  <td>{formatEntry(c.b,data)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Card>
    </div>
  )
}

function formatEntry(s, data){
  const course = (data.courses||[]).find(x=>x.id===s.courseId) || {}
  const faculty = (data.faculty||[]).find(x=>x.id===s.facultyId) || {}
  const room = (data.classrooms||[]).find(x=>x.id===s.roomId) || {}
  return `${course.name||'Course'} — ${faculty.name||'Faculty'} — ${room.name||'Room'} (${s.day} ${s.start}-${s.end})`
}
