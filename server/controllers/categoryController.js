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

    static async createCategory(title, content) {
        try {
            const query = 'INSERT INTO categories (title, content, created_at, updated_at) VALUES (?, ?, NOW(), NOW())';
            const values = [title, content];
            const [result] = await connection.execute(query, values);
            return result.insertId; 
        } catch (err) {
            console.error('Error inserting Category:', err);
            throw err;
        }
    }
}

module.exports = CategoryController;
