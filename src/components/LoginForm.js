import React, { useState } from 'react'

const LoginForm = ({handleSubmit}) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const submitLogin =(e) => {
    e.preventDefault()
    handleSubmit({username, password})
  }

  return (
    <form onSubmit={submitLogin}>
      <h2>Login</h2>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )
}

export default LoginForm
