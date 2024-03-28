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
	async articlePage(req, res) {
		const figurineId = req.params.id;
		try {
			const figurineFound = await dataMapper.getOneFigurine(figurineId);

			const reviews = await dataMapper.getAllReviewsByFigurine(parseInt(figurineId));

			if (figurineFound) {
				res.render('article', { figurineFound, reviews,pageTitle: figurineFound.name, });
			} else {
				res.status(404).send('404 Not Found');
			}
		} catch (error) {
			res.status(500).send('Erreur serveur');
		}
	},
};

module.exports = mainController;
