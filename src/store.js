const { v4: uuid } = require('uuid');

const bookmarks = [
  { id: uuid(),
    title: 'Thinkful',
    url: 'https://www.thinkful.com',
    desc: 'Think outside the classroom',
    rating: 5 },
  { id: uuid(),
    title: 'Google',
    url: 'https://www.google.com',
    desc: 'Where we find everything else',
    rating: 4 },
  { id: uuid(),
    title: 'MDN',
    url: 'https://developer.mozilla.org',
    desc: 'The only place to find web documentation',
    rating: 5 },
]

module.exports = { bookmarks }