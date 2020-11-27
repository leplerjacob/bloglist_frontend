import axios from 'axios'

const login = async creds => {
    const response = await axios.post('/api/login', creds)
    return response.data
}

export default {
  login
}
