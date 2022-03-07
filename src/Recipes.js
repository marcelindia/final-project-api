const { connectDb } = require("./ConnectDb");
const { response } = require("express");

exports.createRecipe = (req, res) => {
  const newUser = req.body;
  const db = connectDb();
  db.collection("recipes")
    .add(newUser)
    .then((doc) => res.status(201).send(doc.id))
    .catch((err) => res.status(500).send(err));
};

exports.getRecipe = (req, res) => {
  const db = connectDb();
  db.collection("recipes")
    .where("ingredients", "array-contains-any", [])
    .get()
    .then((snapshot) => {
      const recipeList = snapshot.docs.map((doc) => {
        let user = doc.data();
        user.id = doc.id;
        return user;
      });
      res.send(recipeList);
    })
    .catch((err) => res.status(500).send(err));
};
