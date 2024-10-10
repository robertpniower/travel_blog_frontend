const connection = require('../config/db.js');


class CountryController {

    static async getCountries(req, res) {
        try {
            const query = `SELECT * FROM countries`;
            const [result] = await connection.query(query);
            res.status(200).json(result);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Server error' });
        }

    }
    
}

module.exports = CountryController;