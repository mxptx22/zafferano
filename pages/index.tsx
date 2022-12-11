import { useState } from "react";
import { Layout } from "../components/essentials/layout";
import AuxWindowAdd from "../components/diary/auxWindowAdd";
import { GetServerSideProps } from "next";
import Head from "next/head";

const HOST_DOMAIN: string = process.env.HOST_DOMAIN!;

export interface IWindowStateOne {
  auxWindow: boolean;
  auxDisplayStep: "Search" | "Choose" | "Confirm";
}

interface IFetchedSSProps {
  successScreen: "Successful" | "Erroneous" | "Vacuous";
  data?: Array<any>;
}

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
        props: { successScreen: "Successful", data: allTimelineEvents.data },
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

const Home = () => {
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
        <header>
          <h1>Your Diary</h1>
          <button
            className="btn btn-primary text-xl"
            onClick={() => auxWindowOpen()}>
            Add Entry
          </button>
        </header>
      </Layout>
    </>
  );
};

export default Home;
