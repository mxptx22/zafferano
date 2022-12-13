import React, { FunctionComponent } from "react";
import { DisruptiveCard } from "../essentials/layout";

export type IDisruptiveCardRecipeProps = {
  children: JSX.Element;
  image: string;
  name: string;
  ingredients: Array<any>;
  measures: Array<any>;
  area: string;
  category: string;
  instructions: string;
  returnFunction: (() => void) | undefined;
  closeFunction: () => void;
};

export const DisruptiveCardRecipe: FunctionComponent<
  IDisruptiveCardRecipeProps
> = ({
  area,
  children,
  category,
  closeFunction,
  image,
  ingredients,
  measures,
  name,
  returnFunction,
  instructions,
}) => {
  return (
    <>
      <div className="flex flex-col h-full w-full justify-between overflow-hidden">
        <div className="h-80 w-full relative mb-14">
          <img
            className="rounded-t-lg h-full w-full absolute object-cover object-center hover:object-top transition-all duration-[900ms]"
            src={image}
            alt={`Image of ${name}`}
          />
          <div
            id="container-button-navigation"
            className="absolute top-12 right-12 flex gap-2">
            {returnFunction && (
              <button
                id="button-return"
                className="btn btn-square btn-primary"
                onClick={returnFunction}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  fill="currentColor">
                  <path d="M21 11H6.414l5.293-5.293-1.414-1.414L2.586 12l7.707 7.707 1.414-1.414L6.414 13H21z"></path>
                </svg>
              </button>
            )}
            <button
              className="btn btn-square btn-primary"
              onClick={closeFunction}>
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
              {name}
            </div>
          </div>
        </div>
        <div className="w-full h-full overflow-scroll gap-4 justify-between pb-8 px-12 ">
          <div className="w-full flex gap-4">
            <div className="w-2/3 ">
              <h2 className="h2-underline">🛒 You will need...</h2>
              <div className="grid grid-cols-2">
                {ingredients
                  .filter((iy) => iy !== "")
                  .map((iz, index) => (
                    <li>
                      <div>
                        <span className="font-medium">{iz}</span> -{" "}
                        {measures[index]}
                      </div>
                    </li>
                  ))}
              </div>
              <h2 className="h2-underline">📜 About this recipe...</h2>
              <div>
                {area && category
                  ? `This is a ${category} recipe typically associated with ${area} cuisine.`
                  : "We're not really too sure about this one."}
              </div>
              <h2 className="h2-underline">🧑🏼‍🍳 How it's made...</h2>
              <div className="whitespace-pre-wrap leading-relaxed text-justify">
                {instructions.replace(/(\r\n|\n|\r)/gm, "\n")}
              </div>
            </div>
            <div className="w-1/3 flex justify-start items-stretch flex-col">
              {children}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DisruptiveCardRecipe;
