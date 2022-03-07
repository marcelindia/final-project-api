const { connectDb } = require("./ConnectDb");
const { response } = require("express");

exports.createUser = (req, res) => {
  const newUser = req.body;
  const db = connectDb();
  db.collection("users")
    .add(newUser)
    .then((doc) => res.status(201).send(doc.id))
    .catch((err) => res.status(500).send(err));
};

exports.getUser = (req, res) => {
  const db = connectDb();
  db.collection("users")
    .get()
    .then((snapshot) => {
      const userList = snapshot.docs.map((doc) => {
        let user = doc.data();
        user.id = doc.id;
        return user;
      });
      res.send(userList);
    })
    .catch((err) => res.status(500).send(err));
};

// exports.updateUser = (req,res) => {
//     const db=connectDb()
//     db.collection('users')
//     .doc(doc.id)
//     .update()
//     .then((doc) => res.status(202).send(doc))
//     .catch((err) => res.status(500).send(err))
// }

// exports.updateUser = (req, res) => {
//     user.id= doc.id
//   const db = connectDb();
//   db.collection("users")
//     .doc(user.id)
//     .update()
//     .then((doc) => res.status(202).send(doc))
//     .catch((err) => res.status(500).send(err));
// };
