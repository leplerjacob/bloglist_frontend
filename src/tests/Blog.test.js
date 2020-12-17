import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from '../components/Blog'

describe('Blog Properties', () => {

  let component
  let mockHandler
  const testBlog = {
    title: 'Testing React components using Jest',
    author: 'Jacob Johnson',
    url: 'www.fakewebsite.com',
    likes: 2,
    user: null,
  }

  beforeEach(() => {
      mockHandler = jest.fn()
      component = render(<Blog blog={testBlog} onClick={mockHandler} />)
  })

  test('blog renders title & author but not url or likes by default', () => {

    
  })
})
