
const options = {}; // Startup options.
const SearchIndex = require('search-index');
const mysql = require('mysql');
const dbconfig = require('./config/database');

let q = {query: [{AND: {'*': ['harris']}}]};

SearchIndex(options, function(err, index) {
  const connection = mysql.createConnection(dbconfig.connection);
  connection.query('USE ' + dbconfig.database);
  connection.query('SELECT * FROM users')
    .stream({highWaterMark: 5})
    .pipe(index.defaultPipeline())
    .pipe(index.add())
    .on('finish', function() {
      console.log('Added users to search index.');
      index.search(q)
      .on('data', function(doc) {
        console.log(doc);
      });
    });
});
