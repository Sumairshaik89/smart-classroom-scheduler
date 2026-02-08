import React, { useState, useEffect } from 'react'
import { api } from '../services/mockApi'
import { Card, Field, Small } from '../components/UI'

export default function FacultyCourses(){
  const [facName,setFacName]=useState('')
  const [courseName,setCourseName]=useState('')
  const [faculty,setFaculty]=useState([])
  const [courses,setCourses]=useState([])

  useEffect(()=>{ setFaculty(api.getFaculty()); setCourses(api.getCourses()) },[])

  function addFaculty(e){ e.preventDefault(); if(!facName) return; api.addFaculty({name:facName}); setFaculty(api.getFaculty()); setFacName('') }
  function addCourse(e){ e.preventDefault(); if(!courseName) return; api.addCourse({name:courseName}); setCourses(api.getCourses()); setCourseName('') }

  return (
    <div className="main-shell" style={{gap:12}}>
      <div className="page-head">
        <div>
          <div className="page-title">Faculty & Courses</div>
          <div className="page-subtitle">Create faculty records and map their course catalog.</div>
        </div>
      </div>

      <div className="split-grid">
        <Card>
          <h4 style={{marginTop:0, marginBottom:8}}>Add Faculty</h4>
          <form onSubmit={addFaculty} style={{display:'grid', gap:10}}>
            <Field>
              <input className="input" placeholder="Faculty name" value={facName} onChange={e=>setFacName(e.target.value)} />
            </Field>
            <button className="btn">Add Faculty</button>
          </form>
          <div style={{marginTop:16}}>
            <h4 style={{marginBottom:8}}>Existing</h4>
            {faculty.length===0 ? <Small>No faculty yet.</Small> : (
              <ul className="list-clean">{faculty.map(f=> <li key={f.id}>{f.name}</li>)}</ul>
            )}
          </div>
        </Card>

        <Card>
          <h4 style={{marginTop:0, marginBottom:8}}>Add Course</h4>
          <form onSubmit={addCourse} style={{display:'grid', gap:10}}>
            <Field>
              <input className="input" placeholder="Course name" value={courseName} onChange={e=>setCourseName(e.target.value)} />
            </Field>
            <button className="btn">Add Course</button>
          </form>
          <div style={{marginTop:16}}>
            <h4 style={{marginBottom:8}}>Existing</h4>
            {courses.length===0 ? <Small>No courses yet.</Small> : (
              <ul className="list-clean">{courses.map(c=> <li key={c.id}>{c.name}</li>)}</ul>
            )}
          </div>
        </Card>
      </div>
    </div>
  )
}
