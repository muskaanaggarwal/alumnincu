let mysqlConfig = require("../mysqlConfig");

let initialize = () => {
  mysqlConfig.getDB().query("create table IF NOT EXISTS article (id INT auto_increment primary key, category VARCHAR(30), title VARCHAR(24))");
  console.log(mysqlConfig.getDB());
}

module.exports = {
  initialize: initialize
}
