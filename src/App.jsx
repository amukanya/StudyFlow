
import { useState } from 'react'
import './App.css'
import Dashboard from './Dashboard'


function App() {
  const [currentScreen, setCurrentScreen] = useState('welcome')


  if (currentScreen === 'dashboard') {
  return (
    <Dashboard
      onLogout={() => setCurrentScreen('welcome')}
    />
  )
  }
  
  if (currentScreen === 'register') {
    return (
      <main className="welcome-container">
        <form
          className="register-card"
          onSubmit={(event) => {
            event.preventDefault()

            const data = new FormData(event.currentTarget)
            const password = data.get('password')
            const confirm = data.get('confirmPassword')

            if (password !== confirm) {
              alert('Passwords do not match.')
              return
            }

            alert(
              'Form validated! Account creation will be enabled when the backend is ready.'
            )
          }}
        >
          <h1>Create Account</h1>
          <p>Start your journey with StudyFlow.</p>

          <label htmlFor="fullName">Full Name</label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            placeholder="Enter your full name"
            required
          />

          <label htmlFor="email">Email Address</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email"
            required
          />

          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Create a password"
            minLength={8}
            required
          />

          <label htmlFor="confirmPassword">
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            placeholder="Confirm your password"
            minLength={8}
            required
          />

          <button type="submit" className="get-started-btn">
            Create Account
          </button>

          <button
            type="button"
            className="back-btn"
            onClick={() => setCurrentScreen('welcome')}
          >
            Back
          </button>
        </form>
      </main>
    )
  }

 
  if (currentScreen === 'forgot-password') {
    return (
      <main className="welcome-container">
        <form
          className="register-card"
          onSubmit={(event) => {
            event.preventDefault()

            alert(
              'Password reset request validated! Email delivery will be enabled when the backend is ready.'
            )
          }}
        >
          <h1>Reset Password</h1>
          <p>
            Enter your email address to request a password
            reset link.
          </p>

          <label htmlFor="resetEmail">Email Address</label>
          <input
            id="resetEmail"
            name="email"
            type="email"
            placeholder="Enter your email"
            autoComplete="email"
            required
          />

          <button type="submit" className="get-started-btn">
            Send Reset Link
          </button>

          <button
            type="button"
            className="back-btn"
            onClick={() => setCurrentScreen('login')}
          >
            Back to Login
          </button>
        </form>
      </main>
    )
  }

  
  if (currentScreen === 'login') {
    return (
      <main className="welcome-container">
        <form
          className="register-card"
          onSubmit={(event) => {
            event.preventDefault()

            alert(
              'Login form validated! Authentication will be enabled when the backend is ready.'
            )
          }}
        >
          <h1>Log In</h1>
          <p>Welcome back to StudyFlow.</p>

          <label htmlFor="loginEmail">Email Address</label>
          <input
            id="loginEmail"
            name="email"
            type="email"
            placeholder="Enter your email"
            autoComplete="email"
            required
          />

          <label htmlFor="loginPassword">Password</label>
          <input
            id="loginPassword"
            name="password"
            type="password"
            placeholder="Enter your password"
            autoComplete="current-password"
            required
          />

          <button type="submit" className="get-started-btn">
            Log In
          </button>

          <button
            type="button"
            className="back-btn"
            onClick={() => setCurrentScreen('forgot-password')}
          >
            Forgot Password?
          </button>

          <p>
            Don't have an account?{' '}
            <a
              href="#register"
              onClick={(event) => {
                event.preventDefault()
                setCurrentScreen('register')
              }}
            >
              Create Account
            </a>
          </p>

          <button
            type="button"
            className="back-btn"
            onClick={() => setCurrentScreen('welcome')}
          >
            Back
          </button>
        </form>
      </main>
    )
  }


  return (
    <main className="welcome-container">
      <div className="welcome-content">
        <h1>StudyFlow</h1>
        <h2>Plan. Progress. Adapt.</h2>

        <p>Your academic planner and progress companion.</p>

        <button
          className="get-started-btn"
          onClick={() => setCurrentScreen('register')}
        >
          Get Started
        </button>

        <button
          type="button"
          onClick={() => setCurrentScreen('dashboard')}
        >
          Preview Dashboard
        </button>

        <p className="login-text">
          Already have an account?{' '}
          <a
            href="#login"
            onClick={(event) => {
              event.preventDefault()
              setCurrentScreen('login')
            }}
          >
            Log In
          </a>
        </p>
      </div>
    </main>
  )
}

export default App
