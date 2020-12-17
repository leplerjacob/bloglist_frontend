import axios from 'axios'
let baseUrl
if(process.env.NODE_ENV) {
  baseUrl = 'http://localhost:3003/api/blogs'
} else {
  baseUrl = '/api/blogs'
}

let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((res) => res.data)
}

const createBlog = async (blog, user) => {
  const request = axios.post(baseUrl, blog, {
    headers: {
      Authorization: 'bearer ' + user.token,
    },
  })
  return request.then((res) => res.data)
}

const updateBlogLikes = async (blog, user) => {
  const request = axios.put(baseUrl + `/${blog.id}`, blog.likedBlog, {
    headers: { Authorization: 'bearer ' + user.token },
  })
  return request.then((res) => res.data)
}

const deleteBlog = async (blog, user) => {
  const request = axios.delete((baseUrl + `/${blog.id}`), {
    headers: { Authorization: 'bearer ' + user.token },
  })
  return request.then(res => res.data)
}

// eslint-disable-next-line
export default { getAll, createBlog, setToken, updateBlogLikes, deleteBlog }
