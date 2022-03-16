const { connectDb } = require("./ConnectDb");
const { response } = require("express");

exports.createRecipeComment = (req, res) => {
  const newRecipeComment = req.body;
  const db = connectDb();
  db.collection("recipes")
    .add(newRecipe)
    .then((doc) => res.status(201).send(doc.id))
    .catch((err) => res.status(500).send(err));
};

exports.getRecipe = (req, res) => {
  const db = connectDb();
  const { ing } = req.query;
  let ingArr = [];

  let query = db.collection("recipes");

  if (ing) {
    ingArr = ing.split(",");
    query = query.where("ingredients", "array-contains-any", ingArr);
  }

  query
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
    .where("ingredients", "array-contains-any", [recipes.ingredient])
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
exports.getRecipeById = (req, res) => {
  const db = connectDb();
  const { id } = req.params;
  db.collection("recipes")
    .doc(id)
    .get()
    .then((doc) => {
      let recipe = doc.data();
      recipe.id = doc.id;
      res.send(recipe);
    })
    .catch((err) => res.status(500).send(err));
};

exports.updateRecipeById = (req, res) => {
  const db = connectDb();
  const { id } = req.params;
  // recipe.id = doc.id;
  const updateRating = req.body;
  db.collection("recipes")
    .doc(id)
    .update(updateRating)
    .then((doc) => res.status(202).send(doc))
    .catch((err) => res.status(500).send(err));
};
