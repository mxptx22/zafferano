import { FunctionComponent, ReactElement, useEffect, useState } from "react";
import { Layout } from "../components/essentials/layout";
import AuxWindowAdd from "../components/diary/auxWindowAdd";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { ISendableEvent } from "../models/timelineEvent";
import { IMonthsWords } from "../models/timelineEvent";
import PreviewWindow from "../components/diary/previewWindow";

const HOST_DOMAIN: string = process.env.HOST_DOMAIN!;

// HERE Go Types
export interface IWindowStateOne {
  auxWindow: boolean;
  auxDisplayStep: "Search" | "Choose" | "Confirm";
}

export interface IWindowStateTwo {
  previewWindow: boolean;
  previewedEvent: string | undefined;
}

interface IFetchedSSProps {
  successScreen: "Successful" | "Erroneous" | "Vacuous";
  data?: Array<ISendableEvent>;
  distinctYears?: Array<number>;
  distinctMonths?: Array<number>;
  distinctDates?: Array<ISuccessfulScreenMatchingDates>;
}

type ISuccessfulScreenMatchingDates = {
  month: number;
  year: number;
};

type ISuccessfulScreenProps = {
  previewWindowOpen: any;
  thisYear: number;
  data: Array<ISendableEvent>;
  thoseMonths: number[];
};

type ISuccessfulScreenGridProps = {
  children: ReactElement<any>;
};

type ISuccessfulScreenGridCardProps = {
  previewWindowOpen: any;
  name: Required<ISendableEvent["name"]>;
  image: Required<ISendableEvent["image"]>;
  dateUTC: Required<ISendableEvent["dateUTC"]>;
  mongoID: Required<NonNullable<ISendableEvent["_id"]>>;
};

// HERE Go additional screens
export const ErroneousScreen = () => {
  return <div>Some Error Occurred</div>;
};

export const VacuousScreen = () => {
  return <div>There's Nothing Here! Add First Entry!</div>;
};

export const SuccessfulScreen: FunctionComponent<ISuccessfulScreenProps> = ({
  previewWindowOpen,
  thisYear,
  thoseMonths,
  data,
}) => {
  // HERE Words speak louder
  const monthsWords: IMonthsWords = [
    null,
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    <>
      {thoseMonths.map((thisMonth: number) => {
        return (
          <>
            <h2 className="my-2">{monthsWords[thisMonth]}</h2>
            <SuccessfulScreenGrid>
              <>
                {data
                  .filter(
                    (z) =>
                      z.dateFull.year == thisYear &&
                      z.dateFull.month == thisMonth
                  )
                  .map((item) => {
                    return (
                      <SuccessfulScreenGridCard
                        name={item.name}
                        image={item.image}
                        dateUTC={item.dateUTC}
                        mongoID={item._id!}
                        previewWindowOpen={previewWindowOpen}
                      />
                    );
                  })}
              </>
            </SuccessfulScreenGrid>
          </>
        );
      })}
    </>
  );
};

// MEMO Is this thing below even necessary? Just put it above...
export const SuccessfulScreenGrid: FunctionComponent<
  ISuccessfulScreenGridProps
> = ({ children }) => {
  return <div className="w-full grid grid-cols-4 gap-4">{children}</div>;
};

export const SuccessfulScreenGridCard: FunctionComponent<
  ISuccessfulScreenGridCardProps
> = ({ name, image, dateUTC, mongoID, previewWindowOpen }) => {
  return (
    <div className="my-2">
      <div
        onClick={() => {
          previewWindowOpen(mongoID);
        }}
        className="card h-80 bg-base-100 shadow-xl hover:scale-105 transition-all duration-500 cursor-pointer">
        <figure className="relative h-full">
          <div className="absolute shadow-lg shadow-base-100 overflow-hidden bottom-2 right-2 h-14 rounded-md aspect-square bg-base-100 flex items-center justify-center">
            <div className="text-3xl font-semibold">
              {new Date(dateUTC).getDate()}
            </div>
          </div>
          <img src={image} alt={`Image of ${name}`} />
        </figure>
        <div className="card-body h-36 overflow-hidden">
          <h2 className="card-title">{name}</h2>
        </div>
      </div>
    </div>
  );
};

// HERE You fetch props from the serva
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
  distinctYears,
  distinctDates,
}) => {
  const [windowStateOne, setWindowStateOne] = useState<IWindowStateOne>({
    auxWindow: false,
    auxDisplayStep: "Search",
  });
  const [windowStateTwo, setWindowStateTwo] = useState<IWindowStateTwo>({
    previewWindow: false,
    previewedEvent: undefined,
  });

  const auxWindowClose = () => {
    setWindowStateOne({ auxWindow: false, auxDisplayStep: "Search" });
  };

  const auxWindowOpen = () => {
    setWindowStateOne({ auxWindow: true, auxDisplayStep: "Search" });
  };

  const previewWindowOpen = (entryID: string) => {
    setWindowStateTwo({ previewWindow: true, previewedEvent: entryID });
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

      {windowStateOne.auxWindow === true && (
        <AuxWindowAdd
          windowState={windowStateOne}
          setWindowState={setWindowStateOne}
        />
      )}
      {windowStateTwo.previewWindow === true &&
        windowStateTwo.previewedEvent !== undefined && (
          <PreviewWindow
            windowState={windowStateTwo}
            setWindowState={setWindowStateTwo}
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
          {successScreen == "Successful" &&
            data &&
            distinctYears &&
            distinctDates &&
            distinctYears.map((thisYear: number) => {
              return (
                <>
                  <h1 className="my-4">{thisYear}</h1>
                  <SuccessfulScreen
                    previewWindowOpen={previewWindowOpen}
                    thisYear={thisYear}
                    thoseMonths={distinctDates
                      .filter((v) => v.year == thisYear)
                      .map((w) => w.month)}
                    data={data.filter((x) => x.dateFull.year == thisYear)}
                  />
                </>
              );
            })}
        </>
      </Layout>
    </>
  );
};

export default Home;
