import { Schema, model, models } from 'mongoose';

const recipeSchema = new Schema({
    name: String,
    image: String
});

const Recipe = models.Recipe || model('Recipe', recipeSchema);

export default Recipe;