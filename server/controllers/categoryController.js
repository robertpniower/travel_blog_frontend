const connection = require('../config/db.js');


class CategoryController {

    static async getCategories(req, res) {
        try {
            const query = `SELECT * FROM categories`;
            const [result] = await connection.query(query);
            res.status(200).json(result);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Server error' });
        }

    }
    
}

module.exports = CategoryController;