/* eslint-disable prefer-destructuring */
const dataMapper = require('../dataMapper');

const mainController = {
  // méthode pour la page d'accueil
  async homePage(request, response) {
    try {
      const figurines = await dataMapper.getAllFigurines();

      response.render('accueil', {
        figurines,
      });
    } catch (error) {
      console.log(error);
      response.status(500).send('Erreur serveur');
    }
  },

  // méthode pour la page article
  async articlePage(request, response) {
    const id = request.params.id;
    try {
      const figurine = await dataMapper.getOneFigurine(id);

      if (!figurine) {
        response.status(404).send('Figurine non trouvée');
      } else {
        response.render('article', {
          figurine,
          pageTitle: figurine.name,
        });
      }
    } catch (error) {
      console.error(error);
      response.status(500).send('Erreur serveur');
    }
  },
};

module.exports = mainController;
