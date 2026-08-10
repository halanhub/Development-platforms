import { useEffect, useState } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import { supabase } from './supabaseClient'

import Articles from './pages/Articles'
import Login from './pages/Login'
import Register from './pages/Register'
import CreateArticle from './pages/CreateArticle'

function App() {
  const [session, setSession] = useState(null)

  // Check if the user is already logged in when the app starts
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session)
    })

    // Listen for login and logout changes and update
    const { data } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session)
      }
    )

      // Stop listening when the component is removed
    return () => {
      data.subscription.unsubscribe()
    }
  }, [])

  async function handleLogout() {
    await supabase.auth.signOut()
  }

  return (
    <>
      <nav>
        <Link to="/">Articles</Link>
{/* Show login and register only when logged out */}
        {!session && <Link to="/login">Login</Link>}

        {!session && <Link to="/register">Register</Link>}
{/* Show create article and logout only when logged in */}
        {session && <Link to="/create">Create Article</Link>}

        {session && (
          <button onClick={handleLogout}>
            Logout
          </button>
        )}
      </nav>

      <main>
        <Routes>
          <Route path="/" element={<Articles />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
  path="/create"
  element={
    session
      ? <CreateArticle />
      : <p>You must be logged in to create an article.</p>
  }
/>
        </Routes>
      </main>
    </>
  )
}

export default App