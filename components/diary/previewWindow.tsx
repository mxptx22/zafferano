import React, { useState, FunctionComponent } from "react";
import { IWindowStateTwo } from "../../pages";
import { DisruptiveCard, DisruptiveLayout } from "../essentials/layout";

// HERE Go Types
interface Props {
  windowState: IWindowStateTwo;
  setWindowState: React.Dispatch<React.SetStateAction<IWindowStateTwo>>;
}

type IFetchStatus = "Successful" | "Erroneous" | "Awaiting";
type IFetchData = Array<any>;

const PreviewWindow: FunctionComponent<Props> = ({
  setWindowState,
  windowState: { previewedEvent },
}) => {
  // HERE Go Auxiliary Functions

  const [fetchStatus, setFetchStatus] = useState<IFetchStatus>("Awaiting");
  const [fetchData, setFetchData] = useState<IFetchData>([]);

  const handleFetch = async () => {};

  return (
    <DisruptiveLayout>
      <DisruptiveCard>
        <>{previewedEvent}</>
        {/* {windowState.auxDisplayStep == "Confirm" && (
          <AuxViewConfirm
            auxWindowClose={auxWindowClose}
            setWindowState={setWindowState}
            selectionRecipe={selectionRecipe}
            setSelectionRecipe={setSelectionRecipe}
          />
        )} */}
      </DisruptiveCard>
    </DisruptiveLayout>
  );
};

export default PreviewWindow;
