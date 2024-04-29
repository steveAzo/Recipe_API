// schema/recipe/resolvers.js

const Recipe = require('../../models/Recipe');

const resolvers = {
  Query: {
    getRecipes: async () => {
      try {
        const recipes = await Recipe.find();
        return recipes;
      } catch (error) {
        throw new Error(error);
      }
    },
    getRecipe: async (_, { id }) => {
      try {
        const recipe = await Recipe.findById(id);
        return recipe;
      } catch (error) {
        throw new Error(error);
      }
    },
  },
  Mutation: {
    createRecipe: async (_, { title, description, ingredients, instructions, createdBy }) => {
      try {
        const newRecipe = await Recipe.create({ title, description, ingredients, instructions, createdBy });
        return newRecipe;
      } catch (error) {
        throw new Error(error);
      }
    },
    updateRecipe: async (_, { id, title, description, ingredients, instructions }) => {
      try {
        const updatedRecipe = await Recipe.findByIdAndUpdate(
          id,
          { title, description, ingredients, instructions },
          { new: true }
        );
        return updatedRecipe;
      } catch (error) {
        throw new Error(error);
      }
    },
    deleteRecipe: async (_, { id }) => {
      try {
        const deletedRecipe = await Recipe.findByIdAndDelete(id);
        return deletedRecipe;
      } catch (error) {
        throw new Error(error);
      }
    },
  },
};

module.exports = resolvers;
