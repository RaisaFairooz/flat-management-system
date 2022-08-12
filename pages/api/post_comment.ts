import excuteQuery from "lib/database/db";
import { addComment } from "lib/database/queries";

export default async function handler(req: any, res: any) {
  const { post_id,body,commentor } = req.body;
  const query = addComment(post_id, body,commentor);
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
