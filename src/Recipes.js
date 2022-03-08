const { connectDb } = require("./ConnectDb");
const { response } = require("express");

exports.createRecipe = (req, res) => {
  const newRecipe = req.body;
  const db = connectDb();
  db.collection("recipes")
    .add(newRecipe)
    .then((doc) => res.status(201).send(doc.id))
    .catch((err) => res.status(500).send(err));
};
exports.getRecipe = (req, res) => {
  const db = connectDb();
  db.collection("recipes")
    .get()
    .then((snapshot) => {
      const recipeList = snapshot.docs.map((doc) => {
        let recipe = doc.data();
        recipe.id = doc.id;
        return recipe;
      });
      res.send(recipeList);
    })
    .catch((err) => res.status(500).send(err));
};

exports.getRecipeByIngredient = (req, res) => {
  const db = connectDb();
  const { ingredient } = req.params;
  db.collection("recipes")
    .where("ingredients", "array-contains-any", [ingredient])
    .get()
    .then((snapshot) => {
      const recipeList = snapshot.docs.map((doc) => {
        let recipe = doc.data();
        recipe.id = doc.id;
        return recipe;
      });
      res.send(recipeList);
    })
    .catch((err) => res.status(500).send(err));
};
