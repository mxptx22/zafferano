import React, { useState, FunctionComponent, useEffect } from "react";
import { IWindowStateTwo } from "../../pages";
import { DisruptiveCard, DisruptiveLayout } from "../essentials/layout";
import { ISendableEvent } from "../../models/timelineEvent";
import DisruptiveCardRecipe from "./disruptiveCardRecipe";

// HERE Go Types
interface Props {
  windowState: IWindowStateTwo;
  setWindowState: React.Dispatch<React.SetStateAction<IWindowStateTwo>>;
}

type resData = {
  success: boolean;
  data?: ISendableEvent;
};

type IFetchStatus = "Successful" | "Erroneous" | "Awaiting";
type IFetchData = ISendableEvent;

const PreviewWindow: FunctionComponent<Props> = ({
  setWindowState,
  windowState: { previewedEvent },
}) => {
  // HERE Go Auxiliary Functions

  const [fetchStatus, setFetchStatus] = useState<IFetchStatus>("Awaiting");
  const [fetchData, setFetchData] = useState<IFetchData>();

  const previewWindowClose = () => {
    // MEMO This function you will pass further to keep it in one place - like search input erasure
    setWindowState({ previewWindow: false, previewedEvent: undefined });
    setFetchStatus("Awaiting");
    setFetchData(undefined);
  };

  const handleFetch = async (eventID: string) => {
    try {
      let res = await fetch(`/api/timelineEvents/find/${eventID}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      let thisTimelineEvent: resData = await res.json();
      console.log(thisTimelineEvent);
      if (thisTimelineEvent.success == true) {
        if (typeof thisTimelineEvent.data === "object") {
          setFetchStatus("Successful");
          setFetchData(thisTimelineEvent.data);
        } else {
          setFetchStatus("Erroneous");
          throw new Error(
            "Fetch error: We got a response from the server but it didn't give us any relevant data."
          );
        }
      } else {
        setFetchStatus("Erroneous");
        throw new Error(
          "Fetch error: We got a response from the server but the it failed to connect to the external source."
        );
      }
    } catch (err) {
      setFetchStatus("Erroneous");
      console.log(err);
    }
  };

  useEffect(() => {
    handleFetch(previewedEvent!);
  }, []);

  return (
    <DisruptiveLayout>
      <DisruptiveCard>
        <>
          {fetchStatus == "Successful" && fetchData && (
            <DisruptiveCardRecipe
              area={fetchData.area}
              category={fetchData.category}
              image={fetchData.image}
              ingredients={fetchData.ingredients}
              measures={fetchData.measures}
              instructions={fetchData.instructions}
              name={fetchData.name}
              closeFunction={previewWindowClose}
              returnFunction={undefined}>
              <>
                <h2>This entry is from:</h2>
                <h1>{new Date(fetchData.dateUTC).toLocaleDateString()}</h1>
              </>
            </DisruptiveCardRecipe>
          )}
        </>
      </DisruptiveCard>
    </DisruptiveLayout>
  );
};

export default PreviewWindow;
