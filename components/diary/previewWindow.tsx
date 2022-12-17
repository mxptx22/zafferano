import React, { useState, FunctionComponent, useEffect } from "react";
import { IWindowStateTwo } from "../../pages";
import { DisruptiveCard, DisruptiveLayout } from "../essentials/layout";
import { ISendableEvent } from "../../models/timelineEvent";
import DisruptiveCardRecipe from "./disruptiveCardRecipe";
import { LoadingBumper, ErrorBumper } from "../essentials/bumpers";
// @ts-ignore
import useKeypress from "react-use-keypress";
import { DividerOne } from "../backgrounds/dividers";

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

const PreviewWindow = ({
  setWindowState,
  windowState: { previewedEvent },
}: Props) => {
  // HERE Go Auxiliary Functions

  const [fetchStatus, setFetchStatus] = useState<IFetchStatus>("Awaiting");
  const [fetchData, setFetchData] = useState<IFetchData>();

  const previewWindowClose = () => {
    // MEMO This function you will pass further to keep it in one place - like search input erasure
    setWindowState({ previewWindow: false, previewedEvent: undefined });
    setFetchStatus("Awaiting");
    setFetchData(undefined);
  };

  useKeypress("Escape", () => {
    previewWindowClose();
  });

  const handleFetch = async (eventID: string) => {
    try {
      let res = await fetch(`/api/timelineEvents/find/${eventID}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      let thisTimelineEvent: resData = await res.json();
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

  const handleDelete = async (eventID: string | String) => {
    await fetch(`/api/timelineEvents/find/${eventID}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Submission error: Connection to server failed.");
        }
        location.reload();
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    handleFetch(previewedEvent!);
  }, [previewedEvent]);

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
              <div className="w-full flex flex-col items-center border-l mt-6 px-8">
                <div className="w-full mb-8">
                  {/* FIXME Make it look nicer */}
                  <div className="text-center uppercase font-thin mb-2">
                    Entry Dated
                  </div>
                  <div className="text-center text-6xl font-serif font-bold">
                    {new Date(fetchData.dateUTC).toLocaleDateString()}
                  </div>
                </div>
                <div className="mb-8 fill-base-content w-2/3">
                  <DividerOne />
                  <div className="text-center my-4">
                    <button
                      onClick={() => {
                        handleDelete(fetchData._id!);
                      }}
                      className="btn btn-accent self-center btn-sm">
                      <span className="material-icons-outlined iconic-l">
                        delete
                      </span>
                      Delete
                    </button>
                    {/* <button className="btn btn-accent">Love Me Later</button> */}
                  </div>
                </div>
              </div>
            </DisruptiveCardRecipe>
          )}

          {fetchStatus == "Awaiting" && (
            <LoadingBumper abortFunction={previewWindowClose} />
          )}

          {fetchStatus == "Erroneous" && (
            <ErrorBumper abortFunction={previewWindowClose} />
          )}
        </>
      </DisruptiveCard>
    </DisruptiveLayout>
  );
};

export default PreviewWindow;
