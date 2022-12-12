import { FunctionComponent, useEffect, useState } from "react";
import { Layout } from "../components/essentials/layout";
import AuxWindowAdd from "../components/diary/auxWindowAdd";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { ISendableEvent } from "../models/timelineEvent";
import TimelineGrid from "../components/diary/TimelineGrid";

const HOST_DOMAIN: string = process.env.HOST_DOMAIN!;

// HERE Go Types
export interface IWindowStateOne {
  auxWindow: boolean;
  auxDisplayStep: "Search" | "Choose" | "Confirm";
}

interface IFetchedSSProps {
  successScreen: "Successful" | "Erroneous" | "Vacuous";
  data?: Array<ISendableEvent>;
  distinctYears?: Array<any>;
  distinctMonths?: Array<any>;
  distinctDates?: Array<any>;
}

// HERE Go additional screens
export const ErroneousScreen = () => {
  return <div>Some Error Occurred</div>;
};

export const VacuousScreen = () => {
  return <div>There's Nothing Here! Add First Entry!</div>;
};

// FIXME Somehow I can't try-catch it
export const getServerSideProps: GetServerSideProps<
  IFetchedSSProps
> = async () => {
  let res = await fetch(`${HOST_DOMAIN}/api/timelineEvents/find`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  let allTimelineEvents = await res.json();

  if (allTimelineEvents.success == true) {
    if (allTimelineEvents.data.length > 0) {
      return {
        props: {
          successScreen: "Successful",
          data: allTimelineEvents.data,
          distinctMonths: allTimelineEvents.distinctMonths,
          distinctYears: allTimelineEvents.distinctYears,
          distinctDates: allTimelineEvents.distinctDates,
        },
      };
    } else {
      return {
        props: { successScreen: "Vacuous" },
      };
    }
  } else if (allTimelineEvents.success == false) {
    return {
      props: { successScreen: "Erroneous" },
    };
  } else {
    throw new Error();
  }
};

const Home: FunctionComponent<IFetchedSSProps> = ({
  successScreen,
  data,
  distinctMonths,
  distinctYears,
  distinctDates,
}) => {
  const [windowState, setWindowState] = useState<IWindowStateOne>({
    auxWindow: false,
    auxDisplayStep: "Search",
  });

  const auxWindowClose = () => {
    setWindowState({ auxWindow: false, auxDisplayStep: "Search" });
  };

  const auxWindowOpen = () => {
    setWindowState({ auxWindow: true, auxDisplayStep: "Search" });
  };

  // MEMO Delete afterwards - or maybe don't if you set distinct pairs with lodash
  useEffect(() => {
    console.log(distinctDates);
  }, []);

  return (
    <>
      <Head>
        <title>Diary - Zafferano</title>
        <meta
          name="description"
          content="Your recipe diary. Your portal to better eating."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {windowState.auxWindow === true && (
        <AuxWindowAdd
          windowState={windowState}
          setWindowState={setWindowState}
        />
      )}
      <Layout>
        <>
          <header>
            <h1>Your Diary</h1>
            <button
              className="btn btn-primary text-xl"
              onClick={() => auxWindowOpen()}>
              Add Entry
            </button>
          </header>
          {successScreen == "Erroneous" && <ErroneousScreen />}
          {successScreen == "Vacuous" && <VacuousScreen />}
          {successScreen == "Successful" && data && (
            <TimelineGrid data={data} />
          )}
        </>
      </Layout>
    </>
  );
};

export default Home;
