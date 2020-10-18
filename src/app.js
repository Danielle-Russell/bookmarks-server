require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const bookmarkRouter = require('./bookmark/bookmark-router');
const { NODE_ENV } = require('./config')
const validateBearerToken = require('./validateBearerToken');
const BookmarksService = require ('./bookmarks-service')

const app = express()

app.use(validateBearerToken)

app.use(bookmarkRouter)

const morganOption = (NODE_ENV === 'production')
  ? 'tiny'
  : 'common';

app.use(morgan(morganOption))

app.use(helmet())

app.use(cors())

app.get('/bookmarks', (req, res, next) => {
  const knexInstance = req.app.get('db')
  BookmarksService.getAllBookmarks(knexInstance)
       .then(bookmarks => {
         res.json(bookmarks)
       })
      .catch(next)
   })
  
    

module.exports = app
