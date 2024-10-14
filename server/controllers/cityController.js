const connection = require('../config/db.js');

class CityController {
    
    static async getCities(req, res) {
        try {
            const countryId = req.params.country_id;
            const query = 'SELECT * FROM cities WHERE country_id = ?'
            const [results] = await connection.query(query, [countryId]);
            res.status(200).json(results)
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Server error' });
        }
    }
}

module.exports = CityController;