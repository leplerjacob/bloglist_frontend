import './App.css'
import React, { useState, useEffect, useRef } from 'react'
import blogService from './services/blog'
import Blog from './components/Blog'
import loginService from './services/login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notify, setNotify] = useState(null)

  // Refs
  const loginFormRef = useRef()
  const toggleLoginForm = useRef()
  const toggleBlogForm = useRef()

  useEffect(() => {
    blogService
      .getAll()
      .then((initialBlogs) => setBlogs(initialBlogs))
      .catch((err) => {
        console.log(err)
      })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      // blogService.setToken(user.token) Not used yet
    }
  }, [])

  const handleLogin = ({ username, password }) => async (e) => {
    e.preventDefault()

    
    try {
      const user = await loginService.login({ username, password })
      setNotify({ success: true, message: 'Login successful' })
      notifyTimer()
      window.localStorage.setItem('loggedBlogUser', JSON.stringify(user))
      toggleLoginForm.current.toggleVisibility()
      loginFormRef.current.resetCreds()
      setUser(user)
      setTimeout(() => {
        window.localStorage.clear()
      }, 100000)
    } catch (err) {
      console.log(err)
      setNotify({ success: false, message: 'Invalid Credentials' })
      notifyTimer()
    }
  }

  const handleBlogEntry = (newBlog) => async (e) => {
    e.preventDefault()

    try {
      const blog = await blogService.createBlog(newBlog)
      toggleBlogForm.current.toggleVisibility()
      setNotify({
        success: true,
        message: `New blog \"${blog.title}\" by ${blog.author} has been added`,
      })
      notifyTimer()
    } catch (err) {
      console.log(err)
      setNotify({
        success: false,
        message: 'An error occurred submitting blog',
      })
      notifyTimer()
    }
  }


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
        {user === null ? (
          <Togglable buttonLabel="Login" ref={toggleLoginForm}>
            <LoginForm handleSubmit={handleLogin} ref={loginFormRef}/>
          </Togglable>
        ) : (
          <Togglable buttonLabel="New Blog" ref={toggleBlogForm}>
            <BlogForm createBlog={handleBlogEntry} user={user} />
          </Togglable>
        )}
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
