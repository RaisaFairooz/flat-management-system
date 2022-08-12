import excuteQuery from "lib/database/db";
import { fetchAllFlatWithNull, findChild } from "lib/database/queries";
export default async function handler(
  req: any,
  res: {
    json: (arg0: {
      status: any;
      data?: object;
      message?: string;
      errMessage?: string;
    }) => void;
  }
) {
    const {columnName}=req.query;
  const query = fetchAllFlatWithNull(columnName);
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