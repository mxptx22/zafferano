import { Schema, model, models } from "mongoose";

export interface ISendableRecipe {
  idExt: ISelectionRecipe["idMeal"];
  name: ISelectionRecipe["strMeal"];
  area: ISelectionRecipe["strArea"];
  category: ISelectionRecipe["strCategory"];
  image: ISelectionRecipe["strMealThumb"];
  instructions: ISelectionRecipe["strInstructions"];
  ingredients: [
    ISelectionRecipe["strIngredient1"],
    ISelectionRecipe["strIngredient2"],
    ISelectionRecipe["strIngredient3"],
    ISelectionRecipe["strIngredient4"],
    ISelectionRecipe["strIngredient5"],
    ISelectionRecipe["strIngredient6"],
    ISelectionRecipe["strIngredient7"],
    ISelectionRecipe["strIngredient8"],
    ISelectionRecipe["strIngredient9"],
    ISelectionRecipe["strIngredient10"],
    ISelectionRecipe["strIngredient11"],
    ISelectionRecipe["strIngredient12"],
    ISelectionRecipe["strIngredient13"],
    ISelectionRecipe["strIngredient14"],
    ISelectionRecipe["strIngredient15"],
    ISelectionRecipe["strIngredient16"],
    ISelectionRecipe["strIngredient17"],
    ISelectionRecipe["strIngredient18"],
    ISelectionRecipe["strIngredient19"],
    ISelectionRecipe["strIngredient20"]
  ];
  measures: [
    ISelectionRecipe["strMeasure1"],
    ISelectionRecipe["strMeasure2"],
    ISelectionRecipe["strMeasure3"],
    ISelectionRecipe["strMeasure4"],
    ISelectionRecipe["strMeasure5"],
    ISelectionRecipe["strMeasure6"],
    ISelectionRecipe["strMeasure7"],
    ISelectionRecipe["strMeasure8"],
    ISelectionRecipe["strMeasure9"],
    ISelectionRecipe["strMeasure10"],
    ISelectionRecipe["strMeasure11"],
    ISelectionRecipe["strMeasure12"],
    ISelectionRecipe["strMeasure13"],
    ISelectionRecipe["strMeasure14"],
    ISelectionRecipe["strMeasure15"],
    ISelectionRecipe["strMeasure16"],
    ISelectionRecipe["strMeasure17"],
    ISelectionRecipe["strMeasure18"],
    ISelectionRecipe["strMeasure19"],
    ISelectionRecipe["strMeasure20"]
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
