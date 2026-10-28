
import { useState } from 'react'

function Assignments() {
  const [assignments, setAssignments] = useState(() => {
    try {
      return JSON.parse(
        localStorage.getItem('studyflow-assignments')
      ) || []
    } catch {
      return []
    }
  })

  const [title, setTitle] = useState('')
  const [course, setCourse] = useState('')
  const [dueDate, setDueDate] = useState('')

  const courses = (() => {
    try {
      return JSON.parse(
        localStorage.getItem('studyflow-courses')
      ) || []
    } catch {
      return []
    }
  })()

  function saveAssignments(updated) {
    setAssignments(updated)

    localStorage.setItem(
        'studyflow-assignments',
        JSON.stringify(updated)
    )

    window.dispatchEvent(new Event('studyflow-data-changed'))
  }

  function addAssignment(event) {
    event.preventDefault()

    if (!title.trim() || !course || !dueDate) return

    const assignment = {
      id: crypto.randomUUID(),
      title: title.trim(),
      course,
      dueDate,
      completed: false
    }

    saveAssignments([...assignments, assignment])
    setTitle('')
    setCourse('')
    setDueDate('')
  }

  function toggleComplete(id) {
    saveAssignments(
      assignments.map(item =>
        item.id === id
          ? { ...item, completed: !item.completed }
          : item
      )
    )
  }

  function removeAssignment(id) {
    saveAssignments(
      assignments.filter(item => item.id !== id)
    )
  }

  return (
    <section className="assignments-section">
      <h2>Assignments</h2>
      <p>Track upcoming assignments and deadlines.</p>

      <form onSubmit={addAssignment} className="assignment-form">
        <input
          type="text"
          placeholder="Assignment Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
        />

        <select
          value={course}
          onChange={e => setCourse(e.target.value)}
          required
        >
          <option value="">Select Course</option>
          {courses.map(item => (
            <option key={item.id} value={item.id}>
              {item.code}
            </option>
          ))}
        </select>

        <input
          type="date"
          value={dueDate}
          onChange={e => setDueDate(e.target.value)}
          required
        />

        <button type="submit">Add Assignment</button>
      </form>

      <div className="assignment-list">
        {assignments.length === 0 ? (
          <p>No assignments added yet.</p>
        ) : (
          assignments.map(item => (
            <div key={item.id} className="assignment-item">
              <div>
                <h3>{item.title}</h3>
                <p>
                  {courses.find(c => c.id === item.course)?.code
                    || 'Course unavailable'}
                </p>
                <p>Due: {item.dueDate}</p>
                <p>
                  {item.completed ? 'Completed' : 'Pending'}
                </p>
              </div>

              <div className="assignment-actions">
                <button
                  type="button"
                  onClick={() => toggleComplete(item.id)}
                >
                  {item.completed ? 'Undo' : 'Complete'}
                </button>

                <button
                  type="button"
                  onClick={() => removeAssignment(item.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  )
}

export default Assignments
