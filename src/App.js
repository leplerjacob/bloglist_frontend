import './App.css'
import React, { useState, useEffect, useRef } from 'react'
import blogService from './services/blog'
import Blog from './components/Blog'
import loginService from './services/login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import blog from './services/blog'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notify, setNotify] = useState(null)

  // Refs
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
    }
  }, [])

  const handleLogin = (login) => {
    loginService
      .login(login)
      .then((user) => {
        setNotify({ success: true, message: 'Login successful' })
        window.localStorage.setItem('loggedBlogUser', JSON.stringify(user))
        setUser(user)
        notifyTimer()
      })
      .catch((err) => {
        setNotify({ success: false, message: 'Invalid Credentials' })
        notifyTimer()
      })
  }

  const handleBlogEntry = (newBlog) => {
    toggleBlogForm.current.toggleVisibility()
    blogService
      .createBlog(newBlog, user)
      .then((blog) => {
        setNotify({
          success: true,
          message: `New blog \"${blog.title}\" by ${blog.author} has been added`,
        })
        notifyTimer()
      })
      .catch((err) => {
        setNotify({
          success: false,
          message: 'An error occurred submitting blog',
        })
        notifyTimer()
      })
  }

  const handleBlogLike = (likedBlog) => {
    console.log()
    blogService
      .updateBlogLikes(likedBlog, user)
      .then((blog) => {
        setNotify({
          success: true,
          message: `${user.username} has liked the blog: \"${blog.title}\"`,
        })
        notifyTimer()
      })
      .catch((err) => {
        setNotify({ success: false, message: 'Blog like not successful'})
        notifyTimer()
      })
    
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

  const loginForm = () => {
    return (
      <div>
        <Togglable buttonLabel="Login" ref={toggleLoginForm}>
          <LoginForm handleSubmit={handleLogin} />
        </Togglable>
      </div>
    )
  }

  const blogForm = () => {
    return (
      <div>
        <Togglable buttonLabel="New Blog" ref={toggleBlogForm}>
          <BlogForm createBlog={handleBlogEntry} user={user} />
        </Togglable>
      </div>
    )
  }

  return (
    <div>
      {notify && <Notification props={notify} />}
      <div className="front">
        {user === null ? loginForm() : blogForm()}
        <div>
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} addLike={handleBlogLike} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default App
