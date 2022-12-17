import { useEffect, useRef, useState } from "react";
import { Layout } from "../components/essentials/layout";
import AuxWindowAdd from "../components/diary/auxWindowAdd";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { ISendableEvent } from "../models/timelineEvent";
import { IMonthsWords } from "../models/timelineEvent";
import PreviewWindow from "../components/diary/previewWindow";
import {
  disableBodyScroll,
  enableBodyScroll,
  clearAllBodyScrollLocks,
} from "body-scroll-lock";
import { DividerOne } from "../components/backgrounds/dividers";
import Vine from "../components/backgrounds/vine";

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

type ISuccessfulScreenGridCardProps = {
  previewWindowOpen: any;
  name: Required<ISendableEvent["name"]>;
  image: Required<ISendableEvent["image"]>;
  dateUTC: Required<ISendableEvent["dateUTC"]>;
  mongoID: Required<NonNullable<ISendableEvent["_id"]>>;
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

  if (allTimelineEvents.success) {
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
  } else {
    return {
      props: { successScreen: "Erroneous" },
    };
  }
};

// HERE Is the real deal
const Home = ({
  successScreen,
  data,
  distinctYears,
  distinctDates,
}: IFetchedSSProps) => {
  const [windowStateOne, setWindowStateOne] = useState<IWindowStateOne>({
    auxWindow: false,
    auxDisplayStep: "Search",
  });
  const [windowStateTwo, setWindowStateTwo] = useState<IWindowStateTwo>({
    previewWindow: false,
    previewedEvent: undefined,
  });

  const auxWindowOpen = () => {
    setWindowStateOne({ auxWindow: true, auxDisplayStep: "Search" });
  };

  const previewWindowOpen = (entryID: string) => {
    setWindowStateTwo({ previewWindow: true, previewedEvent: entryID });
  };

  // Scroll Lock Shenanigans
  const containerRef: any = useRef();
  const targetElement = containerRef.current;

  useEffect(() => {
    if (windowStateOne.auxWindow || windowStateTwo.previewWindow) {
      disableBodyScroll(targetElement);
    } else {
      enableBodyScroll(targetElement);
    }

    return () => {
      enableBodyScroll(targetElement);
    };
  }, [windowStateOne, windowStateTwo]);

  return (
    <div
      className="w-screen h-screen overflow-auto relative"
      ref={containerRef}>
      <div className="w-[150%] h-screen fixed -z-20 fill-base-content opacity-[0.03]">
        <Vine />
      </div>
      <Head>
        <title>Diary - Zafferano</title>
        <meta
          name="description"
          content="Your recipe diary. Your portal to better food."
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
              className="btn btn-primary text-lg"
              onClick={() => auxWindowOpen()}>
              <span className="material-icons-outlined md:iconic-l">
                library_add
              </span>
              <span className="hidden md:inline">Add Entry</span>
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
                  <YearDecoration>{thisYear}</YearDecoration>
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
    </div>
  );
};

// HERE Go additional screens
export const ErroneousScreen = () => {
  return <div>Some Error Occurred</div>;
};

export const VacuousScreen = () => {
  return <div>There's Nothing Here! Add First Entry!</div>;
};

export const SuccessfulScreen = ({
  previewWindowOpen,
  thisYear,
  thoseMonths,
  data,
}: ISuccessfulScreenProps) => {
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
            <div className="month">{monthsWords[thisMonth]}</div>
            <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {data
                .filter(
                  (z) =>
                    z.dateFull.year == thisYear && z.dateFull.month == thisMonth
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
            </div>
          </>
        );
      })}
    </>
  );
};

export const SuccessfulScreenGridCard = ({
  name,
  image,
  dateUTC,
  mongoID,
  previewWindowOpen,
}: ISuccessfulScreenGridCardProps) => {
  return (
    <div className="my-2">
      <div
        onClick={() => {
          previewWindowOpen(mongoID);
        }}
        className="card h-44 md:h-64 bg-base-100 shadow-xl hover:scale-105 transition-all duration-500 cursor-pointer">
        <figure className="relative h-full">
          <div className="absolute shadow-lg shadow-base-100 overflow-hidden bottom-2 right-2 h-11 md:h-14 rounded-sm aspect-square bg-base-100 flex items-center justify-center">
            <div className=" text-3xl md:text-4xl font-bold font-serif">
              {new Date(dateUTC).getDate()}
            </div>
          </div>
          <img src={image} alt={`Image of ${name}`} />
        </figure>
        <div className="card-body p-2 md:p-4 justify-center h-28 overflow-hidden">
          <div className="card-title text-base md:text-xl font-medium tracking-wide">
            {name}
          </div>
        </div>
      </div>
    </div>
  );
};

export function YearDecoration(props: { children: any }) {
  return (
    <div className="flex flex-col w-full items-center year">
      <div className="w-40 fill-base-content">
        <DividerOne />
      </div>
      <div className="text-center  p-2 -mb-2 -mt-2 rounded-sm">
        {props.children}
      </div>
      <div className="w-40 fill-base-content">
        <DividerOne />
      </div>
    </div>
  );
}

export default Home;
