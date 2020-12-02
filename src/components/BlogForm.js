import React, { useState } from 'react'

const BlogForm = ({ createBlog, user }) => {
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [author, setAuthor] = useState('')
  const [likes, setLikes] = useState('')

  const addBlog = (e) => {
    e.preventDefault()

    createBlog({
      title: title,
      author: author,
      url: url,
      likes: likes,
    }, user)

    setTitle('')
    setUrl('')
    setAuthor('')
    setLikes('')
  }

  return (
    <form onSubmit={addBlog}>
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
      <input
        type="number"
        value={likes}
        onChange={({ target }) => setLikes(target.value)}
      />
      <button type="submit">Create Blog</button>
    </form>
  )
}

export default BlogForm
