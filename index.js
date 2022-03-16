const express = require("express");
const cors = require("cors");
const { connectDb } = require("./src/ConnectDb");
const PORT = process.env.PORT || 3000;
// const { createUser, getUser, updateUser } = require("./src/Users");

// app.post("/users", createUser);
// app.get("/users", getUser);
// app.patch("/users/:userId", updateUser);

const {
  getRecipe,
  createRecipe,
  getRecipeByIngredient,
  getRecipeById,
  updateRecipeById,
} = require("./src/Recipes");

const app = express();
app.use(express.json());
app.use(cors());

app.get("/recipes/recipe/:ingredient", getRecipeByIngredient);
app.get("/recipes/:id", getRecipeById);
app.get("/recipes", getRecipe);
app.patch("/recipes/:id", updateRecipeById);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});
