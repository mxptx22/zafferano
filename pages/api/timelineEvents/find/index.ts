import dbConnect from "../../../../dbConnect";
import timelineEvent, {
  ISendableEvent,
} from "../../../../models/timelineEvent";
import type { NextApiRequest, NextApiResponse } from "next";
import * as _ from "lodash";

type resData = {
  success: boolean;
  data?: Array<ISendableEvent>;
  distinctYears?: Array<number>;
  distinctDates?: Array<IDistinctMonthPairs>;
};

type IDistinctMonthPairs = {
  year: number;
  month: number;
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
        const distinctMonths = await timelineEvent.distinct("dateFull");
        const distinctDates = _.uniqBy(
          distinctMonths,
          ({ year, month }) => year + ":" + month
        )
          .map(({ day, ...retain }) => retain)
          .reverse();

        res.status(200).json({
          success: true,
          data: timelineevents,
          distinctYears: distinctYears.reverse(),
          distinctDates: distinctDates,
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
