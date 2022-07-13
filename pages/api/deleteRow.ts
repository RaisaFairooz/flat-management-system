import excuteQuery from "lib/database/db";
import { deleteRow } from "lib/database/queries";

export default async function handler(req: any, res: any) {
  const { tableName, id } = req.query;
  const query = deleteRow(tableName, id);
  try {
    const responseInsert: any = await excuteQuery({ query });
    return res.json(responseInsert);
  } catch (err) {
    return res.json({
      status: "fail",
      message: "database error",
      errorMessage: err,
    });
  }
}
