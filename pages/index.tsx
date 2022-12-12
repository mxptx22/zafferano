import {
  FunctionComponent,
  JSXElementConstructor,
  ReactComponentElement,
  ReactElement,
  ReactFragment,
  useEffect,
  useState,
} from "react";
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

type ISuccessfulScreenMatchingDates = {
  month: number;
  year: number;
};

type ISuccessfulScreenProps = {
  thisYear: number;
  data: Array<ISendableEvent>;
  thoseMonths: Array<any>;
};

type ISuccessfulScreenGridProps = {
  children: ReactElement<any>;
};

type ISuccessfulScreenGridCardProps = {
  name: Required<ISendableEvent["name"]>;
  image: Required<ISendableEvent["image"]>;
  dateUTC: Required<ISendableEvent["dateUTC"]>;
  mongoID: Required<ISendableEvent["_id"]>;
};

// HERE Go additional screens
export const ErroneousScreen = () => {
  return <div>Some Error Occurred</div>;
};

export const VacuousScreen = () => {
  return <div>There's Nothing Here! Add First Entry!</div>;
};

export const SuccessfulScreen: FunctionComponent<ISuccessfulScreenProps> = ({
  thisYear,
  thoseMonths,
  data,
}) => {
  // HERE Words speak louder
  const monthsWords = [
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
                        mongoID={item._id}
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

export const SuccessfulScreenGrid: FunctionComponent<
  ISuccessfulScreenGridProps
> = ({ children }) => {
  return <div className="w-full grid grid-cols-4 gap-4">{children}</div>;
};

export const SuccessfulScreenGridCard: FunctionComponent<
  ISuccessfulScreenGridCardProps
> = ({ name, image, dateUTC, mongoID }) => {
  return (
    <div className="my-2">
      <div>{name}</div>
      <div>{image}</div>
      <div>{mongoID}</div>
      <div>{dateUTC.toString()}</div>
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
    console.log(data);
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
          {successScreen == "Successful" &&
            data &&
            distinctYears &&
            distinctDates &&
            distinctYears.map((thisYear: number) => {
              return (
                <>
                  <h1 className="my-4">{thisYear}</h1>
                  <SuccessfulScreen
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
