const client = require('./database');

const dataMapper = {
	async getAllFigurines() {
		const result = await client.query('SELECT * FROM figurine');
		return result.rows;
	},
	async getOneFigurine(id){
		const result = await client.query('SELECT * FROM figurine WHERE id = $1', [id]);
		return result.rows[0];
	}
};

module.exports = dataMapper;
