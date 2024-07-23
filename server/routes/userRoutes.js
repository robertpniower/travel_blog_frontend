const express = require('express')
const userController = require('../controllers/userController.js');
const validateUser = require('../middleware/validateUser.js');

const router = express.Router();

router.post('/users/create', async (req, res) => {
    const { name, email, password, role } = req.body;
    try {
      const userId = await userController.createUser(name, email, password, role);
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

router.put('/users/update', async (req, res) => {
    const { id, name, email, password, role } = req.params;
    try {
        const updatedUser = await userController.updateUser(id, name, email, password, role);
        res.status(201).json({ message: 'User updated successfully', updatedUser });
    } catch (error) {
        res.status(500).json({ error: 'Error updating user' });
    }
})

router.delete('/users/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deletedUser = userController.deleteUser(id);
        if (deletedRows > 0) {
            res.status(200).json({ message: 'User deleted' });
          } else {
            res.status(404).json({ error: 'User not found' });
          }

    } catch (error) {
        res.status(500).json({ error: 'Error deleting user' });
    }
})

module.exports = router;