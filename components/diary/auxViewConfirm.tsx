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
import DisruptiveCardRecipe from "./disruptiveCardRecipe";

// HERE Go types

type Props = {
  auxWindowClose: () => void;
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
        name: selectionRecipe.strMeal!,
        area: selectionRecipe.strArea!,
        category: selectionRecipe.strCategory!,
        idExt: selectionRecipe.idMeal!,
        instructions: selectionRecipe.strInstructions!,
        ingredients: [
          selectionRecipe.strIngredient1!,
          selectionRecipe.strIngredient2!,
          selectionRecipe.strIngredient3!,
          selectionRecipe.strIngredient4!,
          selectionRecipe.strIngredient5!,
          selectionRecipe.strIngredient6!,
          selectionRecipe.strIngredient7!,
          selectionRecipe.strIngredient8!,
          selectionRecipe.strIngredient9!,
          selectionRecipe.strIngredient10!,
          selectionRecipe.strIngredient11!,
          selectionRecipe.strIngredient12!,
          selectionRecipe.strIngredient13!,
          selectionRecipe.strIngredient14!,
          selectionRecipe.strIngredient15!,
          selectionRecipe.strIngredient16!,
          selectionRecipe.strIngredient17!,
          selectionRecipe.strIngredient18!,
          selectionRecipe.strIngredient19!,
          selectionRecipe.strIngredient20!,
        ],
        measures: [
          selectionRecipe.strMeasure1!,
          selectionRecipe.strMeasure2!,
          selectionRecipe.strMeasure3!,
          selectionRecipe.strMeasure4!,
          selectionRecipe.strMeasure5!,
          selectionRecipe.strMeasure6!,
          selectionRecipe.strMeasure7!,
          selectionRecipe.strMeasure8!,
          selectionRecipe.strMeasure9!,
          selectionRecipe.strMeasure10!,
          selectionRecipe.strMeasure11!,
          selectionRecipe.strMeasure12!,
          selectionRecipe.strMeasure13!,
          selectionRecipe.strMeasure14!,
          selectionRecipe.strMeasure15!,
          selectionRecipe.strMeasure16!,
          selectionRecipe.strMeasure17!,
          selectionRecipe.strMeasure18!,
          selectionRecipe.strMeasure19!,
          selectionRecipe.strMeasure20!,
        ],
        image: selectionRecipe.strMealThumb!,
      });
    }
    return () => {
      setSendableRecipe(undefined);
    };
  }, []);

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
        <DisruptiveCardRecipe
          // FIXME for some reason I need to provide those alternatives otherwise everything becomes undefined upon render and it's bad
          returnFunction={handleRegression}
          closeFunction={auxWindowClose}
          area={sendableRecipe?.area || ""}
          category={sendableRecipe?.category || ""}
          image={sendableRecipe?.image || ""}
          ingredients={sendableRecipe?.ingredients || [""]}
          measures={sendableRecipe?.measures || [""]}
          instructions={sendableRecipe?.instructions || ""}
          name={sendableRecipe?.name || ""}>
          <>
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
                {selectionDate ? selectionDate?.toLocaleDateString() : "When?"}
              </button>
            </div>
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
          </>
        </DisruptiveCardRecipe>
      </DisruptiveCard>
    </>
  );
};

export default AuxViewConfirm;
