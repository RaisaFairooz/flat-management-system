import excuteQuery from "lib/database/db";
import { addNotice } from "lib/database/queries";

export default async function handler(req: any, res: any) {
  const { heading, description } = req.body;
  const query = addNotice(heading, description);
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
