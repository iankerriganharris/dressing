// config/database.js
module.exports = {
  'connection': {
    'host': process.env.DB_HOST,
    'user': process.env.DB_USER,
    'password': process.env.DB_PASSWORD,
  },
    'database': 'dressing',
    'users_table': 'users',
};
