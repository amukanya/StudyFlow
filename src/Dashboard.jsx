import { useState } from 'react'
import './Dashboard.css'
import Courses from './Courses'
import Assignments from './Assignments'
import StudyPlan from './StudyPlan'
import Progress from './Progress'

function Dashboard({ onLogout }) {

  const [courses, setCourses] = useState(() => {
  try {
    return JSON.parse(
      localStorage.getItem('studyflow-courses') || '[]'
    )
  } catch {
    return []
  }
  })

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>StudyFlow</h1>

        <button
          className="logout-btn"
          onClick={onLogout}
        >
          Log Out
        </button>
      </header>

      <main className="dashboard-content">
        <h2>Dashboard</h2>

        <p className="dashboard-subtitle">
          Welcome to your academic planner.
        </p>

        <div className="dashboard-grid">
          <section className="dashboard-card">
            <Courses
              courses={courses}
              onCoursesChange={setCourses}
            />
          </section>

          <section className="dashboard-card">
            <Assignments />
          </section>

          <section className="dashboard-card">
            <StudyPlan courses={courses} />
          </section>

          <section className="dashboard-card">
            <Progress />
          </section>
        </div>
      </main>
    </div>
  )
}

export default Dashboard
