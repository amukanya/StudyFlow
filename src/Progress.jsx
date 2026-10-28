import { useState, useEffect } from 'react'

function Progress() {
  const [assignments, setAssignments] = useState([])
  const [sessions, setSessions] = useState([])

  useEffect(() => {
    function loadProgress() {
      try {
        setAssignments(
          JSON.parse(
            localStorage.getItem('studyflow-assignments') || '[]'
          )
        )

        setSessions(
          JSON.parse(
            localStorage.getItem('studyflow-sessions') || '[]'
          )
        )
      } catch {
        setAssignments([])
        setSessions([])
      }
    }

    loadProgress()

    window.addEventListener('storage', loadProgress)
    window.addEventListener('studyflow-data-changed', loadProgress)

    return () => {
      window.removeEventListener('storage', loadProgress)
      window.removeEventListener('studyflow-data-changed', loadProgress)
    }
  }, [])

  const totalAssignments = assignments.length
  const completedAssignments = assignments.filter(
    item => item.completed
  ).length

  const totalSessions = sessions.length
  const completedSessions = sessions.filter(
    session => session.completed
  ).length

  const totalTasks = totalAssignments + totalSessions
  const completedTasks = completedAssignments + completedSessions

  const percentage = totalTasks === 0
    ? 0
    : Math.round((completedTasks / totalTasks) * 100)

  return (
    <div className="progress-section">
      <h2>Progress</h2>
      <p>Monitor your academic progress.</p>

      <div className="progress-summary">
        <p>
          Assignments: {completedAssignments} / {totalAssignments} completed
        </p>

        <p>
          Study Sessions: {completedSessions} / {totalSessions} completed
        </p>

        <h3>Overall Completion: {percentage}%</h3>

        <div className="progress-bar">
          <div
            className="progress-bar-fill"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    </div>
  )
}

export default Progress