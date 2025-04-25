// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Route pour obtenir tous les utilisateurs
router.get('/', userController.getAllUsers);

// Route pour obtenir un utilisateur par ID
router.get('/:id', userController.getUserById);

// Route pour mettre à jour un utilisateur
router.put('/:id', userController.updateUser);

// Route pour supprimer un utilisateur
router.delete('/:id', userController.deleteUser);

module.exports = router;
