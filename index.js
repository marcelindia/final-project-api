const express = require("express");
const cors = require("cors");
const { connectDb } = require("./src/ConnectDb");
const PORT = process.env.PORT || 3000;
// const { createUser, getUser, updateUser } = require("./src/Users");
const {
  getRecipe,
  createRecipe,
  getRecipeByIngredient,
} = require("./src/Recipes");

const app = express();
app.use(express.json());
app.use(cors());

// app.post("/users", createUser);
// app.get("/users", getUser);
// app.patch("/users/:userId", updateUser);

app.get("/recipes/:ingredient", getRecipeByIngredient);
app.get("/recipes", getRecipe);
app.post("/recipes", createRecipe);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});
