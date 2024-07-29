const dataMapper = require('../dataMapper');

const bookmarksController = {

  // méthode pour afficher les favoris
  bookmarksPage(request, response) {
    response.render('favoris', {
      // Si je n'ai pas définis de bookmarks dans ma session, je mets un tableau vide
      figurines: request.session.bookmarks || [],
    });
  },

  async addBookmark(request, response) {
    try {
      // ici on va ajouter un favori
    // Si je n'ai pas de bookmarks dans ma session
      if (!request.session.bookmarks) {
      // Alors j'initialise un tableau vide
        request.session.bookmarks = [];
      }

      // Je regarde si j'ai déjà cet article en favori
      const figurineId = Number(request.params.id);
      // Est ce que j'ai une figurine dans mon tableau de bookmarks
      // dont l'id est celui que je viens de recevoir en paramètre
      const figurineFound = request.session.bookmarks
        // La fonction en argument du find doit retourner une valeur (thruthy ou falsy)
        .find((figurine) => figurine.id === figurineId);

      // Si je n'ai pas trouvé la figurine
      if (!figurineFound) {
      // Je vais chercher la figurine dans la base de données
        const figurine = await dataMapper.getOneFigurine(figurineId);

        // Si j'ai trouvé la figurine en bdd, je l'ajoute à mon tableau de bookmarks
        if (figurine) {
          request.session.bookmarks.push(figurine);
        }
      }

      // Je redirige vers la page des favoris
      response.redirect('/bookmarks');
    } catch (error) {
      console.error(error);
      response.status(500).send('Erreur lors de l\'ajout du favori');
    }
  },

  deleteBookmark(request, response) {
    // ici on va supprimer un favori
    // Je récupère l'id de la figurine à supprimer
    const figurineId = Number(request.params.id);

    // Je filtre les favoris pour retirer celui qui a l'id que je veux supprimer
    request.session.bookmarks = request.session.bookmarks
      // On filtre les figurines pour ne garder que celles
      // dont l'id est différent de celui qu'on veut supprimer
      .filter((figurine) => figurine.id !== figurineId);

    // Je redirige vers la page des favoris
    response.redirect('/bookmarks');
  },

};

module.exports = bookmarksController;
