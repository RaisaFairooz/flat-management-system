import excuteQuery from "lib/database/db";
import { addPost } from "lib/database/queries";

export default async function handler(req: any, res: any) {
  const { header, body,role,author_id } = req.body;
  const query = addPost(header, body,role,author_id);
  try {
    const responseInsert: any = await excuteQuery({ query });
    return res.json(responseInsert);
  } catch (err) {
    return res.json({
      status: "fail",
      message: "database error",
      errorMessage: err, 
    })   
  }
}
