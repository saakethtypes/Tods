//Imports
const express = require("express");
const auth = require("../controllers/authMiddleware");

//Import route functions
const router = express.Router();
const {
  getTodos,
  addTodo,
  deleteTodo,
  editTask,
  deleteContent,
  addContent,
  checkTodo,
  liveTodo,
  saveSort,
  verify,
  saveTheme
} = require("../controllers/todoController");

//Route config
router.route("/").get(auth, getTodos).post(auth, addTodo);
router.route("/save").post(saveSort);
router.route("/verify").post(verify);
router.route("/savetheme").post(saveTheme);

router
  .route("/:id")
  .patch(auth, editTask)
  .delete(auth, deleteTodo)
  .post(auth, addContent)
  .put(auth, checkTodo);

router.route("/live/:id").patch(auth, liveTodo);

router.route("/:tid/:cid").delete(auth, deleteContent);

module.exports = router;
