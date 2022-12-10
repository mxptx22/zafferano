import { useState } from "react";
import { Layout } from "../components/essentials/layout";
import AuxWindowAdd from "../components/diary/auxWindowAdd";

export interface IWindowStateOne {
  auxWindow: boolean;
  auxDisplayStep: "Search" | "Choose" | "Confirm";
}

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
