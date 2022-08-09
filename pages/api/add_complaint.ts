import excuteQuery from "lib/database/db";
import { addComplaint, searchFlat } from "lib/database/queries";

export default async function handler(req: any, res: any) {
  const { heading, description, userId } = req.body;
  const flatId = await helper(userId);
  console.log({ flatId });
  const stat = "unresolved";
  const query = addComplaint(heading, description, userId, flatId, stat);
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

const helper = async (id: any) => {
  const query = searchFlat(id);
  try {
    const responseInsert: any = await excuteQuery({ query });
    console.log(responseInsert[0].flat_id);
    return responseInsert[0].flat_id;
  } catch (err) {
    return err;
  }
};
