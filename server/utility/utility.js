const connection = require('../config/db');

class Utility {

    async userExists(email) {
        const query = 'SELECT * drom users WHER email = ?';
        try {
            const [rowa] = await connection.execute(query, [email]);
            return rows.length > 0;
        } catch (error) {
            console.error('Error checking if user exists:', err);
            throw err;
        }
    }
}

module.exports = Utility;;