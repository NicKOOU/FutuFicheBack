const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const User = require('../models/userModel');

const register = async (req, res) => {
    const schema = Joi.object({
        username: Joi.string().required().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    });

    const { error } = schema.validate(req.body);

    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    try {
        const existingUser = await User.findOne({
            where: {
                username: req.body.username,
                email: req.body.email,
            },
        });

        if (existingUser) {
            return res.status(400).json({ error: 'Nom d\'utilisateur ou email déjà utilisé' });
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const newUser = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
        });

        res.status(201).json({ message: 'Utilisateur enregistré avec succès', user: newUser });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erreur lors de l\'inscription' });
    }
};

const login = async (req, res) => {
    // Validation des données de connexion
    const schema = Joi.object({
        username: Joi.string().required(),
        password: Joi.string().required(),
    })

    const { error } = schema.validate(req.body);

    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    try {
        // Trouver l'utilisateur par nom d'utilisateur
        const user = await User.findOne({
            where: {
                username: req.body.username,
            },
        });

        if (!user) {
            return res.status(404).json({ error: 'Utilisateur non trouvé' });
        }

        // Vérifier le mot de passe
        const passwordMatch = await bcrypt.compare(req.body.password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ error: 'Mot de passe incorrect' });
        }

        // Générer un token JWT
        const token = jwt.sign({ username: user.username }, 'your-secret-key', { expiresIn: '1h' });

        res.status(200).json({ token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erreur lors de la connexion' });
    }
};

module.exports = {
    register,
    login,
};
