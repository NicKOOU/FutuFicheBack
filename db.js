const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize({
    dialect: 'postgres',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

sequelize.sync({ force: false })
    .then(() => {
        console.log('Base de données synchronisée avec succès.');
    })
    .catch((error) => {
        console.error('Erreur lors de la synchronisation de la base de données:', error);
    });

module.exports = sequelize;
