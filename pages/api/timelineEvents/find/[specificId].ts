import dbConnect from "../../../../dbConnect";
import timelineEvent, {
  ISendableEvent,
} from "../../../../models/timelineEvent";
import type { NextApiRequest, NextApiResponse } from "next";

type resData = {
  success: boolean;
  data?: ISendableEvent;
};
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<resData>
) {
  const { method, query } = req;

  const { specificID } = query;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const timelineeventThis = await timelineEvent.findOne({ specificID });
        console.log(timelineeventThis);

        res.status(200).json({
          success: true,
          data: timelineeventThis,
        });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
