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
  it('login form shows first', function () {
    cy.visit('http://localhost:3000')
    cy.get('html').contains('login')
  })
})
