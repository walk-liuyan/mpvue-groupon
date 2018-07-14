let baseURL

if (process.env.BUILD_ENV === 'production') {
  baseURL = {
    API: 'https://api-test.XXXX.com/v1'
  }
} else if (process.env.BUILD_ENV === 'test') {
} else {
  baseURL = {
    API: 'https://api-test.XXXX.com/v1'
  }
}

export {
  baseURL
}
