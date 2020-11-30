import './App.css'
import React, { useState, useEffect } from 'react'
import blogService from './services/blog'
import Blog from './components/Blog'
import loginService from './services/login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [author, setAuthor] = useState('')
  const [notify, setNotify] = useState(null)
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')

  useEffect(() => {
    blogService
      .getAll()
      .then((initialBlogs) => setBlogs(initialBlogs))
      .catch((err) => {
        console.log(err)
      })
  }, [])

  const loginForm = () => {
    return (
      <Togglable buttonLabel="Login">
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleSubmit={handleLogin}
        />
      </Togglable>
    )
  }

  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      const user = await loginService.login({ username, password })
      setNotify({ success: true, message: 'Login successful' })
      notifyTimer()
      window.localStorage.setItem('loggedBlogUser', JSON.stringify(user))
      setUser(user)
      setPassword('')
      setUsername('')
      setTimeout(() => {
        window.localStorage.clear()
      }, 100000)
    } catch (err) {
      console.log(err)
      setNotify({ success: false, message: 'Invalid Credentials' })
      notifyTimer()
    }
  }

  const handleBlogEntry = async (e) => {
    e.preventDefault()

    try {
      const blog = await blogService.createBlog({ title, author, url }, user)
      setNotify({
        success: true,
        message: `New blog \"${blog.title}\" by ${blog.author} has been added`,
      })
      notifyTimer()
      setTitle('')
      setAuthor('')
      setUrl('')
    } catch (err) {
      console.log(err)
      setNotify({
        success: false,
        message: 'An error occurred submitting blog',
      })
      notifyTimer()
    }
  }

  const blogForm = () => (
    <form onSubmit={handleBlogEntry}>
      title:
      <input
        type="text"
        value={title}
        onChange={({ target }) => setTitle(target.value)}
      />
      author:
      <input
        type="text"
        value={author}
        onChange={({ target }) => setAuthor(target.value)}
      />
      url:
      <input
        type="text"
        value={url}
        onChange={({ target }) => setUrl(target.value)}
      />
      <button type="submit">Create Blog</button>
      {logout()}
    </form>
  )

  const notifyTimer = () => {
    setTimeout(() => {
      setNotify(null)
    }, 5000)
  }

  const handleLogout = () => {
    window.localStorage.clear()
    setUser(null)
    setNotify({ success: true, message: 'Succesfully logged out' })
    notifyTimer()
  }

  const logout = () => {
    return <button onClick={handleLogout}>Logout</button>
  }

  return (
    <div>
      {notify && <Notification props={notify} />}
      <div className="front">
        {user === null ? loginForm() : blogForm()}
        <div>
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default App
