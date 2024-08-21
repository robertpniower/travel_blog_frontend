const express = require('express')
const userController = require('../controllers/userController.js');
const validateUser = require('../middleware/validateUser.js');
const UserController = require('../controllers/userController.js');

const router = express.Router();

router.post('/users/create', async (req, res) => {
    const { name, email, password, role, avatar_url } = req.body;
    try {
      const userId = await userController.createUser(name, email, password, role, avatar_url);
      res.status(201).json({ message: 'User created successfully', userId });
    } catch (err) {
      res.status(500).json({ error: 'Error creating user' });
    }
  });


  router.get('/users/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const user = await userController.getUserById(id);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Error fetching user' });
  }
});

router.get('/users', async (req, res) => {
    try {
        const users = await userController.getAllUsers();
        if (users) {
            res.status(200).json(users);
          } else {
            res.status(404).json({ error: 'No users found' });
          }
    } catch (error) {
        
    }
})

router.put('/users/update/:id', async (req, res) => {
    const { id } = req.params;
    const { name, email, password, role, avatar_url } = req.body;
    try {
      const affectedRows = await UserController.updateUser(id, name, email, password, role, avatar_url);
      if (affectedRows > 0) {
          res.status(200).json({ message: 'User updated successfully' });
      } else {
          res.status(404).json({ message: 'User not found' });
      }
  } catch (error) {
      res.status(500).json({ message: 'Error updating user', error });
  }
})

router.delete('/users/delete/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const affectedRows = await UserController.deleteUser(id);
      if (affectedRows > 0) {
          res.status(200).json({ message: 'User deleted successfully' });
      } else {
          res.status(404).json({ message: 'User not found' });
      }
  } catch (error) {
      res.status(500).json({ message: 'Error deleting user', error });
  }
})

module.exports = router;