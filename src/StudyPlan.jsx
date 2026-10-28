
import { useState } from 'react'

function StudyPlan({ courses = [] }) {
  const [sessions, setSessions] = useState(() => {
    try {
      return JSON.parse(
        localStorage.getItem('studyflow-sessions') || '[]'
      )
    } catch {
      return []
    }
  })

  const [title, setTitle] = useState('')
  const [date, setDate] = useState('')
  const [duration, setDuration] = useState('')
  const [courseId, setCourseId] = useState('')

  function saveSessions(updatedSessions) {
    setSessions(updatedSessions)

    localStorage.setItem(
        'studyflow-sessions',
        JSON.stringify(updatedSessions)
    )

    window.dispatchEvent(new Event('studyflow-data-changed'))
    
  }

  function addSession(event) {
    event.preventDefault()

    const newSession = {
        id: crypto.randomUUID(),
        title: title.trim(),
        courseId,
        date,
        duration: Number(duration),
        completed: false,
    }

    saveSessions([...sessions, newSession])

    setTitle('')
    setDate('')
    setDuration('')
    setCourseId('')
  }

  function toggleSession(id) {
    const updated = sessions.map((session) =>
      session.id === id
        ? { ...session, completed: !session.completed }
        : session
    )

    saveSessions(updated)
  }

  function removeSession(id) {
    saveSessions(
      sessions.filter((session) => session.id !== id)
    )
  }

  return (
    <div className="study-plan-section">
      <h2>Study Plan</h2>
      <p>Organize your study sessions.</p>

      <form className="study-form" onSubmit={addSession}>
        <input
          type="text"
          placeholder="Study Session Title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          required
        />

        <select
            value={courseId}
            onChange={(event) => setCourseId(event.target.value)}
            required
            >
            <option value="">Select Course</option>

            {courses.map((course) => (
                <option key={course.id} value={course.id}>
                {course.code}
                </option>
            ))}
        </select>

        <input
          type="date"
          value={date}
          onChange={(event) => setDate(event.target.value)}
          required
        />

        <input
          type="number"
          placeholder="Duration (minutes)"
          min="1"
          value={duration}
          onChange={(event) => setDuration(event.target.value)}
          required
        />

        <button type="submit">
          Add Study Session
        </button>
      </form>

      <div className="study-list">
        {sessions.length === 0 ? (
          <p>No study sessions scheduled yet.</p>
        ) : (
          sessions.map((session) => (
            <div className="study-item" key={session.id}>
              <div>
                <h3>{session.title}</h3>

                    {session.courseId && (
                    <p>
                        Course: {
                        courses.find(
                            (course) => course.id === session.courseId
                        )?.code || 'Course removed'
                        }
                    </p>
                    )}

                    <p>Date: {session.date}</p>
                <p>Duration: {session.duration} minutes</p>
                <p>
                  {session.completed ? 'Completed' : 'Pending'}
                </p>
              </div>

              <div className="study-actions">
                <button
                  type="button"
                  onClick={() => toggleSession(session.id)}
                >
                  {session.completed ? 'Undo' : 'Complete'}
                </button>

                <button
                  type="button"
                  onClick={() => removeSession(session.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default StudyPlan
