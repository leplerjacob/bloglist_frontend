// blog = {title, author, likes, user}
import testBlogs from '../fixtures/test-blogs.json'

describe('bloglist', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/test/reset')
    cy.addUser({ username: 'root', name: 'newUser', password: 'password' })
    cy.login({ username: 'root', password: 'password' }).then(({ body }) => {
      const token = body.token
      testBlogs.forEach((blog) => {
        cy.addBlog({ blog, token })
      })
    })
  })

  it('login button shows first', function () {
    cy.visit('http://localhost:3000')
    cy.get('html').contains('login')
  })

  it('login button clicked and shows login form', function () {
    localStorage.clear()
    cy.visit('http://localhost:3000')
    cy.get('html').contains('Login').click()
  })

  it('unsuccessful login attempt', function () {
    localStorage.clear()
    cy.get('#login-username').type('asdf')
    cy.get('#login-password').type('asdf')
    cy.get('form').contains('login').click()
    cy.get('html').contains('Invalid Credentials')
  })

  it('submit new blog', function () {
    cy.visit('http://localhost:3000')
    cy.contains('New Blog').click()
    cy.get('#blog-title').type('Top 10 Blogs for Web Developers 2020')
    cy.get('#blog-author').type('Ziv Peer')
    cy.get('#blog-url').type(
      'https://medium.com/@codingforweb/top-10-blogs-for-web-developers-2019-995fa82c9482'
    )
    cy.get('#blog-likes').type('3').trigger('change')
    cy.get('form').contains('Create Blog').click()
  })

  describe.only('start page fresh and logged out', function () {
    it('log in', function () {
      localStorage.clear()
      cy.visit('http://localhost:3000')
    })
    it('any user can like a blog', function () {})
    it('user who created blog can delete it', function () {
      cy.addUser({ username: 'joe123', name: 'Joe Schmoe', password: 'joe123' })
      cy.login({ username: 'joe123', password: 'joe123' }).then(({ body }) => {
        const token = body.token
        const blog = {
          title: '5 Advanced JavaScript Techniques You Should Know',
          author: 'Amy J. Andrews',
          url:
            'https://medium.com/javascript-in-plain-english/5-advanced-javascript-techniques-you-should-know-4362e26f2ca8',
          likes: 7,
        }
        cy.addBlog({ blog, token })
      })
      cy.visit('http://localhost:3000')
      cy.get('#blog-list').contains('5 Advanced JavaScript Techniques You Should Know').parent().contains('Show').click()
      cy.get('#blog-list').contains('5 Advanced JavaScript Techniques You Should Know').parent().contains('Delete').click()
    })

    // it('ensure the blogs are ordered according to likes', function() {

    // })
  })
})
