import type { NextApiRequest, NextApiResponse } from "next";

type resData = {
  success: boolean;
  data?: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<resData>
) {
  const { method } = req;

  switch (method) {
    case "POST":
      try {
        const input = req.body.input;
        const response = await fetch(
          `https://www.themealdb.com/api/json/v1/1/search.php?s=${input}`
        );
        const data = await response.json();

        res.status(200).json({ success: true, data: data });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
