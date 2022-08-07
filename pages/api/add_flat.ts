import excuteQuery from "lib/database/db";
import { addFlat } from "lib/database/queries";

export default async function handler(req: any, res: any) {
  const { id, description } = req.body;
  console.log({ id });
  const query = addFlat(id, description);
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
