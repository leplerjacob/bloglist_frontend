import axios from 'axios'
let baseUrl
if (process.env.NODE_ENV) {
  baseUrl = 'http://localhost:3003/api/login'
} else {
  baseUrl = '/api/login'
}

const login = async (creds) => {
  const response = await axios.post(baseUrl, creds)
  return response.data
}

// eslint-disable-next-line
export default { login }
