import mysql from 'mysql2';;

// DB
const DB = mysql.createPool({
  host: 'localhost',
  port: 3306,
  user: 'root',
  database: 'voiceArchives',
  password: "Klc061524",
});


export default DB;