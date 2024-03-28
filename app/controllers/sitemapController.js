const dataMapper = require('../dataMapper');

const sitemapController = {
  async index(req, res) {
    try {
      // Je vais aller récupérer les figurines dans la base de données
      // Pour pouvoir les afficher dans le sitemap
      const figurines = await dataMapper.getAllFigurines();
      // Je vais renvoyé un fichier XML
      res.header('Content-Type', 'application/xml');
      // Je génère le contenu du fichier a partir de la vue sitemap.ejs
      res.render('sitemap', {
        figurines,
      });
    } catch (err) {
      console.error(err);
      res.status(500).send('Erreur lors de la génération du sitemap');
    }
  },
};

module.exports = sitemapController;
