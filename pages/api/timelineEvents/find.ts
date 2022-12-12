import dbConnect from "../../../dbConnect";
import timelineEvent, { ISendableEvent } from "../../../models/timelineEvent";
import type { NextApiRequest, NextApiResponse } from "next";

type resData = {
  success: boolean;
  data?: Array<ISendableEvent>;
  distinctYears?: Array<any>;
  distinctMonths?: Array<any>;
};

type IDistinctMonthPairs = {
  year: Number;
  month: Number;
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
        const timelineevents = await timelineEvent.find().sort("-dateUTC");
        const distinctYears = await timelineEvent.distinct("dateFull.year");
        const distinctMonths = await timelineEvent.distinct("dateFull.month");

        res.status(200).json({
          success: true,
          data: timelineevents,
          distinctMonths: distinctMonths,
          distinctYears: distinctYears,
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
