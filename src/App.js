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
  const toggleLoginForm = useRef()
  const toggleBlogForm = useRef()

  useEffect(() => {
    blogService
      .getAll()
      .then((initialBlogs) => {
        // if(initialBlogs.length === 0){

        // }
        setBlogs(initialBlogs)
      })
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
        blog = {...blog, user: {username: user.username, id: blog.user}}
        setBlogs(blogs.concat(blog))
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
    blogService
      .updateBlogLikes(likedBlog, user)
      .then((updatedBlog) => {
        setNotify({
          success: true,
          message: `${user.name} has liked the blog: \"${updatedBlog.title}\"`,
        })
        notifyTimer()
        setBlogs(
          blogs.map((blog) => {
            if (blog.id === updatedBlog.id) {
              return updatedBlog
            }
            return blog
          })
        )
      })
      .catch((err) => {
        setNotify({ success: false, message: 'Blog like not successful' })
        notifyTimer()
      })
  }

  const handleDeleteBlog = (blogToDelete) => {
    blogService
      .deleteBlog(blogToDelete, user)
      .then((deletedBlog) => {
        setNotify({ success: true, message: 'Blog successfully deleted' })
        notifyTimer()
        setBlogs(blogs.filter((blog) => blog.id !== deletedBlog.id))
      })
      .catch((err) => {
        console.log(err)
        setNotify({ success: false, message: 'Blog deletion unsuccessful' })
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
        <div id="blog-list">
          {blogs
            .sort((a, b) => a.likes - b.likes)
            .map((blog) => (
              <Blog
                user={user}
                key={blog.id}
                blog={blog}
                addLike={handleBlogLike}
                deleteBlog={handleDeleteBlog}
              />
            ))}
        </div>
      </div>
    </div>
  )
}

export default App
