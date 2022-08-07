import excuteQuery from "lib/database/db";
import { updateFlat } from "lib/database/queries";
export default async function handler(
  req: { body: { owner_id: string; resident_id: string; id: string } },
  res: {
    json: (arg0: {
      status: any;
      data?: object;
      message?: string;
      errMessage?: string;
    }) => void;
  }
) {
  const { owner_id, resident_id, id } = req.body;
  const query = updateFlat(owner_id, resident_id, id);
  try {
    const response: any = await excuteQuery({ query });
    if (response) return res.json(response);
    else
      return res.json({
        status: "fail",
        message: "No table found",
      });
  } catch (err: any) {
    res.json({
      status: "fail",
      message: "Please try again",
      errMessage: err,
    });
  }
}
