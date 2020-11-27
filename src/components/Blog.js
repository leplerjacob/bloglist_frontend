import React from 'react'

const Blog = ({blog}) => {

  return (
    <div className="card blog">
      <h2>{blog.title}</h2>
      <h3>{blog.author}</h3>
      <p>URL: {blog.url}</p>
      <p>Likes: {blog.likes}</p>
    </div>
  )
}

export default Blog
