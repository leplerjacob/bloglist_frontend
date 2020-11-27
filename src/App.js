import './App.css'
import React, { useState, useEffect } from 'react'
import blogService from './services/blog'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [author, setAuthor] = useState('')

  useEffect(() => {
    blogService
      .getAll()
      .then((initialBlogs) => setBlogs(initialBlogs))
      .catch((err) => {
        console.log(err)
      })
  }, [])

  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBlogUser', JSON.stringify(user))
      setUser(user)
      setPassword('')
      setUsername('')
      setTimeout(() => {
        window.localStorage.clear()
      }, 100000)
    } catch (err) {
      console.log(err)
    }
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
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

  const handleBlogEntry = async (e) => {
    e.preventDefault()

    try {
      await blogService.createBlog({title, author, url}, user)
      setTitle('')
      setAuthor('')
      setUrl('')
    } catch (err) {
      console.log(err);
    }
  }

  const blogForm = () => (
    <form onSubmit={handleBlogEntry}>
      title:
      <input type="text" value={title} onChange={({target}) => setTitle(target.value)}/>
      author:
      <input type="text" value={author} onChange={({target}) => setAuthor(target.value)}/>
      url:
      <input type="text" value={url} onChange={({target}) => setUrl(target.value)}/>
      <button type="submit">Create Blog</button>
    </form>
  )

  return (
    <div className="front">
      {user === null ? loginForm() : blogForm()}

      <div>
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </div>
    </div>
  )
}

export default App
