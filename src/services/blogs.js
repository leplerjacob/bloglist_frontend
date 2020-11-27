import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((res) => res.data)
}

const createBlog = () => {
  console.log('This runs')
  return
}

export default { getAll, createBlog }
