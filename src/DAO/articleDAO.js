let dbConfig = require("../mysqlConfig");

let getTestingTest = (criteria, callback) => {
  dbConfig.getDB().query('select * from test where 1',criteria, callback);
}

let getArticle = (criteria, callback) => {
  //criteria.aricle_id ? conditions += ` and aricle_id = '${criteria.aricle_id}'` : true;
  dbConfig.getDB().query(`select * from article where 1`, criteria, callback);
}

let getArticleDetail = (criteria, callback) => {
  let conditions = "";
  criteria.id ? conditions += ` and id = '${criteria.id}'` : true;
  dbConfig.getDB().query(`select * from article where ${conditions}`, callback);
}

 let createArticle = (dataToSet, callback) => {
   console.log("insert into test set ? ", dataToSet)
   dbConfig.getDB().query("insert into test set ? ", dataToSet, callback);
 }

 let createTest = (dataToSet, callback) => {
  console.log("insert into test set ? ", dataToSet)
  dbConfig.getDB().query("insert into test set ? ", dataToSet, callback);
}

 let deleteArticle = (criteria, callback) => {
   let conditions = "";
   criteria.id ? conditions += ` and id = '${criteria.id}'` : true;
   console.log(`delete from test where 1 ${conditions}`);
   dbConfig.getDB().query(`delete from test where 1 ${conditions}`, callback);

 }

 let updateArticle = (criteria, dataToSet, callback) => {
   let conditions = "";
   let setData = "";
   criteria.id ? conditions += ` and id = '${criteria.id}'` : true;
   dataToSet.category ? setData += `category = '${dataToSet.category}'` : true;
   dataToSet.title ? setData += `, title = '${dataToSet.title}'` : true;
   console.log(`UPDATE test SET ${setData} where 1 ${conditions}`);
   dbConfig.getDB().query(`UPDATE test SET ${setData} where 1 ${conditions}`, callback);
 }
module.exports = {
   getArticle: getArticle,
   createArticle: createArticle,
   deleteArticle: deleteArticle,
   updateArticle: updateArticle,
   getArticleDetail: getArticleDetail,
   getTestingTest: getTestingTest,
   createTest: createTest
}
