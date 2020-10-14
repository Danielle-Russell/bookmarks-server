const { v4: uuid } = require('uuid');

const bookmarks = [
  { id: uuid(),
    title: 'Thinkful',
    url: 'https://www.thinkful.com',
    rating: 5,
    description: 'Think outside the classroom' },
  { id: uuid(),
    title: 'Google',
    url: 'https://www.google.com',
    rating: 4,
    description: 'Where we find everything else' },
  { id: uuid(),
    title: 'MDN',
    url: 'https://developer.mozilla.org',
    rating: 5,
    description: 'The only place to find web documentation' },
]

module.exports = { bookmarks }