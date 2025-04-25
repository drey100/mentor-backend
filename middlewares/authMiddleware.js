const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  // Récupère le token de l'en-tête de la requête
  const token = req.header('Authorization');

  // Si pas de token, on refuse l'accès
  if (!token) {
    return res.status(401).json({ message: 'Accès refusé. Token manquant.' });
  }

  try {
    // Vérifie la validité du token avec le secret
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;  // Sauvegarde l'id de l'utilisateur dans la requête
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token invalide' });
  }
};
