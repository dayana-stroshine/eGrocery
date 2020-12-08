const db = require('../util/database');

module.exports = class User {
    constructor(name, email, password) {
        this.name = name;
        this.email = email;
        this.password = password;
    }

  // Read a user by user_id
    static getUser(user_id) {
        return db.execute(
            'SELECT * FROM Users WHERE user_id = ?', [user_id]);
    }

    // read a user by email
    static find(email) {
        return db.execute(
            'SELECT * FROM Users WHERE email = ?', [email]);
    }

    // add a user
    static save(user) {
        return db.execute(
            'INSERT INTO Users(name, email, password) VALUES (?, ?, ?)',
            [user.name, user.email, user.password]
        );
    }

    // delete a user
    static delete(user) {
        return db.execute(
            'DELETE FROM Users WHERE user_id = ?',
            [user.user_id]
        );
    }
};