import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { FaSearch, FaSignOutAlt } from 'react-icons/fa'

export default function Navbar(){
  const { user, logout } = useContext(AuthContext)
  if(!user) return null

  const initial = user.username?.[0]?.toUpperCase() || 'A'

  return (
    <div className="topbar">
      <div className="welcome">Welcome, <span style={{color:'var(--primary-strong)'}}>{user.username}</span></div>

      <div className="search">
        <FaSearch style={{color:'#9ca3af'}} />
        <input placeholder="Search schedules, rooms, faculty..." />
      </div>

      <div className="user-actions">
        <div className="user-pill">
          <div className="avatar">{initial}</div>
          <div style={{fontSize:13}}>{user.username}</div>
        </div>
        <button className="btn ghost" onClick={logout} style={{padding:'0 12px'}}>
          <FaSignOutAlt size={14}/> Logout
        </button>
      </div>
    </div>
  )
}
