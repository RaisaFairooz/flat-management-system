// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import excuteQuery from "lib/database/db";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    console.log("req nom", req.body);
    const result = await excuteQuery({
      query: `SELECT * FROM test`,
      values: [],
    });
    console.log("ttt", result);
    return res.json(result);
  } catch (error) {
    console.log(error);
  }
}
