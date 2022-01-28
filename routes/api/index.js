const router = require('express').Router();
const bookRoutes = require('./bookRoutes');
const userRoutes = require('./userRoutes');
const todoRoutes = require('./todoRoutes');

router.use('/books', bookRoutes);
router.use('/users', userRoutes);
router.use('/todos', todoRoutes);
module.exports = router;


// Every route inside of this index.js
// already has /api prepended to every route we that declare
// this will prepend /api/books to every route declared below this comment
/*
* 1.  endpoint is a GET request to get a user by their primary key
* 2.  endpoint is a PATCH request to update a user by their primary key, this should respond back with the updated user data
* 3.  endpoint is a DELETE request to delete a user by their primary key, this should respond back with the deleted user data
* */
