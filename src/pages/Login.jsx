import React, { useState, useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { Small } from '../components/UI'

export default function Login(){
  const { login } = useContext(AuthContext)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [err, setErr] = useState('')

  async function submit(e){
    e.preventDefault()
    const res = login({username,password})
    if(!res.ok) setErr(res.message)
  }

  return (
    <div className="center-wrap">
      <div className="login-shell">
        <div className="login-panel hero">
          <h2 style={{marginBottom:10}}>Smart Scheduler</h2>
          <div className="small">Admin portal for rooms, faculty, schedules and conflict resolution.</div>
          <div style={{marginTop:18, display:'grid', gap:10}}>
            <div className="badge warning">Demo mode</div>
            <Small>Use <strong>admin</strong> / <strong>admin</strong> to continue.</Small>
          </div>
        </div>
        <div className="login-panel">
          <div style={{marginBottom:16}}>
            <div className="page-title" style={{fontSize:'1.4rem'}}>Sign in</div>
            <div className="small">Secure access to scheduling controls.</div>
          </div>
          <form onSubmit={submit} style={{display:'grid', gap:12}}>
            <div className="form-field">
              <label className="small">Username</label>
              <input className="input" placeholder="Enter username" value={username} onChange={e=>setUsername(e.target.value)} />
            </div>
            <div className="form-field">
              <label className="small">Password</label>
              <input type="password" className="input" placeholder="Enter password" value={password} onChange={e=>setPassword(e.target.value)} />
            </div>
            {err && <div className="badge danger">{err}</div>}
            <button className="btn" type="submit">Login</button>
          </form>
        </div>
      </div>
    </div>
  )
}
