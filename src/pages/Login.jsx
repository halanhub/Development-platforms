import { useState } from 'react'
import { supabase } from '../supabaseClient'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  async function handleLogin(event) {
    event.preventDefault()

     // Login using the email and password entered in the form
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    })

    if (error) {
      setMessage(error.message)
    } else {
      setMessage('You are logged in.')
    }
  }

  return (
    <div>
      <h1>Login</h1>

      <form onSubmit={handleLogin}>
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

        <button type="submit">Login</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  )
}

export default Login