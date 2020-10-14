const express = require('express');
const { v4: uuid } = require('uuid');
const logger = require('../logger');
const store = require('../store');


const bookmarkRouter = express.Router()

const bodyParser = express.json()

bookmarkRouter
  .route('/bookmarks')
  .get((req, res) => {
      res.json(store.bookmarks)
  })
  .post(bodyParser, (req, res) => {
      
        const { title, url, rating, desc } = req.body;
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
        if (!desc) {
          logger.error(`Description is required`);
          return res
            .status(400)
            .send('Description is required');
        }
        const id = uuid();
      
        const bookmark = {
          id,
          title,
          url,
          rating,
          desc
        };
        
        store.bookmarks.push(bookmark);
      
        logger.info(`Bookmark with id ${id} created`);
      
      res
        .status(201)
        .location(`http://localhost:8000/bookmarks/${id}`)
        .json(bookmark);
      })

bookmarkRouter
  .route('/bookmarks/:id')
  .get((req, res) => {
    const { id } = req.params;
    const bookmark = store.bookmarks.find(b => b.id == id);
  
    if (!bookmark) {
      logger.error(`Bookmark with id ${id} not found.`);
      return res
        .status(404)
        .send('Bookmark Not Found');
    }
  
    res.json(bookmark);
    
  })
  .delete((req, res) => {
    const { id } = req.params;
    
    const bookmarkIndex = store.bookmarks.findIndex(b => b.id == id);
  
    if (bookmarkIndex === -1) {
      logger.error(`Bookmark with id ${id} not found.`);
      return res
        .status(404)
        .send('Bookmark with id ${id} not found.');
    }
  
    store.bookmarks.splice(bookmarkIndex, 1);
  
    logger.info(`Bookmark with id ${id} deleted.`);
  
    res
      .status(204)
      .send(`Bookmark with id ${id} deleted.`)
      .end();
  })

module.exports = bookmarkRouter