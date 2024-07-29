const client = require('./database');

// méthode === une fonction dans un objet
// une propriété === une variable dans un obj
const dataMapper = {
  async getAllFigurines() {
    const result = await client.query('SELECT * FROM figurine;');

    return result.rows;
  },
  async getOneFigurine(id) {
    const result = await client.query('SELECT * FROM figurine WHERE id = $1;', [id]);

    // autre façon de faire qui fait STRICTEMENT la même chose
    // client.query({
    //   text: 'SELECT * FROM figurine WHERE id = $1;',
    //   values: [id],
    // });

    // Ma requête n'est censé retourner qu'une seule figurine
    // Je retourne le 1er élément du tableau de résultat
    // Si aucune figurine n'est trouvé, result.rows[0] sera égal à undefined
    return result.rows[0];
  },
};

// Le async doit être mis avant la fonction
// Équivalent sortie de l'objet à
// const getAllFigurines = async () => {

// };

// async function getAllFigurines() {

// }

module.exports = dataMapper;
