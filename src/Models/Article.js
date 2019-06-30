let mysqlConfig = require("../mysqlConfig");

let initialize = () => {
  console.log(mysqlConfig.getDB());
}

module.exports = {
  initialize: initialize
}
