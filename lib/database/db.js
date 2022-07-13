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

export default async function excuteQuery({ query, values = [] }) {
  console.log("excute", query.query);
  try {
    const results = await db.query(query.query);
    console.log("res", results);
    await db.end();
    return results;
  } catch (error) {
    console.log({ error });
    return { error };
  }
}
