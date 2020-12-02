import React, { useState } from 'react'

const Blog = ({ blog, addLike }) => {
  const [visible, setVisible] = useState(false)

  const visibleStyle = { display: visible ? '' : 'none' }

  const blogToggle = () => {
    setVisible(!visible)
  }

  const likeBlog = () => {
    addLike({ id: blog.id, likedBlog: { likes: blog.likes + 1 } })
  }

  return (
    <div className="card blog">
      <h2>{blog.title}</h2>
      <button onClick={blogToggle}>{visible ? 'Hide' : 'Show'}</button>
      <div style={visibleStyle}>
        <h3>{blog.author}</h3>
        <p>URL: {blog.url}</p>
        <p>Likes: {blog.likes}</p>
        <button onClick={likeBlog}>Like</button>
      </div>
    </div>
  )
}

export default Blog
