const dataMapper = require('../dataMapper');

const bookmarksController = {
	// méthode pour afficher les favoris
	async bookmarksPage(req, res) {
		if (!req.session.bookmarks) {
			req.session.bookmarks = [];
		}
		//  res.redirect('/');
		res.render('favoris', { favoris: req.session.bookmarks });
	},
	async addBookmark(req, res) {
		if (!req.session.bookmarks) {
			req.session.bookmarks = [];
		}

		const favoriId = req.params.id;

		const found = req.session.bookmarks.find((bookmark) => parseInt(favoriId) === bookmark.id);

		if (!found) {
			const fav = await dataMapper.getOneFigurine(favoriId);
			req.session.bookmarks.push(fav);
		}

		res.redirect('/bookmarks');
	},
};

module.exports = bookmarksController;
