require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const bookmarksRouter = require('./bookmark/bookmark-router');
const { NODE_ENV } = require('./config')
const validateBearerToken = require('./validateBearerToken');


const app = express()

app.use(validateBearerToken)

app.use('/api/bookmarks', bookmarksRouter)

const morganOption = (NODE_ENV === 'production')
  ? 'tiny'
  : 'common';

app.use(morgan(morganOption))

app.use(helmet())

app.use(cors())

app.get('/', (req, res) => {
  res.send('Hello, world!')
})



    

module.exports = app
