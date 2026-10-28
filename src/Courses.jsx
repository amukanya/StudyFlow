
import { useState } from 'react'

function Courses({ courses, onCoursesChange }) {

  const [name, setName] = useState('')
  const [code, setCode] = useState('')

  function saveCourses(updatedCourses) {
    onCoursesChange(updatedCourses)

    localStorage.setItem(
    'studyflow-courses',
    JSON.stringify(updatedCourses)
   )
  }

  function addCourse(event) {
    event.preventDefault()

    if (!name.trim() || !code.trim()) return

    const newCourse = {
      id: crypto.randomUUID(),
      name: name.trim(),
      code: code.trim()
    }

    saveCourses([...courses, newCourse])
    setName('')
    setCode('')
  }

  function removeCourse(id) {
    saveCourses(courses.filter(course => course.id !== id))
  }

  return (
    <section className="courses-section">
      <h2>My Courses</h2>
      <p>Add and manage your classes.</p>

      <form onSubmit={addCourse} className="course-form">
        <input
          type="text"
          placeholder="Course Name"
          value={name}
          onChange={event => setName(event.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Course Code (e.g. CSCE 3444)"
          value={code}
          onChange={event => setCode(event.target.value)}
          required
        />

        <button type="submit">Add Course</button>
      </form>

      <div className="course-list">
        {courses.length === 0 ? (
          <p>No courses added yet.</p>
        ) : (
          courses.map(course => (
            <div key={course.id} className="course-item">
              <div>
                <h3>{course.code}</h3>
                <p>{course.name}</p>
              </div>

              <button
                type="button"
                onClick={() => removeCourse(course.id)}
              >
                Remove
              </button>
            </div>
          ))
        )}
      </div>
    </section>
  )
}

export default Courses
