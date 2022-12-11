import { Schema, model, models } from "mongoose";

export interface ISendableRecipe {
  idExt: ISelectionRecipe["idMeal"] | undefined;
  name: ISelectionRecipe["strMeal"] | undefined;
  area: ISelectionRecipe["strArea"] | undefined;
  category: ISelectionRecipe["strCategory"] | undefined;
  image: ISelectionRecipe["strMealThumb"] | undefined;
  instructions: ISelectionRecipe["strInstructions"] | undefined;
  ingredients: [
    ISelectionRecipe["strIngredient1"] | undefined,
    ISelectionRecipe["strIngredient2"] | undefined,
    ISelectionRecipe["strIngredient3"] | undefined,
    ISelectionRecipe["strIngredient4"] | undefined,
    ISelectionRecipe["strIngredient5"] | undefined,
    ISelectionRecipe["strIngredient6"] | undefined,
    ISelectionRecipe["strIngredient7"] | undefined,
    ISelectionRecipe["strIngredient8"] | undefined,
    ISelectionRecipe["strIngredient9"] | undefined,
    ISelectionRecipe["strIngredient10"] | undefined,
    ISelectionRecipe["strIngredient11"] | undefined,
    ISelectionRecipe["strIngredient12"] | undefined,
    ISelectionRecipe["strIngredient13"] | undefined,
    ISelectionRecipe["strIngredient14"] | undefined,
    ISelectionRecipe["strIngredient15"] | undefined,
    ISelectionRecipe["strIngredient16"] | undefined,
    ISelectionRecipe["strIngredient17"] | undefined,
    ISelectionRecipe["strIngredient18"] | undefined,
    ISelectionRecipe["strIngredient19"] | undefined,
    ISelectionRecipe["strIngredient20"] | undefined
  ];
  measures: [
    ISelectionRecipe["strMeasure1"] | undefined,
    ISelectionRecipe["strMeasure2"] | undefined,
    ISelectionRecipe["strMeasure3"] | undefined,
    ISelectionRecipe["strMeasure4"] | undefined,
    ISelectionRecipe["strMeasure5"] | undefined,
    ISelectionRecipe["strMeasure6"] | undefined,
    ISelectionRecipe["strMeasure7"] | undefined,
    ISelectionRecipe["strMeasure8"] | undefined,
    ISelectionRecipe["strMeasure9"] | undefined,
    ISelectionRecipe["strMeasure10"] | undefined,
    ISelectionRecipe["strMeasure11"] | undefined,
    ISelectionRecipe["strMeasure12"] | undefined,
    ISelectionRecipe["strMeasure13"] | undefined,
    ISelectionRecipe["strMeasure14"] | undefined,
    ISelectionRecipe["strMeasure15"] | undefined,
    ISelectionRecipe["strMeasure16"] | undefined,
    ISelectionRecipe["strMeasure17"] | undefined,
    ISelectionRecipe["strMeasure18"] | undefined,
    ISelectionRecipe["strMeasure19"] | undefined,
    ISelectionRecipe["strMeasure20"] | undefined
  ];
}

export interface ISelectionRecipe {
  dateModified?: any;
  idMeal: string;
  strArea: string;
  strCategory: string;
  strCreativeCommonsConfirmed?: any;
  strDrinkAlternate?: any;
  strImageSource?: any;
  strIngredient1: string;
  strIngredient2: string;
  strIngredient3: string;
  strIngredient4: string;
  strIngredient5: string;
  strIngredient6: string;
  strIngredient7: string;
  strIngredient8: string;
  strIngredient9: string;
  strIngredient10: string;
  strIngredient11: string;
  strIngredient12: string;
  strIngredient13: string;
  strIngredient14: string;
  strIngredient15: string;
  strIngredient16: string;
  strIngredient17: string;
  strIngredient18: string;
  strIngredient19: string;
  strIngredient20: string;
  strInstructions: string;
  strMeal: string;
  strMealThumb: string;
  strMeasure1: string;
  strMeasure2: string;
  strMeasure3: string;
  strMeasure4: string;
  strMeasure5: string;
  strMeasure6: string;
  strMeasure7: string;
  strMeasure8: string;
  strMeasure9: string;
  strMeasure10: string;
  strMeasure11: string;
  strMeasure12: string;
  strMeasure13: string;
  strMeasure14: string;
  strMeasure15: string;
  strMeasure16: string;
  strMeasure17: string;
  strMeasure18: string;
  strMeasure19: string;
  strMeasure20: string;
  strSource: string;
  strTags: string;
  strYoutube: string;
}

const recipeSchema = new Schema({
  name: String,
  image: String,
});

const Recipe = models.Recipe || model("Recipe", recipeSchema);

export default Recipe;
