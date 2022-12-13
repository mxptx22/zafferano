import { Schema, model, models } from "mongoose";
import { ISendableRecipe } from "./recipe";

export type IMonthsWords = [
  null,
  "January" | "Jan",
  "February" | "Feb",
  "March" | "Mar",
  "April" | "Apr",
  "May",
  "June" | "Jun",
  "July" | "Jul",
  "August" | "Aug",
  "September" | "Sep",
  "October" | "Oct",
  "November" | "Nov",
  "December" | "Dec"
];

export interface ISendableDate {
  dateUTC: Date;
  dateFull: {
    year: number;
    month: number;
    day: number;
  };
}

export interface ISendableEventAux {
  _id?: String;
}

export interface ISendableEvent
  extends ISendableRecipe,
    ISendableDate,
    ISendableEventAux {}

const timelineEventSchema = new Schema<ISendableEvent>({
  idExt: String,
  name: String,
  area: String,
  category: String,
  image: String,
  instructions: String,
  ingredients: Array,
  measures: Array,
  dateUTC: Date,
  dateFull: {
    year: Number,
    month: Number,
    day: Number,
  },
});

const timelineEvent =
  models.TimelineEvent ||
  model<ISendableEvent>("TimelineEvent", timelineEventSchema);

export default timelineEvent;
