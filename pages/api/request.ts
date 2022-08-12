import excuteQuery from "lib/database/db";
import { sendRequest } from "lib/database/queries";

export default async function handler(req: any, res: any) {
  const request = req.body;
  console.log({ request });
  const query = sendRequest(request);
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
