require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const bookmarkRouter = require('./bookmark/bookmark-router');
const { NODE_ENV } = require('./config')

const app = express()

app.use(bookmarkRouter)

const morganOption = (NODE_ENV === 'production')
  ? 'tiny'
  : 'common';

app.use(morgan(morganOption))

app.use(helmet())

app.use(cors())
    

module.exports = app
