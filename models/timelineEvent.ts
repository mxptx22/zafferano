import { Schema, model, models } from "mongoose";

export interface ITimelineEvent {
  name: String;
  image: String;
  ingredients: Array<String>;
  instructions: String;
  dateUTC: Date;
  date: {
    day: Number;
    month: Number;
    year: Number;
  };
}

const timelineEventSchema = new Schema({
  name: String,
  image: String,
  ingredients: Array,
  instructions: String,
  dateUTC: Date,
  date: {
    day: Number,
    month: Number,
    year: Number,
  },
});

const timelineEvent =
  models.TimelineEvent || model("TimelineEvent", timelineEventSchema);

export default timelineEvent;
