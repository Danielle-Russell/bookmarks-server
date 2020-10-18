const express = require('express');
const { v4: uuid } = require('uuid');
const logger = require('../logger');
const BookmarksService = require('./bookmarks-service')

const bookmarkRouter = express.Router()
const bodyParser = express.json()

bookmarkRouter
  .route('/bookmarks')
  .get((req, res, next) => {
    BookmarksService.getAllBookmarks(req.app.get('db'))
    .then(bookmarks => {
      res.json(bookmarks)
    })
    .catch(next)
  })

  .post(bodyParser, (req, res, next) => {
        const { title, url, description, rating } = req.body;
        if (!title) {
          logger.error(`Title is required`);
          return res
            .status(400)
            .send('Title is required');
        }
        
        if (!url) {
          logger.error(`URL is required`);
          return res
            .status(400)
            .send('URL is required');
        }
        if (!rating) {
          logger.error(`Rating is required`);
          return res
            .status(400)
            .send('Rating is required');
        }
        if (!description) {
          logger.error(`Description is required`);
          return res
            .status(400)
            .send('Description is required');
        }
        
        const newBookmark = { title, url, description, rating }

        BookmarksService.insertBookmark(
          req.app.get('db'),
          newBookmark
        )
          .then(bookmark => {
            logger.info(`Bookmark with id ${bookmark.id} created.`)
            res
              .status(201)
              .location(`/bookmarks/${bookmark.id}`)
              .json(bookmark)
          })
          .catch(next)
      })
    

      
      
    
      

bookmarkRouter
  .route('/bookmarks/:id')
  .all((req, res, next) => {
    const { id } = req.params;
    BookmarksService.getById(req.app.get('db'), id)
    .then(bookmark => {
      if (!bookmark) {
        logger.error(`Bookmark with id ${id} not found.`);
        return res
        .status(404)
        .send('Bookmark Not Found');
    }
res.bookmark= bookmark
next()
    })
    .catch(next)
  })
  .get((req, res) => {
res.json(res.bookmark)
  })

  .delete((req, res) => {
    const { id } = req.params;
    
    const bookmarkIndex = bookmarks.findIndex(b => b.id == id);
  
    if (bookmarkIndex === -1) {
      logger.error(`Bookmark with id ${id} not found.`);
      return res
        .status(404)
        .send('Bookmark with id ${id} not found.');
    }
  
  bookmarks.splice(bookmarkIndex, 1);
  
    logger.info(`Bookmark with id ${id} deleted.`);
  
    res
      .status(204)
      .send(`Bookmark with id ${id} deleted.`)
      .end();
  })

module.exports = bookmarkRouter