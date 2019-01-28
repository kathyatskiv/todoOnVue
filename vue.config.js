module.exports = {
    baseUrl: process.env.NODE_ENV === 'production'
      ? '/my-sorted-todo/'
      : '/'
  }