const db = require('../util/database');

module.exports = class Event {
  constructor(user_id) {
    this.user_id = user_id;
  }

  // Read all ingredients in a user's calendar
  static getAll(user) {
    return db.execute(
      `SELECT date, recipe_name FROM Events AS e
        JOIN Recipes AS r
        ON e.recipe_id = r.recipe_id
        WHERE e.user_id = ?`, [user.user_id]
    );
  }

  // Insert into events table
  static addEventRecipe(eventDetails) {
    return db.execute(
      'INSERT INTO Events(date, recipe_id, user_id) VALUES (?, ?, ?)',
      [eventDetails.day, eventDetails.recipe_id, eventDetails.user_id]
    );
  }
};
