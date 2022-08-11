import { NextApiResponse, NextApiRequest } from "next";
import excuteQuery from "lib/database/db";
import { fetchAllSameColumn } from "lib/database/queries";
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
  const query = fetchAllSameColumn("phone_number");
  try {
    const response: any = await excuteQuery({ query });
    if (response) {
      return res.json(response);
    } else
      return res.json({
        data: undefined,
        status: "fail",
        message: "No table found",
      });
  } catch (err: any) {
    res.json({
      status: "fail",
      data: undefined,
      message: "Please try again",
      errMessage: err,
    });
  }
}
