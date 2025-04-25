// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Route pour s'enregistrer
router.post('/register', async (req, res) => {
  const { firstname, lastname, email, password, role } = req.body;

  // Vérification des champs
  if (!firstname || !lastname || !email || !password || !role) {
    return res.status(400).json({ message: "Tous les champs sont obligatoires." });
  }

  // Vérification si l'utilisateur existe déjà
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: "L'utilisateur existe déjà." });
  }

  // Hachage du mot de passe
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Création du nouvel utilisateur
  const user = new User({
    firstname,
    lastname,
    email,
    password: hashedPassword,
    role
  });

  try {
    await user.save();
    res.status(201).json({ message: "Utilisateur créé avec succès" });
  } catch (err) {
    res.status(500).json({ message: "Erreur lors de l'enregistrement." });
  }
});

// Route pour se connecter
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Tous les champs sont obligatoires." });
  }

  // Recherche de l'utilisateur par email
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: "Utilisateur non trouvé." });
  }

  // Vérification du mot de passe
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: "Mot de passe incorrect." });
  }

  // Création du token JWT
  const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

  res.status(200).json({ message: "Connexion réussie", token });
});

module.exports = router;
