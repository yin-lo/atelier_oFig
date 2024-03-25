const dataMapper = require('../dataMapper');

const mainController = {
	// méthode pour la page d'accueil
	async homePage(req, res) {
		try {
			const figurines = await dataMapper.getAllFigurines();
      res.render('accueil', { figurines });
		} catch (error) {
			res.status(500).send('Erreur serveur');
		}
	},

	// méthode pour la page article
	articlePage: (req, res) => {
		res.render('article');
	},
};

module.exports = mainController;
