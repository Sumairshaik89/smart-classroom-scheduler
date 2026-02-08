// Simple frontend-only mock API using localStorage
import { v4 as uuidv4 } from 'uuid'

const STORAGE_KEY = 'ssc_data_v1'

function read(){
  const raw = localStorage.getItem(STORAGE_KEY)
  if(!raw){
    const init = {classrooms:[], faculty:[], courses:[], schedules:[]}
    localStorage.setItem(STORAGE_KEY, JSON.stringify(init))
    return init
  }
  return JSON.parse(raw)
}
function write(data){
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}

export const api = {
  getState(){ return read() },
  getClassrooms(){ return read().classrooms },
  addClassroom(obj){ const s=read(); const item={id:uuidv4(), ...obj}; s.classrooms.push(item); write(s); return item },
  deleteClassroom(id){ const s=read(); s.classrooms=s.classrooms.filter(c=>c.id!==id); write(s) },

  getFaculty(){ return read().faculty },
  addFaculty(obj){ const s=read(); const item={id:uuidv4(), ...obj}; s.faculty.push(item); write(s); return item },
  deleteFaculty(id){ const s=read(); s.faculty=s.faculty.filter(f=>f.id!==id); write(s) },

  getCourses(){ return read().courses },
  addCourse(obj){ const s=read(); const item={id:uuidv4(), ...obj}; s.courses.push(item); write(s); return item },
  deleteCourse(id){ const s=read(); s.courses=s.courses.filter(c=>c.id!==id); write(s) },

  getSchedules(){ return read().schedules },
  addSchedule(obj){ const s=read(); const item={id:uuidv4(), ...obj}; s.schedules.push(item); write(s); return item },
  deleteSchedule(id){ const s=read(); s.schedules=s.schedules.filter(sch=>sch.id!==id); write(s) },

  // conflict detection: same day, overlapping time, same room or same faculty
  detectConflicts(){
    const { schedules, faculty, classrooms, courses } = read()
    const conflicts = []
    for(let i=0;i<schedules.length;i++){
      for(let j=i+1;j<schedules.length;j++){
        const a=schedules[i], b=schedules[j]
        if(a.day !== b.day) continue
        const aStart = parseTime(a.start), aEnd = parseTime(a.end)
        const bStart = parseTime(b.start), bEnd = parseTime(b.end)
        const overlap = aStart < bEnd && bStart < aEnd
        if(!overlap) continue
        if(a.roomId === b.roomId){
          conflicts.push({type:'room', a,b})
        }
        if(a.facultyId === b.facultyId){
          conflicts.push({type:'faculty', a,b})
        }
      }
    }
    return { conflicts, schedules, faculty, classrooms, courses }
  },

  suggestFreeRooms(day, start, end){
    const s = read()
    const occupied = s.schedules.filter(x=>x.day===day && overlaps(start,end,x.start,x.end)).map(x=>x.roomId)
    return s.classrooms.filter(c=>!occupied.includes(c.id))
  }
}

function parseTime(t){ // t -> HH:MM
  const [hh,mm]=t.split(':').map(Number)
  return hh*60+mm
}
function overlaps(s1,e1,s2,e2){
  return parseTime(s1) < parseTime(e2) && parseTime(s2) < parseTime(e1)
}

// add tiny uuid fallback
try{
  if(!uuidv4) throw 0
}catch(e){
  // simple fallback
  import('https://jspm.dev/uuid').then(m=>{ module.exports = m })
}
