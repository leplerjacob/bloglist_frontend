import React, { useState } from 'react'

const BlogForm = ({ createBlog, user }) => {
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [author, setAuthor] = useState('')
  const [likes, setLikes] = useState('')

  const addBlog = (e) => {
    e.preventDefault()

    createBlog(
      {
        title: title,
        author: author,
        url: url,
        likes: likes,
      },
      user
    )

    setTitle('')
    setUrl('')
    setAuthor('')
    setLikes('')
  }

  return (
    <form onSubmit={addBlog}>
      title:
      <input
        id="blog-title"
        type="text"
        value={title}
        onChange={({ target }) => setTitle(target.value)}
      />
      author:
      <input
        id="blog-author"
        type="text"
        value={author}
        onChange={({ target }) => setAuthor(target.value)}
      />
      url:
      <input
        id="blog-url"
        type="text"
        value={url}
        onChange={({ target }) => setUrl(target.value)}
      />
      likes:
      <input
        id="blog-likes"
        type="number"
        value={likes}
        onChange={({ target }) => setLikes(target.value)}
      />
      <button type="submit">Create Blog</button>
    </form>
  )
}

export default BlogForm
