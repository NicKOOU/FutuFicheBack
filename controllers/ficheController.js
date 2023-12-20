const Fiche = require('../models/ficheModel');
const User = require('../models/userModel');

const addFiche = async (req, res) => {
    const ficheData = req.body;

    if (!ficheData.employer || !ficheData.period || !ficheData.jobTitle || !ficheData.baseSalary || !ficheData.totalNetSocial || !ficheData.netToPayBeforeIncomeTax || !ficheData.incomeTax || !ficheData.netPay || !ficheData.leaveN || !ficheData.leaveN1 || !ficheData.restaurantCoupons) {
        return res.status(400).json({ error: 'Veuillez fournir toutes les informations requises' });
    }

    const user = await User.findOne({
        where: {
            username: ficheData.user.username,
        },
    });


    ficheData.username = user.username;
    ficheData.ficheId = `${ficheData.period}${ficheData.employer}`;

    const newFiche = await Fiche.create(ficheData);


    return res.status(201).json({ message: 'Fiche ajoutée avec succès', fiche: newFiche });
};

const getFiches = async (req, res) => {
    const fiches = await Fiche.findAll({
        where: {
            username: req.params.username,
        },
        attributes: ['netPay', 'period', 'employer'],
    });

    return res.status(200).json({ fiches });
};

const getFiche = async (req, res) => {
    const fiche = await Fiche.findOne({
        where: {
            username: req.params.username,
            ficheId: req.params.ficheId,
        },
    });

    if (!fiche) {
        return res.status(404).json({ error: 'Fiche non trouvée' });
    }

    return res.status(200).json({ fiche });
};

const updateFiche = async (req, res) => {
    const fiche = await Fiche.findOne({
        where: {
            id: req.params.username,
        },
    });

    if (!fiche) {
        return res.status(404).json({ error: 'Fiche non trouvée' });
    }

    const ficheData = req.body;

    if (!ficheData.employer || !ficheData.period || !ficheData.jobTitle || !ficheData.baseSalary || !ficheData.totalNetSocial || !ficheData.netToPayBeforeIncomeTax || !ficheData.incomeTax || !ficheData.netPay || !ficheData.leaveN || !ficheData.leaveN1 || !ficheData.restaurantCoupons) {
        return res.status(400).json({ error: 'Veuillez fournir toutes les informations requises' });
    }

    await fiche.update(ficheData);

    return res.status(200).json({ message: 'Fiche mise à jour avec succès', fiche });
};

const deleteFiche = async (req, res) => {
    const fiche = await Fiche.findOne({
        where: {
            id: req.params.username,

        },
    });

    if (!fiche) {
        return res.status(404).json({ error: 'Fiche non trouvée' });
    }

    await fiche.destroy();

    return res.status(200).json({ message: 'Fiche supprimée avec succès' });
};

module.exports = {
    addFiche,
    getFiches,
    getFiche,
    updateFiche,
    deleteFiche,
};
