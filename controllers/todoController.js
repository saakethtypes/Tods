//Imports
const Todo = require("../models/Todo");
const User = require("../models/User");
const Content = require("../models/Content");
const auth = require("../controllers/authMiddleware");
const express = require("express");
const mongodb = require("mongodb");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config({ path: "../config.env" });

// @route GET /todos
exports.getTodos = async (req, res, next) => {
  try {
    //Db save
    const user = await User.findById(req.user.id);
    let usertodos = [];
    let todos = [];

    for (let i = 0; i < user.user_todos.length; i++) {
      usertodos[i] = mongodb.ObjectId(user.user_todos[i]);
      const todo = await Todo.find({
        _id: usertodos[i]
      });

      todos.push(todo[0]);
    }
    todos = todos.filter(function (el) {
      return el != null;
    });
    //response
    return res.status(200).json({
      success: true,
      count: todos.length,
      todos: todos,
      user: user
    });
    //user_todos
  } catch (error) {
    //error response
    return res.status(500).json({
      success: false,
      err: error
    });
  }
};

// @route POST /todos
exports.addTodo = async (req, res, next) => {
  try {
    //Db save
    const new_todo = await Todo.create(req.body);
    const user_updated_todo_list = await User.findByIdAndUpdate(req.user.id, {
      $addToSet: { user_todos: new_todo._id }
    });

    //response
    return res.status(201).json({
      success: true,
      data: new_todo,
      user: user_updated_todo_list
    });
  } catch (error) {
    //error response
    if (error.name === "ValidationError") {
      const msgs = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({
        success: false,
        err: msgs
      });
    } else {
      return res.status(500).json({
        success: false,
        err: error
      });
    }
  }
};

// @route DELETE /tods/todos/:id
exports.deleteTodo = async (req, res, next) => {
  try {
    await Todo.findByIdAndDelete(req.params.id);
    return res.status(200).json({
      success: true,
      msg: "Todo has been deleted"
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      err: err
    });
  }
};

exports.addContent = async (req, res, next) => {
  try {
    let todo = Todo.findById(req.params.id);
    if (todo) {
      let cont = await Content.create(req.body);
      let utodo = await Todo.findByIdAndUpdate(
        { _id: req.params.id },
        { $addToSet: { content: cont } }
      );

      return res.status(200).json({
        success: true,
        msg: "Content has been added",
        content: cont
      });
    }
  } catch (error) {
    //error response
    if (error.name === "ValidationError") {
      const msgs = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({
        success: false,
        err: msgs
      });
    } else {
      return res.status(500).json({
        success: false,
        err: error
      });
    }
  }
};

exports.deleteContent = async (req, res, next) => {
  try {
    //delete element from array in object
    //$pull for delete $push for add
    const todo = await Todo.findByIdAndUpdate(
      { _id: req.params.tid },
      { $pull: { content: { _id: req.params.cid } } }
    )
    
    return res.json({
      msg:"Content deleted"
    })
  } catch (err) {
    return res.json({ err: err });
  }
};

//check uncheck of todo
//to use boolens use .length as an alternative
exports.checkTodo = async (req, res, next) => {
  try {
    let todo = await Todo.find({ _id: req.params.id, status: false })
      .exec()
      .then(async (resp, todo) => {
        if (resp.length === 1) {
          const utodo = await Todo.findByIdAndUpdate(req.params.id, {
            status: true
          });
          return res.json({
            msg: "Todo done!",
            data: true
          });
        } else {
          const utodo = await Todo.findByIdAndUpdate(req.params.id, {
            status: false
          });
          return res.json({
            msg: "Todo undone",
            data: false
          });
        }
      });
  } catch (err) {
    return res.json({
      error: err
    });
  }
};

exports.editTask = async (req, res, next) => {
  try {
    const todo = await Todo.findByIdAndUpdate(req.params.id, {
      task: req.body.task
    });
    return res.json({
      msg: "Task changed",
      data: req.body.task
    });
  } catch (err) {
    return res.json({
      error: err
    });
  }
};

exports.liveTodo = async (req, res, next) => {
  try {
    //let todo = Todo.findByIdAndUpdate({'_id':req.params.id},
    //{importance:req.body.imp})
    const todo = await Todo.findByIdAndUpdate(req.params.id, {
      importance: req.body.imp
    });

    return res.json({
      imp: req.body.imp,
      msg: "Updated Importance"
    });
  } catch (err) {
    return res.send("err");
  }
};

exports.saveSort = async (req, res, next) => {
  try {
    //Db save
    let usertodos = req.body.data;
    let t = await Todo.findById(usertodos[0]);

    let userr = req.body.user;
    const userupdate = await User.findByIdAndUpdate(userr, {
      user_todos: req.body.data
    });
    //response
    return res.status(200).json({
      success: true,
      data: userupdate
    });
    //user_todos
  } catch (error) {
    //error response
    return res.status(500).json({
      success: false,
      err: error
    });
  }
};

exports.verify = async (req,res,next)=>{
  let token = req.body.token

  jwt.verify(token,process.env.JWT_SECRET,(err)=>{
    if(err){
      res.send({veri:false})}
      else{
        res.send({veri:true})
      }
  }) 
}

exports.saveTheme = async (req, res, next) => {
  try {

    let savedthemeuser = [req.body.theme,
      req.body.thm,req.body.textthm]
 
    const user = await User.findByIdAndUpdate({'_id':req.body.user}, {
      user_theme: savedthemeuser
    });
    
    console.log(user.user_theme)
    return res.json({
      themes: user,
      msg:"Saved theme"});
  } catch (err) {
    return res.json({err:"err"});
  }
};