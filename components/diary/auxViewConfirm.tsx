import React, {
  FunctionComponent,
  useState,
  ChangeEvent,
  useEffect,
} from "react";
import { DisruptiveCard } from "../essentials/layout";
import { IWindowStateOne } from "../../pages/index";
import { ISelectionRecipe, ISendableRecipe } from "../../models/recipe";

// HERE Go types

type Props = {
  auxWindowClose: Function;
  setWindowState: React.Dispatch<React.SetStateAction<IWindowStateOne>>;
  setSelectionRecipe: React.Dispatch<
    React.SetStateAction<Partial<ISelectionRecipe> | undefined>
  >;
  selectionRecipe: Partial<ISelectionRecipe> | undefined;
};

const AuxViewConfirm: FunctionComponent<Props> = ({
  auxWindowClose,
  setWindowState,
  setSelectionRecipe,
  selectionRecipe,
}) => {
  // HERE Go auxiliary functions

  const [sendableRecipe, setSendableRecipe] =
    useState<Required<ISendableRecipe>>();

  useEffect(() => {
    // This is for better conversion as object to later be sent - and it converts upon rendering
    if (selectionRecipe !== undefined) {
      setSendableRecipe({
        name: selectionRecipe.strMeal,
        area: selectionRecipe.strArea,
        category: selectionRecipe.strCategory,
        idExt: selectionRecipe.idMeal,
        instructions: selectionRecipe.strInstructions,
        ingredients: [
          selectionRecipe.strIngredient1,
          selectionRecipe.strIngredient2,
          selectionRecipe.strIngredient3,
          selectionRecipe.strIngredient4,
          selectionRecipe.strIngredient5,
          selectionRecipe.strIngredient6,
          selectionRecipe.strIngredient7,
          selectionRecipe.strIngredient8,
          selectionRecipe.strIngredient9,
          selectionRecipe.strIngredient10,
          selectionRecipe.strIngredient11,
          selectionRecipe.strIngredient12,
          selectionRecipe.strIngredient13,
          selectionRecipe.strIngredient14,
          selectionRecipe.strIngredient15,
          selectionRecipe.strIngredient16,
          selectionRecipe.strIngredient17,
          selectionRecipe.strIngredient18,
          selectionRecipe.strIngredient19,
          selectionRecipe.strIngredient20,
        ],
        measures: [
          selectionRecipe.strMeasure1,
          selectionRecipe.strMeasure2,
          selectionRecipe.strMeasure3,
          selectionRecipe.strMeasure4,
          selectionRecipe.strMeasure5,
          selectionRecipe.strMeasure6,
          selectionRecipe.strMeasure7,
          selectionRecipe.strMeasure8,
          selectionRecipe.strMeasure9,
          selectionRecipe.strMeasure10,
          selectionRecipe.strMeasure11,
          selectionRecipe.strMeasure12,
          selectionRecipe.strMeasure13,
          selectionRecipe.strMeasure14,
          selectionRecipe.strMeasure15,
          selectionRecipe.strMeasure16,
          selectionRecipe.strMeasure17,
          selectionRecipe.strMeasure18,
          selectionRecipe.strMeasure19,
          selectionRecipe.strMeasure20,
        ],
        image: selectionRecipe.strMealThumb,
      });
    }
    return () => {
      setSendableRecipe(undefined);
    };
  }, [selectionRecipe]);

  const handleProgression = () => {
    auxWindowClose();
  };

  const handleRegression = () => {
    setWindowState({ auxDisplayStep: "Choose", auxWindow: true });
  };

  // HERE Goes the layout
  return (
    <>
      <DisruptiveCard>
        <>
          <div className="flex flex-col h-full w-full justify-between overflow-hidden">
            <div className="h-80 w-full relative mb-14">
              <img
                className="rounded-t-lg h-full w-full absolute object-cover object-center hover:object-top transition-all duration-[900ms]"
                src={sendableRecipe?.image}
                alt={`Image of ${sendableRecipe?.name}`}
              />
              <div
                id="container-button"
                className="absolute top-12 right-12 flex gap-2">
                <button
                  id="button-return"
                  className="btn btn-square btn-primary"
                  onClick={() => handleRegression()}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    viewBox="0 0 24 24"
                    fill="currentColor">
                    <path d="M21 11H6.414l5.293-5.293-1.414-1.414L2.586 12l7.707 7.707 1.414-1.414L6.414 13H21z"></path>
                  </svg>
                </button>
                <button
                  className="btn btn-square btn-primary"
                  onClick={() => auxWindowClose()}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <div className="ml-12 w-fit h-fit text-xl relative top-[75%]">
                <div className="bg-base-100 blur-lg shadow-xl h-full w-full absolute"></div>
                <div className="text-7xl font-bold relative h-fit max-h-24 w-full overflow-hidden">
                  {/* FIXME Spaghetti cuts g down when overflow hidden */}
                  {sendableRecipe?.name}
                </div>
              </div>
            </div>
            <div className="w-full h-full overflow-scroll gap-4 justify-between -mb-12 pb-8 px-12 ">
              <div className="w-full flex gap-4">
                <div className="w-2/3 ">Hel</div>
                <div className="w-1/3">Lo</div>
              </div>
            </div>
          </div>
        </>
      </DisruptiveCard>
    </>
  );
};

export default AuxViewConfirm;
