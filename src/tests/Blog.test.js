import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from '../components/Blog'
import BlogForm from '../components/BlogForm'

describe('Blog Properties', () => {
  let component
  const testBlog = {
    title: 'Testing React components using Jest',
    author: 'Jacob Johnson',
    url: 'www.fakewebsite.com',
    likes: 2,
    user: null,
  }

  beforeEach(() => {
    component = render(<Blog blog={testBlog} />)
  })

  afterEach(() => {
    component = render(<Blog blog={testBlog} />)
  })

  test('blog renders title & author but not url or likes by default', () => {
    const blogTitle = component.getByText(`${testBlog.title}`)
    const blogAuthor = component.getByText(`By: ${testBlog.author}`)
    const blogUrl = component.getByText(`URL: ${testBlog.url}`)
    const blogLikes = component.getByText(`Likes: ${testBlog.likes}`)

    expect(blogTitle).toBeVisible()
    expect(blogAuthor).toBeVisible()
    expect(blogUrl).not.toBeVisible()
    expect(blogLikes).not.toBeVisible()
  })

  test('if like is clicked url and likes are shown', () => {
    const blogUrl = component.getByText(`URL: ${testBlog.url}`)
    const blogLikes = component.getByText(`Likes: ${testBlog.likes}`)

    const button = component.container.querySelector('.card.blog button')
    fireEvent.click(button)

    expect(blogUrl).toBeVisible()
    expect(blogLikes).toBeVisible()
  })

  test('if button clicked twice, event handler runs twice', () => {
    const blogUrl = component.getByText(`URL: ${testBlog.url}`)
    const blogLikes = component.getByText(`Likes: ${testBlog.likes}`)

    const button = component.container.querySelector('.card.blog button')

    fireEvent.click(button)
    expect(blogUrl).toBeVisible()
    expect(blogLikes).toBeVisible()
    fireEvent.click(button)
    expect(blogUrl).not.toBeVisible()
    expect(blogLikes).not.toBeVisible()
  })

  //Skipped 5.16
//   test('tests the event handler and correct details of the new blog', () => {
//     const mockHandle = jest.fn((blog) => {
//       console.log(blog)
//     })
//     const blogFormComponent = render(<BlogForm onSubmit={mockHandle} />)

//     const titleValue = blogFormComponent.container.querySelector(
//       'form input:first-child'
//     )

//     console.log(titleValue)
//   })
})

// https://stackoverflow.com/questions/52813527/cannot-check-expectelm-not-tobevisible-for-semantic-ui-react-component
