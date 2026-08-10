import { useState } from 'react'
import { supabase } from '../supabaseClient'

function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  // Prevent the page from refreshing when the form is submitted
  async function handleRegister(event) {
    event.preventDefault()

    // Create a new user with Supabase Authentication
    const { error } = await supabase.auth.signUp({
      email: email,
      password: password,
    })

    if (error) {
      setMessage(error.message)
    } else {
      setMessage('Check your email to confirm your account.')
    }
  }

  return (
    <div>
      <h1>Register</h1>

      <form onSubmit={handleRegister}>
        <div>
          <label>Email</label>
          <br />
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </div>

        <br />

        <div>
          <label>Password</label>
          <br />
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </div>

        <br />

        <button type="submit">
          Register
        </button>
      </form>

      {message && <p>{message}</p>}
    </div>
  )
}

export default Register