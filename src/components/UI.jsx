import React from 'react'

export function Card({children, className=''}){
  return <div className={`card ${className}`}>{children}</div>
}

export function Field({label, children, className=''}){
  return (
    <div className={className} style={{marginBottom:12}}>
      {label && <div className="small" style={{marginBottom:6}}>{label}</div>}
      {children}
    </div>
  )
}

export function Small({children}){ return <div className="small">{children}</div> }

export function Toolbar({children}){ return <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>{children}</div> }

export function Avatar({label, size=36}){
  const style = {width:size,height:size,borderRadius:999,display:'flex',alignItems:'center',justifyContent:'center',background:'linear-gradient(135deg,#ff7a7a,#ffb86b)',color:'#fff',fontWeight:700}
  return <div style={style}>{label}</div>
}

export function IconButton({children,onClick}){ return <button onClick={onClick} style={{background:'transparent',border:'none',cursor:'pointer'}}>{children}</button> }

export default { Card, Field, Small, Toolbar }
