import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../dbConnect";
import timelineEvent from "../../../models/timelineEvent";

type resData = {
  success: boolean;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<resData>
) {
  const { method } = req;

  switch (method) {
    case "POST":
      try {
        console.log("CONNECTING TO MONGO");
        await dbConnect();
        console.log("CONNECTED TO MONGO");

        console.log("CREATING DOCUMENT");
        console.log(req.body);
        await timelineEvent.create(req.body);
        console.log("CREATED DOCUMENT");

        res.status(200).json({ success: true });
      } catch (error) {
        console.log(error);
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
