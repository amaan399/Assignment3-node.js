// routes/userRoutes.js
const express = require('express');
const { createUser, updateUser, getUsers } = require('../controllers/userControllers');

const router = express.Router();

// Routes for user-related requests
router.post('/', createUser);   // POST /api/users - Create a new user
router.put('/:id', updateUser); // PUT /api/users/:id - Update an existing user
router.get('/', getUsers);      // GET /api/users - Get list of users

module.exports = router;
