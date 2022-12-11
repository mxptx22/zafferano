import React, {
  FunctionComponent,
  useState,
  ChangeEvent,
  useEffect,
} from "react";
import { DisruptiveCard } from "../essentials/layout";
import { IWindowStateOne } from "../../pages/index";
import { ISelectionRecipe, ISendableRecipe } from "../../models/recipe";
import { ISendableEvent } from "../../models/timelineEvent";

import { format } from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

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

  const [selectionDate, setSelectionDate] = useState<Date>();
  const handleDayClick = (day: Date) => {
    setSelectionDate(day);
  };

  const customDatepickerStyles = {
    caption: { color: "hsl(var(--p))" },
    selected: { backgroundColor: "hsl(var(--p))" },
  };

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

  const handleSubmission = async (selectedDate: Date) => {
    try {
      if (sendableRecipe !== undefined && selectedDate) {
        const payload: ISendableEvent = {
          area: sendableRecipe.area,
          category: sendableRecipe.category,
          idExt: sendableRecipe.idExt,
          image: sendableRecipe.image,
          name: sendableRecipe.name,
          instructions: sendableRecipe.instructions,
          ingredients: sendableRecipe.ingredients,
          measures: sendableRecipe.measures,
          dateUTC: selectedDate,
          dateFull: {
            day: selectedDate.getDate(),
            month: selectedDate.getMonth() + 1,
            year: selectedDate.getFullYear(),
          },
        };

        // FIXME It's late but think how not to refresh upon error like you're clearly missing some easy nuance (handleProgression starts despite error)
        await fetch("/api/timelineEvents/manage", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        })
          .then(() => handleProgression())
          .catch((err) => {
            throw new Error("Submission error: Connection to server failed.");
          });
      } else {
        throw new Error(
          "Parameter(s) missing: Either no date has been selected or recipe selection hasn't been properly recorded."
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleProgression = () => {
    auxWindowClose();
    location.reload();
  };

  const handleRegression = () => {
    setWindowState({ auxDisplayStep: "Choose", auxWindow: true });
  };

  const orderSubmissionToday = async () => {
    let today = new Date();
    await handleSubmission(today);
  };

  const orderSubmissionDated = async () => {
    await handleSubmission(selectionDate!);
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
                id="container-button-navigation"
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
                  {/* FIXME Spaghetti cuts g (ligature or whatever it's called) down when overflow hidden */}
                  {sendableRecipe?.name}
                </div>
              </div>
            </div>
            <div className="w-full h-full overflow-scroll gap-4 justify-between pb-8 px-12 ">
              <div className="w-full flex gap-4">
                <div className="w-2/3 ">
                  <h2 className="h2-underline">🛒 You will need...</h2>
                  <div className="grid grid-cols-2">
                    {sendableRecipe?.ingredients
                      .filter((iy) => iy !== "")
                      .map((iz, index) => (
                        <li>
                          <div>
                            <span className="font-medium">{iz}</span> -{" "}
                            {sendableRecipe?.measures?.[index]}
                          </div>
                        </li>
                      ))}
                  </div>
                  <h2 className="h2-underline">📜 About this recipe...</h2>
                  <div>
                    {sendableRecipe?.area && sendableRecipe?.category
                      ? `This is a ${sendableRecipe.category} recipe typically associated with ${sendableRecipe.area} cuisine.`
                      : "We're not really too sure about this one."}
                  </div>
                  <h2 className="h2-underline">🧑🏼‍🍳 How it's made...</h2>
                  <div className="whitespace-pre-wrap leading-relaxed text-justify">
                    {sendableRecipe?.instructions?.replace(
                      /(\r\n|\n|\r)/gm,
                      "\n"
                    )}
                  </div>
                </div>
                <div className="w-1/3 flex justify-start items-end flex-col">
                  <div
                    id="container-button-addition"
                    className="w-full h-12 flex justify-end gap-2 items-stretch">
                    <button
                      className="w-min btn btn-primary"
                      onClick={() => {
                        orderSubmissionToday();
                      }}>
                      Add Today
                    </button>
                    <button
                      onClick={
                        selectionDate
                          ? () => {
                              orderSubmissionDated();
                            }
                          : undefined
                      }
                      className={`w-fit min-w-[112px] btn ${
                        selectionDate ? "btn-primary" : "btn-disabled"
                      }`}>
                      Add <br />
                      {selectionDate
                        ? selectionDate?.toLocaleDateString()
                        : "When?"}
                    </button>
                  </div>

                  <div></div>

                  <DayPicker
                    mode="single"
                    fromYear={2010}
                    toYear={2030}
                    captionLayout="dropdown"
                    showOutsideDays
                    selected={selectionDate}
                    onDayClick={handleDayClick}
                    styles={customDatepickerStyles}
                    modifiersStyles={customDatepickerStyles}
                  />
                </div>
              </div>
            </div>
          </div>
        </>
      </DisruptiveCard>
    </>
  );
};

export default AuxViewConfirm;
