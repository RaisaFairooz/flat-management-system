import { NextApiResponse, NextApiRequest } from "next";
import excuteQuery from "lib/database/db";
import { fetchPostsWithCommennt } from "lib/database/queries";
export default async function handler(req: any, res: any) {
  const query = fetchPostsWithCommennt();
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
