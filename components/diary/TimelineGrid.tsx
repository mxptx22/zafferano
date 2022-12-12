import React, { FunctionComponent, useState } from "react";
import { ISendableEvent } from "../../models/timelineEvent";

interface Props {
  data: Array<ISendableEvent>;
}

const TimelineGrid: FunctionComponent<Props> = ({ data }) => {
  //   HERE Go auxiliary functions
  const [gridYears, setGridYears] = useState<Array<any>>([]);
  const [gridMonths, setGridMonths] = useState<Array<any>>([]);

  return (
    <div className="w-full grid grid-cols-4">
      {data?.map((item) => (
        <div>{item.name}</div>
      ))}
    </div>
  );
};

export default TimelineGrid;
