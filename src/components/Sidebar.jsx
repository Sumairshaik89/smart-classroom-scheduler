import React from 'react'
import { NavLink } from 'react-router-dom'
import { FaChalkboard, FaUserTie, FaCalendarAlt, FaExclamationTriangle, FaHome, FaLayerGroup } from 'react-icons/fa'

export default function Sidebar(){
  return (
    <aside className="sidebar">
      <div className="logo">
        <div className="logo-mark">SC</div>
        <div>
          <div style={{fontWeight:800, letterSpacing:'-0.01em'}}>Smart Scheduler</div>
          <div style={{fontSize:12,opacity:0.9}}>Timetable command center</div>
        </div>
      </div>

      <nav className="menu">
        <NavLink to="/" end className={({isActive})=> isActive? 'active' : ''}><FaHome/> Dashboard</NavLink>
        <NavLink to="/classrooms" className={({isActive})=> isActive? 'active' : ''}><FaChalkboard/> Classrooms</NavLink>
        <NavLink to="/faculty" className={({isActive})=> isActive? 'active' : ''}><FaUserTie/> Faculty & Courses</NavLink>
        <NavLink to="/scheduling" className={({isActive})=> isActive? 'active' : ''}><FaLayerGroup/> Scheduling</NavLink>
        <NavLink to="/conflicts" className={({isActive})=> isActive? 'active' : ''}><FaExclamationTriangle/> Conflicts</NavLink>
        <NavLink to="/calendar" className={({isActive})=> isActive? 'active' : ''}><FaCalendarAlt/> Calendar</NavLink>
      </nav>

      <div className="muted">v1.0 • Frontend demo</div>
    </aside>
  )
}
