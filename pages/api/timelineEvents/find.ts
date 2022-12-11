import dbConnect from "../../../dbConnect";
import timelineEvent, { ITimelineEvent } from "../../../models/timelineEvent";
import type { NextApiRequest, NextApiResponse } from "next";

type resData = {
  success: boolean;
  data?: Array<ITimelineEvent>;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<resData>
) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const timelineevents = await timelineEvent.find({});
        res.status(200).json({ success: true, data: timelineevents });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
