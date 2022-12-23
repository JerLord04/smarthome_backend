const mysql = require("mysql"),
      connection = mysql.createConnection({
          host: "localhost",
          user: "root",
          password: "",
          database: "smarthome_project"
      });

connection.connect(function (err) {
    if (err) {
      console.error(err);
      throw err;
   } else {
    console.log("Connection to database was successful");
  }
});

module.exports =  {
  getConnection() { return connection; }
};