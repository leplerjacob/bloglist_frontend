import { logDOM } from '@testing-library/react'
import React, { useState } from 'react'

const Blog = ({ blog, addLike, deleteBlog, user }) => {
  const [visible, setVisible] = useState(false)

  const visibleStyle = { display: visible ? '' : 'none' }

  const blogToggle = () => {
    setVisible(!visible)
  }

  const likeBlog = () => {
    addLike({ id: blog.id, likedBlog: { likes: blog.likes + 1 } })
  }

  const performDelete = () => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      deleteBlog(blog)
    }
  }

  const deleteButton = () => {
    if (user) {
      if (user.username === blog.user.username) {
        return (
          <button onClick={performDelete} title="Delete blog">
            Delete
          </button>
        )
      } else {
        return (
          <button disabled="disabled" title="Only blog creator may delete">
            Delete
          </button>
        )
      }
    }
    return
  }

  const likeButton = () => {
    if (user) {
      return <button onClick={likeBlog}>Like</button>
    } else {
      return
    }
  }

  return (
      <div className="card blog">
        <h2>{blog.title}</h2>
        <p>By: {blog.author}</p>
        <button onClick={blogToggle}>{visible ? 'Hide' : 'Show'}</button>
        <div style={visibleStyle}>
          <p>URL: {blog.url}</p>
          <p>Likes: {blog.likes}</p>
          {likeButton()}
          {deleteButton()}
        </div>
      </div>
  )
}

export default Blog
