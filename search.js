module.exports = function(searchIndex, mysql, dbconfig) {
  // Search.
  const options = {};
  let mySearchIndex;
  function initializeSearchIndex(err, index) {
      if (!err) {
          mySearchIndex = index;
          const connection = mysql.createConnection(dbconfig.connection);
          connection.query('USE ' + dbconfig.database);
          connection.query('SELECT * FROM users')
          .stream({highWaterMark: 5})
          .pipe(index.defaultPipeline())
          .pipe(index.add())
          .on('finish', function() {
              module.mySearchIndex = mySearchIndex;
              console.log(mySearchIndex);
          });
      }
  };
  module.init = function() {
    searchIndex(options, initializeSearchIndex);
    return mySearchIndex;
  };
  return module;
};
