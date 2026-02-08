import React, { createContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export const AuthContext = createContext()

export function AuthProvider({ children }){
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  useEffect(()=>{
    const raw = localStorage.getItem('ssc_user')
    if(raw) setUser(JSON.parse(raw))
  },[])

  function login({username, password}){
    // simple static admin credentials for frontend-only app
    if(username === 'admin' && password === 'admin'){
      const u = { username: 'admin', role: 'admin' }
      localStorage.setItem('ssc_user', JSON.stringify(u))
      setUser(u)
      navigate('/')
      return { ok:true }
    }
    return { ok:false, message: 'Invalid credentials' }
  }

  function logout(){
    localStorage.removeItem('ssc_user')
    setUser(null)
    navigate('/login')
  }

  return (
    <AuthContext.Provider value={{user, login, logout}}>
      {children}
    </AuthContext.Provider>
  )
}
