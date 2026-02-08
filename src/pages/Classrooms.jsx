import React, { useState, useEffect } from 'react'
import { api } from '../services/mockApi'
import { Card, Field, Small } from '../components/UI'

export default function Classrooms(){
  const [name,setName]=useState('')
  const [type,setType]=useState('Lecture')
  const [list,setList]=useState([])

  useEffect(()=>{ setList(api.getClassrooms()) },[])

  function add(e){ e.preventDefault(); if(!name) return; api.addClassroom({name,type}); setList(api.getClassrooms()); setName('') }
  function del(id){ api.deleteClassroom(id); setList(api.getClassrooms()) }

  return (
    <div className="main-shell" style={{gap:12}}>
      <div className="page-head">
        <div>
          <div className="page-title">Classrooms & Labs</div>
          <div className="page-subtitle">Track every room with quick type tags.</div>
        </div>
        <div className="badge warning">Local demo data</div>
      </div>

      <Card>
        <form onSubmit={add} className="form-row">
          <Field className="form-field">
            <label className="small">Room name</label>
            <input className="input" placeholder="e.g. B-204" value={name} onChange={e=>setName(e.target.value)} />
          </Field>
          <Field className="form-field">
            <label className="small">Type</label>
            <select className="input" value={type} onChange={e=>setType(e.target.value)}>
              <option>Lecture</option>
              <option>Lab</option>
            </select>
          </Field>
          <button className="btn" style={{minWidth:140}}>Add Room</button>
        </form>
      </Card>

      <Card>
        <table className="table">
          <thead><tr><th>Name</th><th>Type</th><th></th></tr></thead>
          <tbody>
            {list.length===0 && <tr><td colSpan={3}><div className="empty-state">No rooms added yet.</div></td></tr>}
            {list.map(r=> (
              <tr key={r.id}>
                <td>{r.name}</td>
                <td><span className="badge" style={{background:'#e8f6f4', color:'#0f766e'}}>{r.type}</span></td>
                <td style={{textAlign:'right'}}><button className="btn ghost" onClick={()=>del(r.id)}>Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  )
}
