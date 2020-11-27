import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((res) => res.data)
}

const createBlog = async (blog, user) => {
  const request = axios.post(baseUrl, blog, {headers: {
    "Authorization": "bearer " + user.token} })
  return request.then(res => res.data)
}

export default { getAll, createBlog }
