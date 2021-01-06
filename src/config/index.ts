const serverURL = process.env.NODE_ENV === 'development' ? 'http://localhost:3000/api' : '/api'

export { serverURL }
