const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const fiche = sequelize.define('Payslip', {
    ficheId: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
        unique: true,
    },
    employer: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    period: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    jobTitle: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    baseSalary: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    totalNetSocial: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    netToPayBeforeIncomeTax: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    incomeTax: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    netPay: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    leaveN: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    leaveN1: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    restaurantCoupons: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

    username: {
        type: DataTypes.STRING,
        references: {
            model: 'Users',
            key: 'username',
        },
        onDelete: 'CASCADE',
    },
});

module.exports = fiche;