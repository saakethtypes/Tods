//Imports
const path = require('path');
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const colors = require("colors");
const bodyParser = require("body-parser");
var serveStatic = require('serve-static')


dotenv.config({ path: "./config.env" });

//App
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Routes
const todo_routes = require("./routes/todoRoutes");
const user_routes = require("./routes/userRoutes");
app.use("/todos", todo_routes);
app.use("/user", user_routes);
app.get('*', function(req, res){
  res.redirect('/');
});
//production
if(process.env.NODE_ENV==='production'){
  app.use(express.serveStatic(__dirname +'/tods/build'));
  app.get('*',(req,res)=> res.sendFile(path.resolve(
    __dirname,'tods','build','index.html'
  )))
}

console.log(path.resolve(
  __dirname,'tods','build','index.html'
))
//Mongoose
const connectDb = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    });
    console.log(`MonogoDb Connected: ${conn.connection.host}`.blue.bold);
  } catch (err) {
    console.log(`Error connecting to MongoDb: ${err}`);
  }
};
connectDb();

//Server
const PORT = process.env.SERVER_PORT||8080;
app.listen(PORT, console.log(`Server running on ${PORT}`.blue.bold));
