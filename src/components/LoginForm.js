import React, { useState, useImperativeHandle } from 'react'

const LoginForm = React.forwardRef((props, ref) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const resetCreds = () => {
    setUsername('')
    setPassword('')
  }

// create seperate submitLogin function

  useImperativeHandle(ref, () => {
    return { resetCreds }
  })

  return (
    <form onSubmit={props.handleSubmit({ username, password })}>
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
})

export default LoginForm
