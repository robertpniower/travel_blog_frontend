const bcrypt = require('bcrypt');
const connection = require('../config/db.js');
const Utility = require('../utility/utility.js')

class UserController {

    

    static async createUser(name, email, password, role) {
        const userAlreadyExists = await Utility.userExists(email);
        if (userAlreadyExists) {
            throw new Error('User with this email already exists');
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const query = `Insert INTO users (name, email, password, role) VALUES (?, ?, ?, ?)`;
        const values = [name, email, hashedPassword, role];

        try {
            const [result] = await connection.execute(query, values);
            console.log('Inserted user with ID: ', result.insertId);
            return result.insertId;
        } catch {
            console.error('Error inserting user:', err);
            throw err;
        }
    }

    static async getUserById(id) {
        const query = `SELECT id, name, email FROM users WHERE id = ?`;
        try {
            const [rows] = await connection.execute(query, [id]);
            return rows[0];
        } catch (err) {
            console.error('Error fetching user:', err);
            throw err;
        }
    }

    static async getAllUsers() {
        const query = `SELECT id, name, email FROM users`;
        try {
            const [rows] = await connection.execute(query);
            return rows;
        } catch (err) {
            console.error('Error fetching users:', err);
            throw err;
        }
    }

    static async updateUser(id, name, email, password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        const query = `UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?`;
        const values = [name, email, hashedPassword, id];

        try {
            const [result] = await connection.execute(query, values);
            console.log('Updated user with ID:', id);
            return result.affectedRows;
        } catch (err) {
            console.error('Error updating user:', err);
            throw err;
        }
    }

    static async deleteUser(id) {
        const query = `DELETE FROM users WHERE id = ?`;
        try {
            const [result] = await connection.execute(query, [id]);
            console.log('Deleted user with ID:', id);
            return result.affectedRows;
        } catch (err) {
            console.error('Error deleting user:', err);
            throw err;
        }
    }

}

module.exports = UserController;