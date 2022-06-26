import mysql from "serverless-mysql";

const db = mysql({
  config: {
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    database: process.env.MYSQL_DATABASE,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
  },
});

// const db = mysql({
//   config: {
//     host: "localhost",
//     user: "mahdi",
//     password: "passwordmysql",
//     port: 6033,
//     database: "flat management system",
//   },
// });

export default db;
